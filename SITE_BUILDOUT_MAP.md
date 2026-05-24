# SCI-FI ELECTRONICS Site Buildout Map

## PUBLIC HOME ENTRY LOCK / BLOQUEO DE ENTRADA PUBLICA

The approved public `/` entry is the FRACTAL DELAY hero shown in the user-approved screenshot. It must keep `PromoBar`, full `NavbarAdvanced`, the plugin mockup, FRACTAL DELAY copy, and Fractal Delay / Complete Collection CTAs. Do not replace it with `HeroSectionAdvanced` / SCI-FI ELECTRONICS generic entry without explicit approval.

La entrada aprobada de `/` es el hero de FRACTAL DELAY de la captura del usuario. No cambiar por `HeroSectionAdvanced` ni por la entrada generica SCI-FI ELECTRONICS sin autorizacion explicita.

This file tracks the local Figma/Figma Make buildout state so future passes do not drift into unrelated redesign.

## Home Current Architecture
- PromoBar / NavbarAdvanced: mounted globally in `App.tsx`; keep.
- ProductHeroPremium: mounted publicly as the approved FRACTAL DELAY first viewport because it matches screenshot #1 most closely.
- DawCompatibilityStrip: mounted publicly as the screenshot #2 DAW compatibility section.
- ProductGrid: mounted publicly as the screenshot #3/#4 catalogue/product-card section.
- TrustMarquee: mounted publicly as the screenshot #4 moving trust/spec strip.
- ArchiveTeaser: mounted publicly; Figma/local archive teaser.
- AudioDemoSection: mounted publicly as screenshot #6 signal/audio preview.
- TestimonialsSection: mounted publicly as screenshot #7 social proof section.
- ComingSoon: mounted publicly as screenshot #8 Membrana/newsletter section.
- Footer: mounted publicly; codex-required because no complete local Figma footer equivalent was found.
- CookieConsent: mounted globally; technical/compliance requirement.
- StickyBundleCTA: mounted on Home because screenshots #3-#9 show the bottom bundle bar.

## Available But Not Primary Home Sections
- HeroSection: local/Figma candidate; available in `/dev/figma-reference`; not public home.
- HeroSectionAdvanced: generic local/Figma brand entry; available in dev/reference; not public home after approved FRACTAL DELAY restore.
- ProductHeroFigmaHybrid: Codex-created previous hero; kept as dev/reference fallback only.
- FeaturesSection / ProductsShowcase / PluginShowcase: not mounted on `/` because `ProductGrid` is the screenshot-matching catalogue section.
- BundleManifesto: removed from public `/` to avoid duplicating the Fractal bundle CTA in `PremiumLandingSections`; remains on catalogue/product routes.
- HowItWorksSection / PluginComparisonTable: remain available through `/plugins` or dev reference; they are not visible in the supplied Home screenshots.
- BrandIntro: Figma asset splash; disabled by config, asset reused in Footer.
- ComponentGalleryPage: internal route at `/dev/component-gallery` for full visual inventory.
- FigmaOriginalReconstructionPage: internal route at `/dev/figma-original-reconstruction` for local export reconstruction.

## Page Ownership
- `/`: source-of-truth Home sequence from the supplied screenshot set: Fractal hero, compatibility, catalogue, trust strip, archive, audio demo, testimonials, coming soon, footer.
- `/plugins`: catalogue narrative using ProductGrid, AudioDemoSection, comparison, bundle and final CTA.
- `/plugins/fractal-delay`: product detail route; keeps generated product detail structure with contact fallback.
- `/archive`: editorial/technical archive route; archive access copy corrected.
- `/contact`: premium contact route with General, Support, Sales/Licensing, Collaborations, Press/Archive.
- `/about`: public brand/product-direction route. Still includes `FeaturesSection`, `ProductsShowcase`, `PluginShowcase`, and `ComingSoon` as legacy/reference narrative.
- `/faq`: existing premium FAQ page; polish only.
- `/success`: future checkout confirmation placeholder; honest by design.
- `/legal/*`: legal layouts; keep separate license/cookies/privacy/terms.
- `/dev/figma-reference`: internal comparison page; not linked in public nav.
- `/dev/component-gallery`: internal gallery of visual components/pages; not linked in public nav.
- `/dev/figma-original-reconstruction`: internal local-Figma reconstruction; not linked in public nav.

## Crude Areas Rebuilt In This Pass
- ProductGrid CTA flow no longer opens local fake checkout.
- AudioDemoSection no longer presents audio previews as real audio delivery.
- PluginComparisonTable contact CTAs no longer open cart/checkout.
- BundleManifesto request flow no longer opens cart/checkout.
- StickyBundleCTA now routes to contact sales.
- PluginDetailPage purchase CTAs now route to contact sales.
- ArchivePage access wording corrected away from generic instant-download language.
- Home final commercial CTA was removed again in the Figma purge because it was a Codex-created duplicate of `BundleManifesto`.

## Assets
- Used: local Figma brand emblem via `figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png`.
- Used: external archive artwork URLs from the local export.
- Placeholder: CSS/plugin mockups and waveform visuals.
- Pending: owned plugin UI renders, real audio demo WAV/MP3 files, logo pack, Open Graph/social card.

## Mount Decisions
- Keep Figma/local sections mounted and polish in place.
- Keep `ProductHeroPremium` as public Home hero because it matches the supplied FRACTAL DELAY screenshot better than the other local hero candidates.
- Keep checkout disabled and route commercial CTAs to contact until a real provider is connected.
- Keep BrandIntro disabled by default; reuse the asset as brand texture/emblem.
- Keep `buildout.css` as a limited integration layer only; do not use it as a substitute for mounting real Figma components.
- Keep `/dev/component-gallery` and `/dev/figma-original-reconstruction` enabled while integration is under review.
