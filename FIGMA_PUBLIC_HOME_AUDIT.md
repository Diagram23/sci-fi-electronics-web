# Figma Public Home Audit

## PUBLIC HOME ENTRY LOCK / BLOQUEO DE ENTRADA PUBLICA

The approved public `/` entry is the FRACTAL DELAY hero shown in the user-approved screenshot: PromoBar, full Navbar, plugin mockup, `Request Fractal Delay - $129` / `Complete Collection - $349`, and the Fractal Delay product copy.

La entrada aprobada de `/` es el hero de FRACTAL DELAY de la captura del usuario. No cambiar por `HeroSectionAdvanced` ni por la entrada generica SCI-FI ELECTRONICS / FUTURE SOUND TOOLS sin autorizacion explicita.

## Current Public Home Sequence

The screenshots flagged `FeaturesSection`, `ProductsShowcase`, `PluginShowcase`, and `ComingSoon` as not belonging to the approved page because they introduce generic brand cards, CHROMA, and ctrl4filter. Those sections are removed from public `/` and remain only in `/about` or dev/reference routes.

| Order | data-home-section | Component | Path | Origin | Public Decision | Reason | CTA/Link Status |
|---:|---|---|---|---|---|---|---|
| 1 | `hero` | `ProductHeroFigmaHybrid` | `src/app/components/ProductHeroFigmaHybrid.tsx` | codex-enhancement | keep | User-approved FRACTAL DELAY entry with PromoBar/full Navbar context, plugin mockup, specs, and collection CTA. | CTAs route to `/contact`; no fake checkout. |
| 2 | `fractal-signal-system` | `PremiumLandingSections` | `src/app/components/PremiumLandingSections.tsx` | codex-enhancement | keep | Fractal Delay philosophy, signal features, and bundle CTA. Replaces CHROMA/ctrl4filter content with product-relevant sections. | Contact/bundle CTA only. |
| 3 | `trust-marquee` | `TrustMarquee` | `src/app/components/TrustMarquee.tsx` | figma-local | keep | Compact compatibility/spec confidence strip. | No checkout. |
| 4 | `compatibility` | `DawCompatibilityStrip` | `src/app/components/DawCompatibilityStrip.tsx` | figma-local | keep | DAW compatibility proof for plugin context. | No checkout. |
| 5 | `archive-teaser` | `ArchiveTeaser` | `src/app/components/ArchiveTeaser.tsx` | figma-local | keep | Links to archive/editorial route without CHROMA/ctrl4filter product cards. | Internal `/archive` link. |
| 6 | `brand-statement` | `BrandStatement` | `src/app/components/BrandStatement.tsx` | figma-local | keep | Editorial brand statement that does not introduce CHROMA/ctrl4filter catalogue cards. | No checkout. |
| 7 | `footer` | `Footer` | `src/app/components/Footer.tsx` | codex-required | keep | Required global footer; no complete local Figma footer equivalent found. | Legal/contact links checked. |

## Removed From Public Home

| Component | Reason | Current Location |
|---|---|---|
| `FeaturesSection` | Generic brand cards shown in user screenshots; not part of approved Fractal Delay page flow. | `/about`, dev/reference |
| `ProductsShowcase` | Introduces CHROMA sample-pack content flagged by user. | `/about`, dev/reference |
| `PluginShowcase` | Introduces ctrl4filter content flagged by user. | `/about`, dev/reference |
| `ComingSoon` | Tied to ctrl4filter roadmap; not part of approved Fractal Delay Home. | `/about`, dev/reference |
| `TestimonialsSection` | Contains CHROMA/CTRLFILTER testimonial content; removed from `/`. | dev/reference |
| `BundleManifesto` | Duplicated by the Fractal-focused bundle CTA inside `PremiumLandingSections`. | `/plugins`, dev/reference |

## Verification Contract

`scripts/verify-public-home.mjs` fails if public `/` does not contain the approved FRACTAL DELAY entry, if `HeroSectionAdvanced` is used as the public first hero, if `CHROMA` or `ctrl4filter` appear in Home text, if there is horizontal overflow, if required section metadata is missing, or if internal links break.
