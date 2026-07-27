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

- **Routing**: `react-router-dom` v7, `BrowserRouter` set up in [src/App.jsx](src/App.jsx) with three routes: `/` (Home), `/cgs` (T&Cs), `/resume`. `Footer` and `ScrollToTop` render outside `<Routes>` on every page.
- **No `components/` subfolder** — every page/section is a flat top-level `.jsx` file directly under `src/` (e.g. `Header.jsx`, `Skills.jsx`, `Footer.jsx`). There is no barrel/index file.
- **Home page composition** ([src/Home.jsx](src/Home.jsx)): the homepage is a straight sequence of independent section components — `Header`, `Improvements`, `Quote`, `Skills`, `NetworkSkills`, `HomeAssistant`, `ComputerMaintenance` — each self-contained with its own inline data array and no shared state.
- **No navbar**: the only in-page anchor link is the hero CTA (`Header.jsx`) linking to `#services` on `Improvements.jsx`. Adding a new homepage section does not require touching navigation.
- **Styling**: Sass, not CSS modules/Tailwind/styled-components. `src/index.scss` defines the (dark-only) theme as CSS custom properties on `:root` (`--bg-primary`, `--text-primary`, `--accent-primary`, etc.) and global resets. `src/App.scss` (~565 lines) holds all component/layout classes — reuse existing classes (`.section`, `.section-header`, `.eyebrow`, `.grid`, `.card`, `.card-icon`, `.detail-list`, `.highlight-tags`/`.highlight-tag`, `.muted`) rather than inventing new ones, since section components already follow a consistent card/grid pattern (see `NetworkSkills.jsx`, `ComputerMaintenance.jsx`, `HomeAssistant.jsx`).
- **Icons**: `react-icons` is the icon library (e.g. `react-icons/fa` in `Footer.jsx`, `react-icons/si` for brand/tech icons). Some sections instead use plain emoji as icons (`NetworkSkills.jsx`, `ComputerMaintenance.jsx`) — either is an established pattern. `Skills.jsx` pulls technology logos from the `devicons` CDN via `<img src>` rather than a package.
- **Content language**: all copy is French, hardcoded inline in JSX — there is no i18n framework and no locale/message files. New content should match the existing tone (e.g. "Compétences réseau", "Infrastructure & Réseau" eyebrow style).
- **ESLint**: flat config (`eslint.config.js`) extends `@eslint/js` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite preset). Custom rule: unused vars are only allowed if they start with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
