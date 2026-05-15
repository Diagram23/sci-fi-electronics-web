# Figma Public Home Audit

## PUBLIC HOME ENTRY LOCK / BLOQUEO DE ENTRADA PUBLICA

The approved public `/` entry is the FRACTAL DELAY hero shown in the user-approved screenshot: PromoBar, full Navbar, plugin mockup, `Request Fractal Delay - $129` / `Complete Collection - $349`, and the Fractal Delay product copy.

La entrada aprobada de `/` es el hero de FRACTAL DELAY de la captura del usuario. No cambiar por `HeroSectionAdvanced` ni por la entrada generica SCI-FI ELECTRONICS / FUTURE SOUND TOOLS sin autorizacion explicita.

Scope: public route `/` after the Figma purge pass. This audit is based on the local repo/export only. A newer Figma online file cannot be verified without a new export or file access.

## Current Public Home Sequence

The previous correction incorrectly replaced the approved FRACTAL DELAY entry with the generic `HeroSectionAdvanced` / SCI-FI ELECTRONICS brand entry. The current `/` entry restores the user-approved FRACTAL DELAY first screen with PromoBar, full Navbar, plugin mockup, Fractal Delay copy, and collection CTA.

The entry source is protected in `src/app/config/siteConfig.ts` with `HOME_ENTRY_SOURCE = "user-approved-fractal-delay-entry"` and `HOME_HERO_COMPONENT = "ProductHeroFigmaHybrid"`. `HomePage.tsx` uses those constants on the public hero wrapper.

| Order | data-home-section | Component | Path | Origin | Origin Evidence | Public Decision | Reason | Duplicates With | Should Stay / Move / Remove / Dev-only | Responsive Notes | CTA/Link Status |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `hero` | `ProductHeroFigmaHybrid` | `src/app/components/ProductHeroFigmaHybrid.tsx` | codex-enhancement | Matches approved user screenshot: FRACTAL DELAY, Time Manipulation Engine, specs, plugin mockup, Fractal Delay / Complete Collection CTAs. Locked by `src/app/config/homeSourceOfTruth.ts`. | keep | Approved public first viewport. Do not replace with `HeroSectionAdvanced` without explicit user instruction. | `ProductHeroPremium`, `HeroSectionAdvanced`, `HeroSection` | stay | Uses normal document flow; no fixed/inset hero wrapper. | CTAs route to `/contact`; copy keeps checkout as pending/contact fallback. |
| 2 | `figma-features` | `FeaturesSection` | `src/app/components/FeaturesSection.tsx` | figma-local | Local section file used in Figma reconstruction route and component gallery; broad brand/tool statement. | keep | Belongs to Figma-local brand/product intro. | `HowItWorksSection` | stay; keep `HowItWorksSection` out of Home | Simple responsive grid. | No fake purchase/download CTA. |
| 3 | `figma-products-showcase` | `ProductsShowcase` | `src/app/components/ProductsShowcase.tsx` | figma-local | Local Figma/product-direction section; imports `CHROMA` data from `src/app/data/productsData.ts`. | keep | Primary sound-pack showcase from local Figma direction. | `ProductGrid` | stay; `ProductGrid` stays on `/plugins` | Responsive 1-column to 2-column card. | `Listen`/`Request Access`; no checkout promise. |
| 4 | `figma-plugin-showcase` | `PluginShowcase` | `src/app/components/PluginShowcase.tsx` | figma-local | Local section file; imports `CTRL4FILTER` data from `src/app/data/productsData.ts`. | keep | Local plugin/roadmap direction. | `ProductGrid` | stay; catalogue grid remains `/plugins` | Responsive 1-column to 2-column card. | `Join Waitlist`/`Contact`; honest contact/waitlist flow. |
| 5 | `figma-coming-soon` | `ComingSoon` | `src/app/components/ComingSoon.tsx` | figma-local | Local roadmap component using `CTRL4FILTER.roadmap` from `src/app/data/productsData.ts`. | keep | Roadmap block appears in local reconstruction flow. | `FinalSignalCTA`, partly `BundleManifesto` | stay; `FinalSignalCTA` removed from Home | Simple responsive list. | `Join Waitlist`/`Contact`; no fake release. |
| 6 | `trust-marquee` | `TrustMarquee` | `src/app/components/TrustMarquee.tsx` | figma-local | Known local visual section in coverage script; present in reconstruction route after local product sections. | keep | Compact trust/spec strip. | none | stay | Motion should remain lightweight; desktop/mobile safe in current smoke. | No CTA. |
| 7 | `compatibility` | `DawCompatibilityStrip` | `src/app/components/DawCompatibilityStrip.tsx` | figma-local | Known local visual section in coverage script; DAW compatibility proof. | keep | Support/trust section; not a duplicate product catalogue. | none | stay | Wrapped strip; no horizontal overflow in script. | No fake CTA. |
| 8 | `archive-teaser` | `ArchiveTeaser` | `src/app/components/ArchiveTeaser.tsx` | figma-local | Uses `ImageWithFallback` Figma helper and external archive artwork; present in reconstruction route. | keep | Links Home to Archive product/editorial system. | `ArchivePage` route | stay | Responsive visual/card section; no global overflow. | Internal `/archive` link checked. |
| 9 | `brand-statement` | `BrandStatement` | `src/app/components/BrandStatement.tsx` | figma-local | Known local visual section in coverage script; present in reconstruction route. | keep | Editorial brand closer before commercial/social proof. | `FeaturesSection` partially, but different role | stay | Uses normal section flow. | No fake CTA. |
| 10 | `bundle` | `BundleManifesto` | `src/app/components/BundleManifesto.tsx` | figma-local | Known local visual section; public catalogue also uses it; contact fallback copy avoids checkout. | keep | One commercial bundle block is acceptable; replaces removed `FinalSignalCTA`/sticky duplication. | `FinalSignalCTA`, `StickyBundleCTA`, `ComingSoon` weakly | stay; final/sticky removed from Home | Section contributes height but no overflow. | Uses contact/request flow, not checkout. |
| 11 | `testimonials` | `TestimonialsSection` | `src/app/components/TestimonialsSection.tsx` | figma-local | Known local visual/social proof component. | keep | Local visual component; social proof block remains in final Home sequence. | none | stay | Verified in full-page capture. | No direct purchase CTA. |
| 12 | `footer` | `Footer` | `src/app/components/Footer.tsx` | codex-required | No complete local Figma footer component found; this footer uses real local Figma emblem via `figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png`. | keep | Required site shell/footer for routes/legal/contact; not counted as Figma original. | possible future Figma footer | keep until new export provides original footer | Responsive columns; smoke route passes. | Links checked by `verify-public-home.mjs`; no checkout promise. |

## Explicit Duplicate Decisions

| Pair | Decision |
|---|---|
| `ProductGrid` vs `ProductsShowcase` | Do not mount together on Home. `ProductsShowcase` stays on Home; `ProductGrid` stays on `/plugins`. |
| `ProductGrid` vs `PluginShowcase` | Do not mount together on Home. `PluginShowcase` stays on Home; `ProductGrid` stays on `/plugins`. |
| `ProductsShowcase` vs `PluginShowcase` | Both stay. They represent different local Figma product directions: CHROMA sound pack and ctrl4filter plugin roadmap. |
| `FeaturesSection` vs `HowItWorksSection` | `FeaturesSection` stays. `HowItWorksSection` removed from Home because it is acquisition-flow/commercial, not source sequence. |
| `ComingSoon` vs `BundleManifesto` | Both stay with different roles: roadmap vs bundle/collection. |
| `ComingSoon` vs `FinalSignalCTA` | `FinalSignalCTA` removed. |
| `FinalSignalCTA` vs `StickyBundleCTA` | Both removed from Home. |
| `HeroSectionAdvanced` vs `ProductHeroFigmaHybrid` | `ProductHeroFigmaHybrid` restored as approved public entry. `HeroSectionAdvanced` dev/reference only. |
| `NavbarAdvanced` vs `Navbar` + `PromoBar` | `NavbarAdvanced` kept as codex-required shell; original `Navbar` not restored due visual/fake-buy mismatch. |
| `Footer` vs possible Figma footer | No full Figma footer found locally; `Footer` remains codex-required. |

## Home Shell Decision

| Shell item | Current Home behavior | Reason |
|---|---|---|
| `PromoBar` | visible on `/` | Required by approved FRACTAL DELAY screenshot. It routes to `#bundle` and does not start checkout. |
| `NavbarAdvanced` | rendered full on `/` | Required by approved screenshot: INICIO / PLUGINS / ARCHIVO, centered SFE, language selector, disabled login, disabled cart. |
| `ProductHeroPremium` | not mounted on `/` | Codex campaign replacement, not source-of-truth entry. |
| `ProductHeroFigmaHybrid` | mounted on `/` | User-approved FRACTAL DELAY entry. |

## Verification Contract

The public Home must expose these attributes on every Home section wrapper:

- `data-home-section`
- `data-component`
- `data-origin`
- `data-public-decision`

`scripts/verify-public-home.mjs` fails if Home contains duplicate section pairs, unknown origins, non-`keep` decisions, disallowed Codex-created sections, horizontal overflow, broken internal links, or CTAs implying real checkout/download.
