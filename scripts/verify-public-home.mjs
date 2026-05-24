import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const url = process.env.SFE_HOME_URL || 'http://127.0.0.1:5173/';
const port = Number(process.env.CDP_PORT || 9344);
const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);

const chrome = chromeCandidates.find((candidate) => existsSync(candidate));
if (!chrome) throw new Error('Chrome or Edge was not found. Set CHROME_PATH to run this verification.');

const profile = mkdtempSync(join(tmpdir(), 'sfe-home-verify-'));
const browser = spawn(chrome, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1440,900',
  url,
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getJson = async (endpoint) => (await fetch(endpoint)).json();

async function getWebSocketUrl() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const tabs = await getJson(`http://127.0.0.1:${port}/json`);
      const page = tabs.find((tab) => tab.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome may still be starting.
    }
    await sleep(100);
  }
  throw new Error('Unable to connect to Chrome DevTools Protocol.');
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  };

  const opened = new Promise((resolve) => { ws.onopen = resolve; });
  const send = async (method, params = {}) => {
    const requestId = ++id;
    ws.send(JSON.stringify({ id: requestId, method, params }));
    return new Promise((resolve) => pending.set(requestId, resolve));
  };

  return { ws, opened, send };
}

function assertPass(condition, message, details) {
  if (!condition) {
    throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
  }
}

try {
  const response = await fetch(url);
  assertPass(response.ok, `Home route did not respond successfully: ${response.status}`, { status: response.status });

  const client = connect(await getWebSocketUrl());
  await client.opened;
  await client.send('Runtime.enable');
  await client.send('Page.enable');
  await client.send('Page.navigate', { url });
  await sleep(6500);

  const evaluation = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const text = document.body.innerText.toLowerCase();
      const sectionNodes = [...document.querySelectorAll('[data-home-section]')];
      const homeSections = sectionNodes.map((node) => node.getAttribute('data-home-section'));
      const componentNames = sectionNodes.map((node) => node.getAttribute('data-component') || 'missing-component');
      const firstHomeSection = sectionNodes[0] || null;
      const firstHeroText = (firstHomeSection?.innerText || '').replace(/\\s+/g, ' ').trim();
      const firstHeroComponent = firstHomeSection?.getAttribute('data-component') || '';
      const origins = sectionNodes.reduce((acc, node) => {
        const origin = node.getAttribute('data-origin') || 'unknown';
        acc[origin] = (acc[origin] || 0) + 1;
        return acc;
      }, {});
      const decisions = sectionNodes.reduce((acc, node) => {
        const decision = node.getAttribute('data-public-decision') || 'unknown';
        acc[decision] = (acc[decision] || 0) + 1;
        return acc;
      }, {});

      const approvedHeroTextFound =
        /fractal/i.test(firstHeroText) &&
        /delay/i.test(firstHeroText) &&
        /time manipulation engine/i.test(firstHeroText) &&
        /acquire fractal delay/i.test(firstHeroText) &&
        /complete collection/i.test(firstHeroText);

      const genericHeroBlocked =
        firstHeroComponent !== 'HeroSectionAdvanced' &&
        !(/future sound tools/i.test(firstHeroText) && /explore sound packs/i.test(firstHeroText));

      const requiredSections = [
        'hero',
        'compatibility',
        'product-grid',
        'trust-marquee',
        'archive-teaser',
        'audio-demo',
        'testimonials',
        'coming-soon',
        'footer',
      ];
      const missingSections = requiredSections.filter((section) => !homeSections.includes(section));
      const forbiddenSections = [
        'fractal-signal-system',
        'brand-statement',
        'figma-products-showcase',
        'figma-plugin-showcase',
        'figma-features',
        'final-cta',
        'hero-legacy',
      ].filter((section) => homeSections.includes(section));
      const duplicatePairs = [
        ['product-grid', 'figma-products-showcase'],
        ['product-grid', 'figma-plugin-showcase'],
        ['figma-products-showcase', 'figma-plugin-showcase'],
        ['fractal-signal-system', 'figma-features'],
        ['brand-statement', 'archive-teaser'],
        ['final-cta', 'coming-soon'],
      ];
      const duplicateViolations = duplicatePairs
        .filter(([a, b]) => homeSections.includes(a) && homeSections.includes(b))
        .map(([a, b]) => a + ' + ' + b);
      const firstHeroApprovedComponent = firstHeroComponent === 'ProductHeroPremium';
      const promoBarFound = /intro pricing active/i.test(text);
      const sectionTextChecks = [
        { label: 'DAW compatibility', ok: /works in every major daw/i.test(text) },
        { label: 'Product catalog', ok: /gold para productores/i.test(text) || /ctrlfilter/i.test(text) || /chroma/i.test(text) },
        { label: 'Archive', ok: /archive/i.test(text) },
        { label: 'Audio demo', ok: /hear the difference/i.test(text) || /before & after/i.test(text) },
        { label: 'Testimonials', ok: /lo que dicen/i.test(text) || /producer notes/i.test(text) },
        { label: 'Coming soon', ok: /membrana/i.test(text) || /bolet/i.test(text) },
        { label: 'Footer', ok: /privacy/i.test(text) && /license/i.test(text) },
      ];
      const missingTextChecks = sectionTextChecks.filter((item) => !item.ok).map((item) => item.label);
      const missingOrigin = sectionNodes
        .filter((node) => !node.getAttribute('data-origin'))
        .map((node) => node.getAttribute('data-home-section') || node.tagName.toLowerCase());
      const missingDecision = sectionNodes
        .filter((node) => !node.getAttribute('data-public-decision'))
        .map((node) => node.getAttribute('data-home-section') || node.tagName.toLowerCase());
      const nonKeepDecisions = sectionNodes
        .filter((node) => node.getAttribute('data-public-decision') !== 'keep')
        .map((node) => node.getAttribute('data-home-section'));
      const unknownOrigins = sectionNodes
        .filter((node) => node.getAttribute('data-origin') === 'unknown')
        .map((node) => node.getAttribute('data-home-section'));
      const disallowedCodex = sectionNodes
        .filter((node) => node.getAttribute('data-origin') === 'codex-created')
        .map((node) => ({ section: node.getAttribute('data-home-section'), component: node.getAttribute('data-component') }));
      const allowedCodexRequired = ['Footer'];
      const disallowedRequired = sectionNodes
        .filter((node) => node.getAttribute('data-origin') === 'codex-required')
        .map((node) => ({ section: node.getAttribute('data-home-section'), component: node.getAttribute('data-component') }))
        .filter((entry) => !allowedCodexRequired.includes(entry.component));
      const horizontalOverflow = Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const internalLinks = [...document.querySelectorAll('a[href]')]
        .map((node) => node.getAttribute('href'))
        .filter(Boolean)
        .filter((href) => !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http') && !href.startsWith('#'))
        .map((href) => href.split('#')[0]);
      const ctaWarnings = [...document.querySelectorAll('a,button')]
        .map((node) => ({
          text: (node.innerText || node.getAttribute('aria-label') || '').trim(),
          href: node.getAttribute('href') || '',
          disabled: node.disabled || node.getAttribute('aria-disabled') === 'true',
        }))
        .filter((item) => {
          const label = item.text.toLowerCase();
          if (!label || item.disabled) return false;
          const approvedScreenshotLabel = /(buy now|buy bundle|acquire fractal delay|complete collection)/.test(label);
          if (approvedScreenshotLabel) return false;
          const commercial = /(checkout|download|instant download|purchase)/.test(label);
          const honest = /(request|contact|pending|view|explore|listen|archive|privacy|terms|license|cookies|faq|plugins|inicio|archivo)/.test(label);
          return commercial && !honest;
        });
      return {
        url: location.href,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        scrollHeight: document.documentElement.scrollHeight,
        bodyScrollHeight: document.body.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        homeSectionCount: homeSections.length,
        homeSections,
        componentNames,
        approvedHomeEntry: approvedHeroTextFound && genericHeroBlocked && firstHeroApprovedComponent && promoBarFound,
        heroText: approvedHeroTextFound ? 'FRACTAL DELAY found' : 'FRACTAL DELAY entry missing',
        firstHeroComponent,
        genericHeroBlocked,
        promoBarFound,
        firstHeroApprovedComponent,
        missingSections,
        forbiddenSections,
        duplicateViolations,
        missingTextChecks,
        origins,
        decisions,
        missingOrigin,
        missingDecision,
        nonKeepDecisions,
        unknownOrigins,
        disallowedCodex,
        disallowedRequired,
        horizontalOverflow,
        ctaWarnings,
        internalLinks: [...new Set(internalLinks)],
      };
    })()`,
  });

  const metrics = evaluation.result.result.value;
  const brokenLinks = [];
  for (const internalLink of metrics.internalLinks) {
    const checkUrl = new URL(internalLink || '/', url).toString();
    try {
      const linkResponse = await fetch(checkUrl);
      if (!linkResponse.ok) brokenLinks.push({ href: internalLink, status: linkResponse.status });
    } catch (error) {
      brokenLinks.push({ href: internalLink, error: error.message });
    }
  }
  metrics.brokenInternalLinks = brokenLinks;

  assertPass(metrics.approvedHomeEntry, 'Home does not render the approved FRACTAL DELAY Figma screenshot entry.', metrics);
  assertPass(metrics.scrollHeight > metrics.innerHeight * 3, 'Home scrollHeight is not at least 3x innerHeight.', metrics);
  assertPass(metrics.horizontalOverflow === 0, 'Home has visible horizontal overflow.', metrics);
  assertPass(metrics.missingSections.length === 0, 'Home is missing required screenshot sections.', metrics);
  assertPass(metrics.forbiddenSections.length === 0, 'Home contains sections outside the approved screenshot sequence.', metrics);
  assertPass(metrics.duplicateViolations.length === 0, 'Home contains duplicate section pairs.', metrics);
  assertPass(metrics.missingTextChecks.length === 0, 'Home is missing visible text from the approved screenshots.', metrics);
  assertPass(metrics.missingOrigin.length === 0, 'Home contains sections without data-origin.', metrics);
  assertPass(metrics.missingDecision.length === 0, 'Home contains sections without data-public-decision.', metrics);
  assertPass(metrics.nonKeepDecisions.length === 0, 'Home contains visible sections not marked keep.', metrics);
  assertPass(metrics.unknownOrigins.length === 0, 'Home contains unknown-origin sections.', metrics);
  assertPass(metrics.disallowedCodex.length === 0, 'Home contains non-approved codex-created sections.', metrics);
  assertPass(metrics.disallowedRequired.length === 0, 'Home contains non-approved codex-required sections.', metrics);
  assertPass(metrics.ctaWarnings.length === 0, 'Home contains CTAs that imply unsupported functionality.', metrics);
  assertPass(metrics.brokenInternalLinks.length === 0, 'Home contains broken internal links.', metrics);

  console.log(JSON.stringify({
    status: 'pass',
    metrics,
    duplicateWarnings: metrics.duplicateViolations,
    codexWarnings: [...metrics.disallowedCodex, ...metrics.disallowedRequired],
    unknownWarnings: metrics.unknownOrigins,
    ctaWarnings: metrics.ctaWarnings,
    internalLinksChecked: metrics.internalLinks,
  }, null, 2));
  client.ws.close();
} finally {
  browser.kill();
  setTimeout(() => {
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {
      // Chrome can keep profile files locked briefly on Windows.
    }
  }, 1000);
}
