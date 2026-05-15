# Assets Status

Scope: local repo/export. No online Figma asset inventory was available.

## Summary

- Local raster assets found through source references: 1 Figma asset.
- `public/` directory: not present in this repo.
- Audio files found locally: 0.
- Archive images: remote Unsplash URLs embedded in local components.
- Plugin mockups/waveforms: code-generated placeholders, not final production renders/audio.

## Asset Registry

| Asset | Path | Used By | Origin | Used Public | Status | Action |
|---|---|---|---|---:|---|---|
| SCI-FI ELECTRONICS emblem | `figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png` / `src/assets/6a48319d71f3339b74104ffc5d20862e540ee731.png` | `BrandIntro`, `Footer`, `DevFigmaReferencePage`, `ComponentGalleryPage`, `FigmaOriginalReconstructionPage` | figma-local | yes | used-public | Keep. Used as brand emblem; do not enable blocking splash by default. |
| Archive teaser image | remote URL in `src/app/components/ArchiveTeaser.tsx` | `ArchiveTeaser` | remote / local export reference | yes | remote | Keep temporarily; replace with owned SCI-FI archive artwork before production. |
| Archive page volume images | remote URLs in `src/app/pages/ArchivePage.tsx` | `ArchivePage` | remote / local export reference | yes | remote | Keep temporarily; replace with owned SCI-FI archive artwork. |
| Plugin window visual | code-generated in `src/app/components/PluginWindowMockup.tsx` | `ProductHeroFigmaHybrid`, `ProductHeroPremium`, plugin/product pages, dev gallery | placeholder / code visual | not on Home after purge; public elsewhere | placeholder | Keep as visual placeholder until final plugin UI renders exist. |
| Product visual | code-generated in `src/app/components/PluginVisual.tsx` | plugin/product pages and gallery | placeholder / code visual | yes, outside Home | placeholder | Keep until owned renders/screenshots replace it. |
| Audio waveform visuals | code-generated in `src/app/components/AudioDemoSection.tsx` | `/plugins`, product detail routes | placeholder | yes, outside Home | placeholder | Keep honest copy; do not imply real audio playback/download until files exist. |
| Oscilloscope visual | `src/app/components/visuals/OscilloscopeCanvas.tsx` | dev gallery/support references | unknown/support | no | used-dev-only | Keep for reference; do not count as Figma public section. |
| Logo pack | not found | n/a | missing | no | missing | Add final favicon, OG image, monochrome/bronze/jade marks. |
| Audio demo files | not found | n/a | missing | no | missing | Add real WAV/MP3/audio waveform data before claiming audio demos. |
| Final plugin renders | not found as raster assets | n/a | missing | no | missing | Export owned plugin screenshots/renders from final UI. |

