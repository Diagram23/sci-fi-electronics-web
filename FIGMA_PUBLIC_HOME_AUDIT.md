# Figma Public Home Audit

## PUBLIC HOME ENTRY LOCK / BLOQUEO DE ENTRADA PUBLICA

The approved public `/` entry is the FRACTAL DELAY hero shown in the user-approved screenshot: PromoBar, full Navbar, plugin mockup, `Request Fractal Delay - $129` / `Complete Collection - $349`, and the Fractal Delay product copy.

La entrada aprobada de `/` es el hero de FRACTAL DELAY de la captura del usuario. No cambiar por `HeroSectionAdvanced` ni por la entrada generica SCI-FI ELECTRONICS / FUTURE SOUND TOOLS sin autorizacion explicita.

## Current Public Home Sequence

Update 2026-05-24: the full screenshot set `pagina 1.png` through `pagina 9.png` is now the active visual source-of-truth. It includes the FRACTAL DELAY first viewport, DAW compatibility, product catalogue cards, archive, audio demo, testimonials, coming soon/newsletter, footer, and sticky bundle bar. The previous purge that removed CHROMA/ctrl4filter/ComingSoon from `/` is superseded by this source-of-truth.

| Order | data-home-section | Component | Path | Origin | Public Decision | Reason | CTA/Link Status |
|---:|---|---|---|---|---|---|---|
| 1 | `hero` | `ProductHeroPremium` | `src/app/components/ProductHeroPremium.tsx` | codex-enhancement | keep | Closest local implementation to screenshot #1: FRACTAL DELAY serif hero, PromoBar/full Navbar context, plugin mockup, specs, and collection CTA. | CTAs route to `/contact` or `#bundle`; no checkout provider is connected. |
| 2 | `compatibility` | `DawCompatibilityStrip` | `src/app/components/DawCompatibilityStrip.tsx` | figma-local | keep | Matches screenshot #2: "Works in every major DAW" compatibility proof. | No checkout. |
| 3 | `product-grid` | `ProductGrid` | `src/app/components/ProductGrid.tsx` | figma-local | keep | Matches screenshots #3/#4 catalogue/product-card section including CHROMA/CTRLFILTER content. | Product access routes to contact fallback. |
| 4 | `trust-marquee` | `TrustMarquee` | `src/app/components/TrustMarquee.tsx` | figma-local | keep | Matches screenshot #4 two-line moving trust/spec strip. | No checkout. |
| 5 | `archive-teaser` | `ArchiveTeaser` | `src/app/components/ArchiveTeaser.tsx` | figma-local | keep | Matches screenshot #5 archive editorial section. | Internal `/archive` link/contact fallback. |
| 6 | `audio-demo` | `AudioDemoSection` | `src/app/components/AudioDemoSection.tsx` | figma-local | keep | Matches screenshot #6 "Hear the Difference" section; banner states waveforms are simulated. | No real audio delivery promised. |
| 7 | `testimonials` | `TestimonialsSection` | `src/app/components/TestimonialsSection.tsx` | figma-local | keep | Matches screenshot #7 testimonial layout. | No checkout. |
| 8 | `coming-soon` | `ComingSoon` | `src/app/components/ComingSoon.tsx` | figma-local | keep | Matches screenshot #8 Membrana/newsletter section. | Newsletter UI remains visual/local only until service integration. |
| 9 | `footer` | `Footer` | `src/app/components/Footer.tsx` | codex-required | keep | Matches screenshot #9 footer architecture; no complete separate Figma footer source file found. | Legal/contact links checked. |

## Removed From Public Home

| Component | Reason | Current Location |
|---|---|---|
| `PremiumLandingSections` | Codex-created Fractal continuation that does not appear in the screenshot set and created the unrelated cards shown by the user. | Dev/reference only |
| `BrandStatement` | Good brand block but not present in the supplied final Home screenshots. | Dev/reference only |
| `FeaturesSection` / `ProductsShowcase` / `PluginShowcase` | Kept out of `/` because `ProductGrid` is the screenshot-matching catalogue section. | `/about`, dev/reference |
| `FinalSignalCTA` | Codex-created duplicate of sticky/footer commercial CTA. | Dev/reference only |

## Verification Contract

`scripts/verify-public-home.mjs` fails if public `/` does not contain the approved FRACTAL DELAY entry, if `HeroSectionAdvanced` is used as the public first hero, if the screenshot sequence sections are missing, if there is horizontal overflow, if required section metadata is missing, or if internal links break.
