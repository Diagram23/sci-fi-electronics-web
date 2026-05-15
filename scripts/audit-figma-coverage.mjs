import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const scanRoots = [
  path.join(root, 'src', 'app', 'components'),
  path.join(root, 'src', 'app', 'pages'),
];

const publicEntrypoints = [
  'src/app/components/NavbarAdvanced.tsx',
  'src/app/components/PromoBar.tsx',
  'src/app/components/ScrollProgress.tsx',
  'src/app/components/CookieConsent.tsx',
  'src/app/components/CartDrawer.tsx',
  'src/app/components/CheckoutModal.tsx',
  'src/app/components/advanced/CustomCursor.tsx',
  'src/app/components/advanced/FloatingCursorToggle.tsx',
  'src/app/components/advanced/MouseSpotlight.tsx',
  'src/app/components/advanced/ParticlesBackground.tsx',
  'src/app/components/advanced/SmoothScroll.tsx',
  'src/app/pages/HomePage.tsx',
  'src/app/pages/AboutPage.tsx',
  'src/app/pages/AllPluginsPage.tsx',
  'src/app/pages/ArchivePage.tsx',
  'src/app/pages/ContactPage.tsx',
  'src/app/pages/FAQPage.tsx',
  'src/app/pages/LegalPage.tsx',
  'src/app/pages/PluginDetailPage.tsx',
  'src/app/pages/SuccessPage.tsx',
];

const devEntrypoints = [
  'src/app/pages/DevFigmaReferencePage.tsx',
  'src/app/pages/ComponentGalleryPage.tsx',
  'src/app/pages/FigmaOriginalReconstructionPage.tsx',
];

const knownCodex = new Set([
  'ProductHeroPremium.tsx',
  'ProductHeroFigmaHybrid.tsx',
  'FinalSignalCTA.tsx',
  'DevFigmaReferencePage.tsx',
  'ComponentGalleryPage.tsx',
  'FigmaOriginalReconstructionPage.tsx',
]);

const knownCodexEnhancement = new Set([
  'PromoBar.tsx',
  'StickyBundleCTA.tsx',
  'CheckoutModal.tsx',
  'CartDrawer.tsx',
  'CookieConsent.tsx',
  'NavbarAdvanced.tsx',
  'Footer.tsx',
]);

const knownFigmaLocal = new Set([
  'HeroSection.tsx',
  'HeroSectionAdvanced.tsx',
  'ProductsShowcase.tsx',
  'PluginShowcase.tsx',
  'ComingSoon.tsx',
  'BrandIntro.tsx',
  'ProductGrid.tsx',
  'AudioDemoSection.tsx',
  'ArchiveTeaser.tsx',
  'BrandStatement.tsx',
  'HowItWorksSection.tsx',
  'PluginComparisonTable.tsx',
  'BundleManifesto.tsx',
  'TestimonialsSection.tsx',
  'DawCompatibilityStrip.tsx',
  'TrustMarquee.tsx',
  'PluginWindowMockup.tsx',
  'PluginVisual.tsx',
  'OscilloscopeCanvas.tsx',
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function resolveImport(fromFile, spec) {
  if (!spec.startsWith('@/') && !spec.startsWith('.')) return null;

  let base;
  if (spec.startsWith('@/')) {
    base = path.join(srcRoot, spec.slice(2));
  } else {
    base = path.resolve(path.dirname(fromFile), spec);
  }

  const candidates = [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    `${base}.jsx`,
    `${base}.js`,
    path.join(base, 'index.tsx'),
    path.join(base, 'index.ts'),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function importsFor(file) {
  const text = read(file);
  const imports = new Set();
  const patterns = [
    /import\s+(?:[^'"]+?\s+from\s+)?['"]([^'"]+)['"]/g,
    /import\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const resolved = resolveImport(file, match[1]);
      if (resolved) imports.add(rel(resolved));
    }
  }

  return [...imports];
}

function componentName(file) {
  return path.basename(file).replace(/\.(tsx|ts|jsx|js)$/, '');
}

function classify(file) {
  const name = path.basename(file);
  const r = rel(file);
  const text = read(file);

  let type = 'support';
  if (r.includes('/pages/')) type = 'page';
  else if (r.includes('/components/ui/')) type = 'ui primitive';
  else if (r.includes('/components/advanced/')) type = 'advanced';
  else if (r.includes('/components/figma/')) type = 'figma helper';
  else if (r.includes('/components/visuals/')) type = 'visual support';
  else if (/Section|Hero|Grid|Teaser|Statement|Manifesto|Comparison|Marquee|Footer|Navbar|Showcase|Intro|CTA|Mockup/.test(name)) type = 'visual section';
  else if (/Modal|Drawer|Consent|Button|Progress/.test(name)) type = 'ui support';

  let origin = 'unknown';
  let originEvidence = 'No local Figma marker, known Codex marker, or asset marker found.';

  if (knownCodex.has(name)) {
    origin = 'codex-created';
    originEvidence = `Marked in audit as Codex-created replacement/dev utility: ${r}`;
  } else if (knownCodexEnhancement.has(name)) {
    origin = 'codex-enhancement';
    originEvidence = `Shell/compliance/commerce enhancement created after export: ${r}`;
  } else if (knownFigmaLocal.has(name)) {
    origin = 'figma-local';
    originEvidence = `Known local Figma/export visual component by filename and local component set: ${r}`;
  } else if (text.includes('figma:asset') || text.includes('ImageWithFallback')) {
    origin = 'figma-local-modified';
    originEvidence = `Uses local Figma asset or Figma helper in ${r}`;
  } else if (r.includes('/components/ui/')) {
    origin = 'unknown';
    originEvidence = `UI primitive/support file, not a Figma section: ${r}`;
  } else if (r.includes('/components/advanced/')) {
    origin = 'unknown';
    originEvidence = `Advanced support component; no direct Figma section evidence: ${r}`;
  } else if (name.includes('Sanity') || text.includes('sanity')) {
    origin = 'codex-enhancement';
    originEvidence = `CMS integration/example file, not original visual source: ${r}`;
  }

  return { type, origin, originEvidence };
}

const files = scanRoots
  .flatMap(walk)
  .filter((file) => /\.(tsx|ts)$/.test(file))
  .filter((file) => !file.endsWith('.d.ts'));

const allProjectFiles = walk(path.join(root, 'src')).filter((file) => /\.(tsx|ts)$/.test(file));
const importers = new Map(files.map((file) => [rel(file), []]));

for (const file of allProjectFiles) {
  for (const imported of importsFor(file)) {
    if (importers.has(imported)) importers.get(imported).push(rel(file));
  }
}

function reachableFrom(entrypoints) {
  const seen = new Set();
  const stack = entrypoints.filter((entry) => fs.existsSync(path.join(root, entry)));

  while (stack.length) {
    const current = stack.pop();
    if (!current || seen.has(current)) continue;
    seen.add(current);
    const full = path.join(root, current);
    for (const imported of importsFor(full)) {
      if (!seen.has(imported)) stack.push(imported);
    }
  }

  return seen;
}

const publicReachable = reachableFrom(publicEntrypoints);
const devReachable = reachableFrom(devEntrypoints);

function statusFor({ file, type, origin, publicMounted, devMounted, usedBy }) {
  const name = path.basename(file);
  if (type === 'ui primitive') return 'support primitive';
  if (name.includes('Sanity.example')) return 'example unused';
  if (devMounted && !publicMounted) return 'dev only';
  if (publicMounted && origin === 'codex-created') return 'codex enhancement';
  if (publicMounted) return 'integrated';
  if (usedBy.length === 0) return 'unused';
  return 'partially integrated';
}

const rows = files.map((file) => {
  const relative = rel(file);
  const { type, origin, originEvidence } = classify(file);
  const usedBy = importers.get(relative) ?? [];
  const publicMounted = publicReachable.has(relative);
  const devMounted = devReachable.has(relative);
  const status = statusFor({ file, type, origin, publicMounted, devMounted, usedBy });
  const action =
    status === 'unused' && type === 'visual section'
      ? 'review for public mount or dev reference'
      : status === 'dev only'
        ? 'keep in dev/reference unless latest Figma confirms public use'
        : status === 'codex enhancement'
          ? 'keep only if no stronger Figma original exists'
          : status === 'integrated'
            ? 'keep'
            : 'document';

  return {
    component: componentName(file),
    file: relative,
    type,
    origin,
    originEvidence,
    publicMounted,
    devMounted,
    usedBy,
    status,
    action,
  };
});

const visualRows = rows.filter((row) => !['ui primitive', 'figma helper'].includes(row.type));
const assetFiles = walk(path.join(root, 'src', 'assets')).filter((file) => /\.(png|jpe?g|webp|svg|gif|mp3|wav|aiff?)$/i.test(file));
const sourceText = walk(path.join(root, 'src'))
  .filter((file) => /\.(tsx|ts|css|md)$/.test(file))
  .map((file) => read(file))
  .join('\n');

const assets = assetFiles.map((file) => {
  const relative = rel(file);
  const base = path.basename(file);
  return {
    file: relative,
    used: sourceText.includes(base) || sourceText.includes(relative),
  };
});

const counts = {
  totalComponents: rows.length,
  totalVisualMain: visualRows.length,
  publicMounted: visualRows.filter((row) => row.publicMounted).length,
  devOnly: visualRows.filter((row) => row.devMounted && !row.publicMounted).length,
  unused: visualRows.filter((row) => row.status === 'unused').length,
  codex: visualRows.filter((row) => row.origin === 'codex-created').length,
  duplicated: 4,
  assetsFound: assets.length,
  assetsUsed: assets.filter((asset) => asset.used).length,
  assetsUnused: assets.filter((asset) => !asset.used).length,
};

const coveragePct = counts.totalVisualMain
  ? Math.round((counts.publicMounted / counts.totalVisualMain) * 100)
  : 0;

const lines = [];
lines.push('# Figma Export Coverage Audit');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push('');
lines.push('## Metrics');
lines.push('');
lines.push(`- Total TS/TSX components/pages scanned: ${counts.totalComponents}`);
lines.push(`- Total non-primitive visual/page components: ${counts.totalVisualMain}`);
lines.push(`- Mounted publicly/reachable from App public routes: ${counts.publicMounted}`);
lines.push(`- Mounted only in dev/reference routes: ${counts.devOnly}`);
lines.push(`- Unused visual/page components: ${counts.unused}`);
lines.push(`- Codex-created visual/page components detected: ${counts.codex}`);
lines.push(`- Known duplicate conceptual groups: ${counts.duplicated} (Navbar, Hero, Product showcase, checkout/contact CTA systems)`);
lines.push(`- Approximate public integration coverage of local visual export: ${coveragePct}%`);
lines.push(`- Assets found: ${counts.assetsFound}`);
lines.push(`- Assets referenced by source: ${counts.assetsUsed}`);
lines.push(`- Assets not referenced by source: ${counts.assetsUnused}`);
lines.push('');
lines.push('## Component Coverage Table');
lines.push('');
lines.push('| Component | Path | Imported By | Mounted Public | Mounted Dev | Origin | Origin Evidence | Status | Action |');
lines.push('|---|---|---|---:|---:|---|---|---|---|');
for (const row of rows.sort((a, b) => a.file.localeCompare(b.file))) {
  const usedBy = row.usedBy.length ? row.usedBy.map((u) => `\`${u}\``).join('<br>') : '-';
  lines.push(`| ${row.component} | \`${row.file}\` | ${usedBy} | ${row.publicMounted ? 'yes' : 'no'} | ${row.devMounted ? 'yes' : 'no'} | ${row.origin} | ${row.originEvidence} | ${row.status} | ${row.action} |`);
}

lines.push('');
lines.push('## Assets');
lines.push('');
lines.push('| Asset | Referenced |');
lines.push('|---|---:|');
for (const asset of assets) {
  lines.push(`| \`${asset.file}\` | ${asset.used ? 'yes' : 'no'} |`);
}

fs.writeFileSync(path.join(root, 'FIGMA_EXPORT_COVERAGE.md'), `${lines.join('\n')}\n`);

console.log(`Figma coverage written to FIGMA_EXPORT_COVERAGE.md`);
console.log(JSON.stringify({ ...counts, coveragePct }, null, 2));
