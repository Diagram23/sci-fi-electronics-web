import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const url = process.env.SFE_HOME_URL || 'http://127.0.0.1:5173/';
const allowedCodexPublicComponents = new Set([
  'Footer',
]);
const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);

const chrome = chromeCandidates.find((candidate) => existsSync(candidate));

if (!chrome) {
  throw new Error('Chrome or Edge was not found. Set CHROME_PATH to run this verification.');
}

const port = Number(process.env.CDP_PORT || 9344);
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
}

async function getWebSocketUrl() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const tabs = await getJson(`http://127.0.0.1:${port}/json`);
      const page = tabs.find((tab) => tab.type === 'page');
      if (page?.webSocketDebuggerUrl) {
        return page.webSocketDebuggerUrl;
      }
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

  const opened = new Promise((resolve) => {
    ws.onopen = resolve;
  });

  const send = async (method, params = {}) => {
    const requestId = ++id;
    ws.send(JSON.stringify({ id: requestId, method, params }));
    return new Promise((resolve) => pending.set(requestId, resolve));
  };

  return { ws, opened, send };
}

function assertPass(condition, message, details = undefined) {
  if (!condition) {
    const suffix = details ? `\n${JSON.stringify(details, null, 2)}` : '';
    throw new Error(`${message}${suffix}`);
  }
}

try {
  const response = await fetch(url);
  assertPass(response.ok, `Home route did not respond successfully: ${response.status}`);

  const wsUrl = await getWebSocketUrl();
  const client = connect(wsUrl);
  await client.opened;
  await client.send('Runtime.enable');
  await client.send('Page.enable');
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
      const approvedHeroTextFound =
        /fractal/i.test(firstHeroText) &&
        /delay/i.test(firstHeroText) &&
        /time manipulation engine/i.test(firstHeroText) &&
        /(request|acquire) fractal delay/i.test(firstHeroText) &&
        /complete collection/i.test(firstHeroText);
      const genericHeroBlocked =
        firstHeroComponent !== 'HeroSectionAdvanced' &&
        !(/future sound tools/i.test(firstHeroText) && /explore sound packs/i.test(firstHeroText));
      const promoBarFound = /intro pricing active/i.test(text);
      const pluginVisualFound = !!document.querySelector('[data-component="ProductHeroFigmaHybrid"]') &&
        /192khz/i.test(firstHeroText) &&
        /vst3/i.test(firstHeroText);
      const missingHomeSection = sectionNodes.filter((node) => !node.getAttribute('data-home-section')).length;
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
      const disallowedCodex = sectionNodes
        .filter((node) => node.getAttribute('data-origin') === 'codex-created')
        .map((node) => ({ section: node.getAttribute('data-home-section'), component: node.getAttribute('data-component') }));
      const allowedCodexRequired = ['Footer'];
      const disallowedRequired = sectionNodes
        .filter((node) => node.getAttribute('data-origin') === 'codex-required')
        .map((node) => ({ section: node.getAttribute('data-home-section'), component: node.getAttribute('data-component') }))
        .filter((entry) => !allowedCodexRequired.includes(entry.component));
      const heroCount = homeSections.filter((section) => section === 'hero' || section.includes('hero')).length;
      const duplicatePairs = [
        ['product-grid', 'figma-products-showcase'],
        ['final-cta', 'bundle'],
        ['final-cta', 'sticky-bundle'],
        ['hero', 'hero-legacy'],
        ['product-grid', 'figma-plugin-showcase'],
        ['how-it-works', 'figma-features'],
        ['fractal-signal-system', 'figma-features'],
        ['fractal-signal-system', 'figma-products-showcase'],
        ['fractal-signal-system', 'figma-plugin-showcase'],
      ];
      const forbiddenHomeText = ['chroma', 'ctrl4filter'];
      const forbiddenContent = forbiddenHomeText.filter((term) => text.includes(term));
      const duplicateViolations = duplicatePairs
        .filter(([a, b]) => homeSections.includes(a) && homeSections.includes(b))
        .map(([a, b]) => a + ' + ' + b);
      const ctaWarnings = [...document.querySelectorAll('a,button')]
        .map((node) => ({
          text: (node.innerText || node.getAttribute('aria-label') || '').trim(),
          href: node.getAttribute('href') || '',
          disabled: node.disabled || node.getAttribute('aria-disabled') === 'true',
        }))
        .filter((item) => {
          const label = item.text.toLowerCase();
          if (!label) return false;
          if (item.disabled) return false;
          const commercial = /(buy now|checkout|download|instant download|acquire)/.test(label);
          const honest = /(request|contact|pending|view|explore|listen|archive|privacy|terms|license|cookies|faq|plugins|inicio|archivo)/.test(label);
          return commercial && !honest;
        });
      const internalLinks = [...document.querySelectorAll('a[href]')]
        .map((node) => node.getAttribute('href'))
        .filter(Boolean)
        .filter((href) => !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http') && !href.startsWith('#'))
        .map((href) => href.split('#')[0]);
      const requiredTerms = [
        { label: 'Product', ok: text.includes('product') || homeSections.includes('product-grid') },
        { label: 'Audio / Signal', ok: text.includes('audio') || text.includes('signal') || homeSections.includes('audio-demo') },
        { label: 'Archive', ok: text.includes('archive') || homeSections.includes('archive-teaser') },
        { label: 'Brand', ok: text.includes('sci-fi electronics') || homeSections.includes('brand-statement') },
        { label: 'Bundle', ok: text.includes('bundle') || homeSections.includes('bundle') },
        { label: 'Footer', ok: text.includes('legal') || text.includes('support') || homeSections.includes('footer') },
      ];
      const missingTerms = requiredTerms.filter((item) => !item.ok).map((item) => item.label);
      const horizontalOverflow = Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
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
        approvedHomeEntry: approvedHeroTextFound && genericHeroBlocked && promoBarFound && pluginVisualFound,
        heroText: approvedHeroTextFound ? 'FRACTAL DELAY found' : 'FRACTAL DELAY entry missing',
        genericHeroBlocked,
        promoBarFound,
        pluginVisualFound,
        firstHeroComponent,
        heroCount,
        horizontalOverflow,
        missingTerms,
        origins,
        decisions,
        missingHomeSection,
        missingOrigin,
        missingDecision,
        nonKeepDecisions,
        unknownOrigins,
        disallowedCodex,
        disallowedRequired,
        duplicateViolations,
        forbiddenContent,
        ctaWarnings,
        internalLinks: [...new Set(internalLinks)],
        htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
        bodyOverflowY: getComputedStyle(document.body).overflowY,
        rootOverflowY: getComputedStyle(document.getElementById('root')).overflowY,
      };
    })()`,
  });

  const metrics = evaluation.result.result.value;
  const brokenLinks = [];
  for (const internalLink of metrics.internalLinks) {
    const checkUrl = new URL(internalLink || '/', url).toString();
    try {
      const linkResponse = await fetch(checkUrl);
      if (!linkResponse.ok) {
        brokenLinks.push({ href: internalLink, status: linkResponse.status });
      }
    } catch (error) {
      brokenLinks.push({ href: internalLink, error: error.message });
    }
  }
  metrics.brokenInternalLinks = brokenLinks;

  const codexWarnings = [
    ...metrics.disallowedCodex,
    ...metrics.disallowedRequired,
  ];

  assertPass(metrics.homeSectionCount >= 6, 'Home renders fewer than 6 approved data-home-section blocks.', metrics);
  assertPass(metrics.approvedHomeEntry, 'Home does not render the user-approved FRACTAL DELAY entry.', metrics);
  assertPass(metrics.genericHeroBlocked, 'Home is using the generic SCI-FI ELECTRONICS / FUTURE SOUND TOOLS entry.', metrics);
  assertPass(metrics.scrollHeight > metrics.innerHeight * 3, 'Home scrollHeight is not at least 3x innerHeight.', metrics);
  assertPass(metrics.horizontalOverflow === 0, 'Home has visible horizontal overflow.', metrics);
  assertPass(metrics.heroCount === 1, 'Home must contain exactly one public hero.', metrics);
  assertPass(metrics.missingTerms.length === 0, 'Home is missing expected below-hero text terms.', metrics);
  assertPass(metrics.missingHomeSection === 0, 'Home contains section wrappers without data-home-section.', metrics);
  assertPass(metrics.missingOrigin.length === 0, 'Home contains sections without data-origin.', metrics);
  assertPass(metrics.missingDecision.length === 0, 'Home contains sections without data-public-decision.', metrics);
  assertPass(metrics.nonKeepDecisions.length === 0, 'Home contains visible sections not marked keep.', metrics);
  assertPass(metrics.unknownOrigins.length === 0, 'Home contains unknown-origin sections.', metrics);
  assertPass(metrics.disallowedCodex.length === 0, 'Home contains non-approved codex-created sections.', metrics);
  assertPass(metrics.disallowedRequired.length === 0, 'Home contains non-approved codex-required sections.', metrics);
  assertPass(metrics.duplicateViolations.length === 0, 'Home contains duplicate section pairs that were marked for purge.', metrics);
  assertPass(metrics.forbiddenContent.length === 0, 'Home contains CHROMA / ctrl4filter content that is not part of the approved Fractal Delay page.', metrics);
  assertPass(metrics.ctaWarnings.length === 0, 'Home contains CTAs that imply real purchase/checkout/download.', metrics);
  assertPass(metrics.brokenInternalLinks.length === 0, 'Home contains broken internal links.', metrics);
  assertPass((metrics.origins['figma-local'] || 0) + (metrics.origins['figma-modified'] || 0) > (metrics.origins['codex-created'] || 0) + (metrics.origins['codex-enhancement'] || 0) + (metrics.origins['codex-required'] || 0), 'Home does not have a clear Figma-origin majority.', metrics);

  console.log(JSON.stringify({
    status: 'pass',
    metrics,
    duplicateWarnings: metrics.duplicateViolations,
    codexWarnings,
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
