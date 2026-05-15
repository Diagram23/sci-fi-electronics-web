# buildout.css Audit

Scope: `src/styles/buildout.css` after strict purge. This file must remain a technical compatibility layer only.

## Current Rule Audit

| Selector / group | Purpose | Classification | Decision | Reason |
|---|---|---|---|---|
| `[data-buildout-section]` | `position: relative; isolation: isolate;` | technical fix | keep | Prevents stacking leaks inside legacy route sections without changing visual style. |
| `[data-buildout-section] > *` | Child `z-index` safety | technical fix | keep | Keeps local backgrounds behind content. No layout redesign. |
| `[data-buildout-section] h2, h3` | `text-wrap: balance` | responsive fix | keep | Typographic safety only; no size/color override. |
| `[data-buildout-section="audio-demo"] canvas` | Canvas width/height 100% | technical fix | keep | Prevents canvas sizing bugs in `AudioDemoSection`. |
| `[data-buildout-section="plugin-comparison"] [style*="overflow-x: auto"]` | Scrollbar color | responsive fix | keep | Table remains horizontally scrollable; does not hide overflow globally. |
| `::-webkit-scrollbar` under comparison table | Scrollbar size/thumb styling | responsive fix | keep | Limited to comparison table scroll container. |
| `.buildout-final-cta` | `position: relative; overflow: hidden;` | legacy support | keep temporarily | `FinalSignalCTA` is removed from Home but still exists as a component/reference. No decorative background remains. |
| mobile `[data-buildout-section] button, a` | touch target min-height | accessibility/responsive fix | keep | Mobile usability; does not alter visual identity significantly. |

## Removed In Purge

| Removed group | Classification | Why removed |
|---|---|---|
| Global borders on all `data-buildout-section` | Codex visual invention | Imposed a non-Figma section system. |
| Global `::before` grids/glows | Codex visual invention | Made Home look like a Codex overlay rather than local Figma components. |
| ProductGrid `h2` `!important` scale | harmful global override | Forced typography outside component source. |
| Forced BrandStatement/Testimonial backgrounds | duplicate styling | Overrode component-level design. |
| Final CTA decorative background/grid | Codex visual invention | Removed from source-of-truth Home. |

## Safety Checks

- `!important`: none present.
- `height: 100vh`: none present.
- `position: fixed`: none present.
- global `overflow-x: hidden`: none present here.
- global glow/grid overlays: removed.

