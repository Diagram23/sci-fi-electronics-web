import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const baseUrl = process.env.SFE_BASE_URL || 'http://127.0.0.1:5173';
const cdpBasePort = Number(process.env.CDP_BASE_PORT || 9550);
const routes = [
  '/',
  '/plugins',
  '/plugins/fractal-delay',
  '/archive',
  '/contact',
  '/faq',
  '/success',
  '/legal/cookies',
  '/legal/privacy',
  '/legal/terms',
  '/legal/license',
  '/dev/figma-reference',
  '/dev/component-gallery',
  '/dev/figma-original-reconstruction',
];

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);

const chrome = chromeCandidates.find((candidate) => existsSync(candidate));
if (!chrome) throw new Error('Chrome or Edge was not found. Set CHROME_PATH.');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(url) {
  const response = await fetch(url);
  return response.json();
}

async function openRoute(route, index) {
  const port = cdpBasePort + index;
  const profile = mkdtempSync(join(tmpdir(), 'sfe-smoke-'));
  const target = `${baseUrl}${route}`;
  const browser = spawn(chrome, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    target,
  ], { stdio: 'ignore' });

  try {
    let wsUrl;
    for (let attempt = 0; attempt < 60; attempt += 1) {
      try {
        const tabs = await getJson(`http://127.0.0.1:${port}/json`);
        wsUrl = tabs.find((tab) => tab.type === 'page')?.webSocketDebuggerUrl;
        if (wsUrl) break;
      } catch {
        // Chrome is still starting.
      }
      await sleep(100);
    }
    if (!wsUrl) throw new Error(`No CDP websocket for ${route}`);

    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    const consoleErrors = [];

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.method === 'Runtime.consoleAPICalled' && ['error', 'assert'].includes(message.params.type)) {
        consoleErrors.push(message.params.args.map((arg) => arg.value || arg.description || '').join(' '));
      }
      if (message.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(message.params.exceptionDetails?.text || 'Runtime exception');
      }
      if (message.id && pending.has(message.id)) {
        pending.get(message.id)(message);
        pending.delete(message.id);
      }
    };

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    const send = (method, params = {}) => {
      const requestId = ++id;
      ws.send(JSON.stringify({ id: requestId, method, params }));
      return new Promise((resolve) => pending.set(requestId, resolve));
    };

    await send('Runtime.enable');
    await send('Page.enable');
    await sleep(8000);

    const evaluation = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const mainText = document.querySelector('main')?.innerText || document.body.innerText || '';
        const bodyText = document.body.innerText || '';
        const links = [...document.querySelectorAll('a[href]')]
          .map((node) => node.getAttribute('href'))
          .filter(Boolean)
          .filter((href) => !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http') && !href.startsWith('#'))
          .map((href) => href.split('#')[0] || '/');
        const visibleCommercialText = [...document.querySelectorAll('a,button')]
          .filter((node) => {
            const rect = node.getBoundingClientRect();
            const style = getComputedStyle(node);
            return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
          })
          .map((node) => (node.innerText || node.getAttribute('aria-label') || '').trim())
          .filter(Boolean);
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText || '',
          mainContentFound: mainText.trim().length > 80 || bodyText.trim().length > 80,
          horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          scrollHeight: document.documentElement.scrollHeight,
          innerHeight: window.innerHeight,
          links: [...new Set(links)],
          visibleCommercialText,
        };
      })()`,
    });

    const metrics = evaluation.result.result.value;
    const statusResponse = await fetch(target);
    const brokenLinks = [];
    for (const href of metrics.links) {
      const linkUrl = new URL(href, baseUrl).toString();
      try {
        const response = await fetch(linkUrl);
        if (!response.ok) brokenLinks.push({ href, status: response.status });
      } catch (error) {
        brokenLinks.push({ href, error: error.message });
      }
    }

    ws.close();
    return {
      route,
      status: statusResponse.status,
      consoleErrors,
      horizontalOverflow: metrics.horizontalOverflow,
      mainContentFound: metrics.mainContentFound,
      h1: metrics.h1,
      linksBroken: brokenLinks,
      result: statusResponse.ok && consoleErrors.length === 0 && metrics.horizontalOverflow === 0 && metrics.mainContentFound && brokenLinks.length === 0 ? 'pass' : 'fail',
    };
  } finally {
    browser.kill();
    setTimeout(() => {
      try {
        rmSync(profile, { recursive: true, force: true });
      } catch {
        // Windows can keep profile locks briefly.
      }
    }, 1000);
  }
}

const results = [];
for (let i = 0; i < routes.length; i += 1) {
  results.push(await openRoute(routes[i], i));
}

const failed = results.filter((result) => result.result !== 'pass');
console.log(JSON.stringify({ status: failed.length ? 'fail' : 'pass', routes: results }, null, 2));
process.exit(failed.length ? 1 : 0);
