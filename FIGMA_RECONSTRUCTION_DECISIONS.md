# Figma Reconstruction Decisions

## PUBLIC HOME ENTRY LOCK / BLOQUEO DE ENTRADA PUBLICA

The approved public `/` entry is the FRACTAL DELAY hero shown in the user-approved screenshot: PromoBar, full Navbar, FRACTAL DELAY editorial hero, plugin mockup, and Fractal Delay / Complete Collection CTAs.

La entrada aprobada de `/` es el hero de FRACTAL DELAY de la captura del usuario. No cambiar por `HeroSectionAdvanced` ni por la entrada generica SCI-FI ELECTRONICS / FUTURE SOUND TOOLS sin autorizacion explicita.

## Verification Scope
- Verified against the local project/export present in this repo.
- Not verified against the current online Figma file. A newer Figma export or file access is required for 100% source-of-truth parity.

## Public Home
- Active public hero after correction: `ProductHeroPremium`.
- Active public section sequence: `ProductHeroPremium`, `DawCompatibilityStrip`, `ProductGrid`, `TrustMarquee`, `ArchiveTeaser`, `AudioDemoSection`, `TestimonialsSection`, `ComingSoon`, `Footer`, plus `StickyBundleCTA`.
- Public Home now prioritizes the full supplied screenshot set (`pagina 1.png` through `pagina 9.png`) as visual source-of-truth.
- Every public Home section now exposes `data-home-section`, `data-component`, `data-origin`, and `data-public-decision`.
- The Home entry contract is locked in `src/app/config/siteConfig.ts` with `HOME_ENTRY_SOURCE = "user-approved-fractal-delay-entry"` and `HOME_HERO_COMPONENT = "ProductHeroPremium"`.
- Current expected public Home origin count from `scripts/verify-public-home.mjs`: majority `figma-local`, with `ProductHeroPremium` as the approved hero implementation and `Footer` as codex-required shell.
- `/` shows `PromoBar` and uses the full `NavbarAdvanced` shell so the first viewport matches the approved FRACTAL DELAY screenshot.

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
- `ProductHeroPremium` is restored publicly as the approved `/` entry.
  - Decision: it is the closest implementation to the supplied FRACTAL DELAY hero screenshot: serif title, plugin mockup, Launch Price/CTA composition, full PromoBar/Navbar context.
- `ProductHeroFigmaHybrid` is kept as dev/reference fallback only.
- `HeroSectionAdvanced` is not the public `/` entry.
  - Decision: keep in dev/reference routes only unless the user explicitly requests returning to the generic SCI-FI ELECTRONICS entry.
- `FinalSignalCTA` is Codex-created.
  - Decision: removed from public Home because `BundleManifesto` covers the commercial close with a Figma-local component.
- `Footer` is active and uses the local Figma brand emblem.
  - Decision: keep as `codex-required`, not Figma original, because no complete local Figma footer file was found.
- `NavbarAdvanced` replaces original `Navbar`.
  - Decision: keep as codex-required shell because original `Navbar` has cyan/cyber styling and a live "Buy Now" feel that conflicts with the current local Figma section system.
- `PremiumLandingSections` remains dev-only.
  - Decision: it introduced a Codex continuation that does not appear in the supplied screenshot sequence.

## Components Integrated Publicly In This Pass
- `DawCompatibilityStrip`, `ProductGrid`, `TrustMarquee`, `ArchiveTeaser`, `AudioDemoSection`, `TestimonialsSection`, `ComingSoon`, and `Footer` are mounted on `/` because they match the supplied screenshots.
- `PremiumLandingSections` and `BrandStatement` are removed from `/` because they do not appear in the supplied final Home screenshots.
- `HowItWorksSection` and `PluginComparisonTable` remain better suited for `/plugins` or product-specific routes unless a later screenshot/export shows them in Home.

## Components Kept Dev Only
- `HeroSection`: older full-screen brand/plugin hero, dev only.
- `HeroSectionAdvanced`: generic local-Figma brand entry, dev/reference only after approved FRACTAL DELAY restore.
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
