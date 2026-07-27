# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is `monti-it.io` — a French-language personal/freelance IT services portfolio site (React 19 + Vite 7, client-side SPA, no SSR).

## Commands

```bash
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint (flat config, eslint.config.js)
```

There is no test suite/runner configured in this repo.

CI (`azure-pipeline.yaml`) runs on Node 20.x: `npm ci`, `npm run lint`, `npm run build`, then publishes `dist/` and optionally builds/pushes a Docker image (multi-stage `Dockerfile`, served in prod via nginx).

## Architecture

- **Routing**: multi-page SPA via `react-router-dom` v7, `BrowserRouter` set up in [src/App.jsx](src/App.jsx). Routes: `/` (Home landing), `/expertise`, `/competences`, `/reseau`, `/domotique`, `/maintenance` (one per service theme), plus `/cgs` (T&Cs) and `/resume`. `Navbar`, `Footer`, and `ScrollToTop` render outside `<Routes>` on every page.
- **`src/pages/` vs `src/components/`**: `pages/` holds one file per route (thin wrappers that compose components + set SEO); `components/` holds the reusable section/layout pieces they render. Pages import from `../components/...`; components don't import each other. No barrel/index file.
- **Home page** ([src/pages/Home.jsx](src/pages/Home.jsx)) is intentionally lean: `Header` (hero) → `Themes` (teaser card grid linking out to the 5 theme pages) → `Quote`. It does not contain the full section content anymore — that lives on the dedicated theme pages, each a thin wrapper around one section component (e.g. `pages/Domotique.jsx` wraps `components/HomeAssistant.jsx`), following the same pattern as the pre-existing `pages/CGS.jsx`/`pages/Resume.jsx` (a `.page` div + a "← Retour à l'accueil" `Link` back to `/`).
- **Navbar** ([src/components/Navbar.jsx](src/components/Navbar.jsx)): sticky top nav, present on every route, with one emoji-tagged `NavLink` per theme page (hover triggers a CSS wiggle animation — see `.navbar-link-icon`/`@keyframes navbar-wiggle` in `App.scss`) and the `favicon.png` mark as the brand logo. The hero's CTA scrolls to the `#themes` teaser grid on the homepage rather than linking to a page.
- **SEO** ([src/components/Seo.jsx](src/components/Seo.jsx)): dependency-free component (no `react-helmet`) that `useEffect`s `document.title` + upserts `meta[description]`/canonical/OG/Twitter tags per route. Every page renders `<Seo title=... description=... path=... />` as its first child. Note: since there's no SSR/prerendering, this only helps crawlers that execute JS (Google) — social-media link-preview bots will always see the static tags baked into `index.html` regardless of which page was shared. `public/robots.txt` and `public/sitemap.xml` list the 5 theme routes (legal/résumé pages intentionally excluded from the sitemap).
- **Styling**: Sass, not CSS modules/Tailwind/styled-components. `src/index.scss` defines the (dark-only) theme as CSS custom properties on `:root` (`--bg-primary`, `--text-primary`, `--accent-primary`, etc.) and global resets. `src/App.scss` holds all component/layout classes — reuse existing classes (`.section`, `.section-header`, `.eyebrow`, `.grid`, `.card`, `.card-icon`, `.card-link`, `.detail-list`, `.highlight-tags`/`.highlight-tag`, `.muted`, `.navbar*`) rather than inventing new ones, since section components already follow a consistent card/grid pattern (see `NetworkSkills.jsx`, `ComputerMaintenance.jsx`, `HomeAssistant.jsx`).
- **Icons**: `react-icons` is the icon library (e.g. `react-icons/fa` in `Footer.jsx`, `react-icons/si` for brand/tech icons like `SiHomeassistant`). Some sections instead use plain emoji as icons (`NetworkSkills.jsx`, `ComputerMaintenance.jsx`, `Themes.jsx`, `Navbar.jsx`) — either is an established pattern. `Skills.jsx` pulls technology logos from the `devicons` CDN via `<img src>` rather than a package.
- **Content language**: all copy is French, hardcoded inline in JSX — there is no i18n framework and no locale/message files. New content should match the existing tone (e.g. "Compétences réseau", "Infrastructure & Réseau" eyebrow style).
- **ESLint**: flat config (`eslint.config.js`) extends `@eslint/js` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite preset). Custom rule: unused vars are only allowed if they start with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
