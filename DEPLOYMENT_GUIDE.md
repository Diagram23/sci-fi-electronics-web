# SCI-FI ELECTRONICS - Vercel deployment

This project is a React/Vite static site.

## Recommended Vercel settings

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node version: Vercel default is acceptable for this project.

The `vercel.json` file already includes SPA rewrites so these routes work on refresh:

- `/`
- `/plugins`
- `/plugins/fractal-delay`
- `/archive`
- `/contact`
- `/faq`
- `/success`
- `/legal/cookies`
- `/legal/privacy`
- `/legal/terms`
- `/legal/license`

## Deploy through GitHub

1. Push this project to a GitHub repository.
2. Open Vercel and choose `Add New Project`.
3. Import the GitHub repository.
4. Confirm the settings above.
5. Deploy.

## Deploy with Vercel CLI

From the project root:

```bash
npm install
npm run build
npm install -g vercel
vercel login
vercel
vercel --prod
```

Use the preview URL from `vercel` for review, then `vercel --prod` for the public production URL.

## Current limitations

- Checkout is not connected.
- Auth is not connected.
- Sanity CMS is present in the project but is not required for the static site build.
- Audio demos are visual/placeholder unless real audio files are added.

Do not present those flows as live production features until they are connected.
