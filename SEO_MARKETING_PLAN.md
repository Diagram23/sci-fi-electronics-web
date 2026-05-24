# SCI-FI ELECTRONICS SEO & Keyword Plan

## Commercial keyword clusters

| Cluster | Primary keywords | Intent | Pages |
| --- | --- | --- | --- |
| Delay plugin | Fractal Delay, delay VST plugin, creative delay plugin, recursive delay, tempo synced delay, stereo delay plugin | High commercial / product discovery | `/`, `/plugins/fractal-delay` |
| Plugin formats | VST3 plugins, AU plugins, AAX plugins, audio plugins for macOS, audio plugins for Windows | Compatibility / purchase confidence | `/`, `/plugins`, `/faq` |
| Producer workflow | electronic music production tools, underground electronic music, sound design tools, music producer plugins | Brand and category discovery | `/`, `/plugins`, `/contact` |
| Bundle | audio plugin bundle, VST plugin bundle, sound design plugin collection, complete audio plugin collection | Bundle purchase intent | `/`, `/plugins` |
| Sample packs | sample packs, sound design samples, royalty free samples, 24-bit WAV samples, underground sample packs, halftime bass samples | Archive/sample pack discovery | `/archive` |
| Support/licensing | audio plugin support, plugin licensing, VST install help, plugin license agreement | Support and trust | `/contact`, `/faq`, `/legal/license` |

## Implemented SEO work

- Static home metadata in `index.html`.
- Runtime SEO by route through `src/app/hooks/useSEO.ts`.
- Central keyword and schema configuration in `src/app/config/seoConfig.ts`.
- Canonical URLs for primary public routes.
- Open Graph and Twitter card metadata.
- JSON-LD Organization and WebSite schema globally.
- JSON-LD SoftwareApplication schema for Fractal Delay.
- JSON-LD Product schema for the Complete Signal Collection.
- `public/robots.txt`.
- `public/sitemap.xml`.
- Route-specific titles and meta descriptions for:
  - `/`
  - `/plugins`
  - `/plugins/fractal-delay`
  - `/archive`
  - `/contact`
  - `/faq`
  - `/legal/*`

## SEO rules for future edits

- Do not keyword-stuff titles or body copy.
- Keep every title unique and tied to the actual page.
- Keep descriptions human-readable and commercial.
- Do not claim real checkout, instant delivery, reviews, sales numbers or audio demos until those systems are live.
- Add real screenshots or product imagery before launch for stronger Open Graph previews.
- Submit `https://scifielectronics.com/sitemap.xml` in Google Search Console after deployment.

## Production actions still needed

- Confirm the final production domain. Current canonical domain is `https://scifielectronics.com`.
- Add a real `public/og-image.png` before launch.
- Connect Search Console and Analytics.
- Add real product screenshots/audio demos when assets are final.
- Build content pages/articles later for long-tail SEO:
  - "Best delay plugins for underground electronic music"
  - "How recursive delay works in electronic music production"
  - "VST3 vs AU vs AAX plugin formats"
  - "Sound design sample packs for halftime and bass music"
