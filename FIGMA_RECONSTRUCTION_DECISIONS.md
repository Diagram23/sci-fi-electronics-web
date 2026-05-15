# Figma Reconstruction Decisions

## Verification Scope
- Verified against the local project/export present in this repo.
- Not verified against the current online Figma file. A newer Figma export or file access is required for 100% source-of-truth parity.

## Public Home
- Active public hero after purge: `HeroSectionAdvanced`.
- Active public section sequence after purge: `HeroSectionAdvanced`, `FeaturesSection`, `ProductsShowcase`, `PluginShowcase`, `ComingSoon`, `TrustMarquee`, `DawCompatibilityStrip`, `ArchiveTeaser`, `BrandStatement`, `BundleManifesto`, `TestimonialsSection`, `Footer`.
- Public Home now prioritizes the most probable local Figma sequence instead of the previous inflated Fractal Delay/Codex commercial buildout.
- Every public Home section now exposes `data-home-section`, `data-component`, `data-origin`, and `data-public-decision`.
- Current public Home origin count from `scripts/verify-public-home.mjs`: `figma-local: 11`, `codex-required: 1`.
- `/` disables `PromoBar` and uses `NavbarAdvanced` minimal mode so the first viewport matches the local Figma brand entry instead of pricing/auth/cart campaign chrome.

## Local Figma Reconstruction
- Dev route: `/dev/figma-original-reconstruction`.
- Reconstruction sequence prioritizes older local/Figma components:
  - `HeroSectionAdvanced`
  - `FeaturesSection`
  - `ProductsShowcase`
  - `PluginShowcase`
  - `ComingSoon`
  - `TrustMarquee`
  - `ArchiveTeaser`
  - `BrandStatement`
  - `Footer`
- This route confirms the local export appears to contain a broader brand/CHROMA/ctrl4filter direction, while the public Home is currently Fractal Delay/commercial collection focused.

## Component Gallery
- Dev route: `/dev/component-gallery`.
- Shows public active sections, older local Figma candidates, Codex replacements, support visuals and page previews.
- Fixed shell components (`Navbar`, `NavbarAdvanced`, `PromoBar`, `StickyBundleCTA`, `CookieConsent`) are documented rather than duplicated inline when rendering them would obscure the gallery.

## Substitutions
- `ProductHeroFigmaHybrid` no longer replaces the original hero publicly.
  - Decision: move out of public Home; keep as dev/reference/commercial candidate.
- `HeroSectionAdvanced` is restored publicly.
  - Decision: source-of-truth priority because it is the cleaner local Figma hero candidate.
- `FinalSignalCTA` is Codex-created.
  - Decision: removed from public Home because `BundleManifesto` covers the commercial close with a Figma-local component.
- `Footer` is active and uses the local Figma brand emblem.
  - Decision: keep as `codex-required`, not Figma original, because no complete local Figma footer file was found.
- `NavbarAdvanced` replaces original `Navbar`.
  - Decision: keep as codex-required shell because original `Navbar` has cyan/cyber styling and a live "Buy Now" feel that conflicts with the current local Figma section system.
- `PremiumLandingSections` remains dev-only.
  - Decision: keep in gallery; it duplicates already-mounted philosophy/features/bundle blocks.

## Components Integrated Publicly In This Pass
- `FeaturesSection`, `ProductsShowcase`, `PluginShowcase`, and `ComingSoon` are mounted directly on `/`.
- Reason: they represent the older local Figma/product-direction material and should be part of the public Home source-of-truth pass, not only `/about` or dev.
- `ProductGrid`, `AudioDemoSection`, `HowItWorksSection`, and `PluginComparisonTable` are no longer mounted on `/`; they remain better suited for `/plugins` or product-specific routes.

## Components Kept Dev Only
- `HeroSection`: older full-screen brand/plugin hero, dev only.
- `HeroSectionAdvanced`: stronger local Figma reconstruction candidate, dev only.
- `ProductHeroPremium`: Codex replacement reference, dev only.
- `PremiumLandingSections`: Codex/product-page fallback, dev only.
- `BrandIntro`: local Figma asset splash, dev only/disabled.
- `OscilloscopeCanvas`: visual support preview, dev only.
- `CursorToggle`: older cursor store control, dev only.

## Components Not Mounted
- `AuthModal`: support UI only; auth is not connected.
- `ProductGridSanity.example`: example integration file only.

## buildout.css Decision
- `buildout.css` was purged to technical support only.
- Removed: global borders, grids/glows, forced backgrounds, `!important` type overrides, decorative final CTA background.
- Kept: stacking isolation, text wrapping, audio canvas sizing, comparison table scrollbar styling, mobile touch target minimums.

## Public Integration Decision
- Public site now incorporates the major active Figma-style sections and exposes older Figma/local components in `/about` or dev comparison routes.
- Exact original order cannot be proven from the repo alone. No preserved original Figma App/Home composition file was found beyond component names, comments, and local component structure.

## Page Classifications
- `/`: Figma-local public Home sequence plus codex-required footer/shell.
- `/plugins`: public catalogue/product-system page using Figma-local sections plus Codex route composition.
- `/plugins/fractal-delay`: Codex-required product detail page with local visual components; not proven as exact Figma page.
- `/archive`: local/Figma archive-style page using remote archive artwork and `ImageWithFallback`.
- `/contact`: Codex-required page; no fake form/backend.
- `/faq`: Codex-required/support page.
- `/success`: Codex-required future confirmation placeholder; not a real checkout success claim.
- `/legal/*`: Codex-required legal pages; `/legal/license` is independent.
