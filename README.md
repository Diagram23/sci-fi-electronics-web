# SCI-FI ELECTRONICS — V1

Official React + Vite + TypeScript frontend for SCI-FI ELECTRONICS.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run sanity` (optional CMS studio)

## Data Strategy (V1)

- Frontend uses local typed product data in `src/app/data/productsData.ts`.
- Current V1 products:
  - `CHROMA` (sample pack, available)
  - `ctrl4filter` (plugin, in development)
- Sanity integration is prepared but optional (`src/lib/sanity.ts`, `sanity.config.ts`).

## Notes

- Custom cursor auto-disables on mobile/coarse pointers.
- Ambient visual effects are intentionally subtle and reduced-motion aware.
