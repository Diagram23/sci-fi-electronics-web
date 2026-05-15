# SCI-FI ELECTRONICS Figma Fidelity Audit

Status: local export audit, not online Figma verification.

## Verification Scope

I cannot verify changes made later in the online Figma file without a fresh export, a Figma URL with access, or current reference screenshots. This audit compares the active implementation against the local export evidence present in this repository.

## Evidence Of Local Figma Export

- `ATTRIBUTIONS.md` states that the file came from Figma Make and includes shadcn/ui and Unsplash attributions.
- `vite.config.ts` includes a `figma:asset/*` resolver that maps generated Figma asset imports into `src/assets`.
- `src/app/components/figma/ImageWithFallback.tsx` is a generated Figma support component.
- `src/assets/6a48319d71f3339b74104ffc5d20862e540ee731.png` is a local Figma asset referenced by `BrandIntro.tsx`.
- `src/app/components/ui/*` contains generated shadcn-style primitives commonly emitted with Figma Make exports.
- `README.md` identifies the local V1 product direction as `CHROMA` and `ctrl4filter`, which differs from the active Fractal Delay direction.

## Product Direction Conflict

The local export evidence points to an earlier V1 direction:

- `CHROMA`: sample pack, available.
- `ctrl4filter`: plugin, in development.

The active mounted site is now oriented around:

- `FRACTAL DELAY`: current lead product.
- Complete plugin collection / bundle.

Decision: keep Fractal Delay as the active commercial direction, but document CHROMA and ctrl4filter as local Figma/V1 legacy content until a new Figma export confirms the current product source of truth.

## Component Fidelity Matrix

| Section / Component | Origin class | Active status | Fidelity status | Decision |
| --- | --- | --- | --- | --- |
| PromoBar | Codex enhancement | Mounted globally | Modified but acceptable | Keep |
| NavbarAdvanced | Codex enhancement over local nav needs | Mounted globally | Modified but acceptable | Keep and polish only |
| Navbar | Figma/legacy candidate | Not mounted | Replaced | Leave available in dev reference |
| HeroSection | Legacy/Codex candidate | Not mounted | Replaced | Leave available in dev reference |
| HeroSectionAdvanced | Figma/legacy candidate | Not mounted | Missing from active page | Compare in dev reference |
| ProductHeroPremium | Codex replacement | Replaced by hybrid | Needs repair | Keep as reference, do not delete |
| ProductHeroFigmaHybrid | Hybrid reconstruction | Mounted on home | Figma-modified plus Codex commercial | Keep |
| PluginWindowMockup | Codex enhancement | Mounted | Placeholder product mockup | Keep until real mockup asset exists |
| ProductGrid | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| AudioDemoSection | Figma-style advanced section | Mounted | Placeholder risk | Keep, make placeholder honest |
| DawCompatibilityStrip | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| ArchiveTeaser | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| BrandStatement | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| HowItWorksSection | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| PluginComparisonTable | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| BundleManifesto | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| TestimonialsSection | Figma-style advanced section | Mounted | Modified but acceptable | Keep |
| StickyBundleCTA | Codex enhancement | Mounted | Technical enhancement | Keep |
| Footer | Codex simple page component | Mounted | Needs repair | Reconstruct visually |
| ArchivePage | Figma-style page | Mounted | Modified but acceptable | Keep |
| PluginsPage | Codex/Figma hybrid | Mounted | Modified but acceptable | Keep |
| PluginDetailPage | Codex/Figma hybrid | Mounted | Modified but acceptable | Keep |
| ContactPage | Codex simple page | Mounted | Needs repair | Reconstruct visually |
| FAQPage | Codex/Figma hybrid | Mounted | Modified but acceptable | Keep |
| SuccessPage | Codex utility page | Mounted | Technical utility | Keep with honest copy |
| LegalPages | Codex utility pages | Mounted | Technical utility | Keep |
| BrandIntro | Figma-local asset component | Disabled | Disabled optional | Leave disabled, reuse asset subtly |
| PremiumLandingSections | Codex replacement | Not mounted | Duplicate | Keep unused, do not remount |
| ProductsShowcase | Legacy candidate | Not mounted | Missing/legacy | Leave available |
| PluginShowcase | Legacy candidate | Not mounted | Missing/legacy | Leave available |
| FeaturesSection | Legacy candidate | Not mounted | Missing/legacy | Leave available |
| ComingSoon | Legacy candidate | Not mounted | Missing/legacy | Leave available |

## Current Decisions

- Keep the complete mounted home architecture.
- Do not restore `HeroSectionAdvanced` wholesale because it points at the older CHROMA/sound-pack direction rather than the current Fractal Delay product page.
- Hybridize the hero by recovering the calmer Figma/V1 technical frame, radial atmosphere, compact labels and more restrained composition while retaining Fractal Delay, pricing, CTA clarity and responsive fixes.
- Keep `BrandIntro` disabled by default. Blocking splash behavior is not production-safe for the current site.
- Reuse the local Figma brand emblem in the footer only as a subtle identity asset.
- Treat all audio waveforms and playback UI as placeholders until real audio files exist.
- Keep checkout/auth disabled or routed through honest contact fallback until real integrations are approved.

## Pending Latest Figma Export

To reach 100 percent fidelity with the current Figma design, the next phase needs one of:

- Fresh Figma Make ZIP export.
- Figma file URL with access.
- Current desktop and mobile screenshots from the Figma design.

Without that, fidelity can only be measured against the local V1 export evidence in this repo.
