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

- **Routing**: multi-page SPA via `react-router-dom` v7, `BrowserRouter` set up in [src/App.jsx](src/App.jsx). A `pageRoutes` array (`/`, `/expertise`, `/competences`, `/reseau`, `/domotique`, `/maintenance`, `/cgs`, `/resume`) is rendered twice via `.map()` — once at its bare path (French) and once under `/en` (English) — both mapping to the _same_ page component (see i18n below). `ScrollToTop` renders outside `LanguageProvider`/`<Routes>`; `Navbar` and `Footer` render inside `LanguageProvider` but outside `<Routes>`, so they're present (and localized) on every page.
- **`src/pages/` vs `src/components/`**: `pages/` holds one file per route (thin wrappers that compose components + set SEO); `components/` holds the reusable section/layout pieces they render. Pages import from `../components/...`; components don't import each other. No barrel/index file.
- **Home page** ([src/pages/Home.jsx](src/pages/Home.jsx)) is intentionally lean: `Header` (hero) → `Themes` (teaser card grid linking out to the 5 theme pages) → `Quote`. It does not contain the full section content anymore — that lives on the dedicated theme pages, each a thin wrapper around one section component (e.g. `pages/Domotique.jsx` wraps `components/HomeAssistant.jsx`), following the same pattern as the pre-existing `pages/CGS.jsx`/`pages/Resume.jsx` (a `.page` div + a "← Retour à l'accueil" `Link` back to `/`).
- **Navbar** ([src/components/Navbar.jsx](src/components/Navbar.jsx)): sticky top nav, present on every route, with one emoji-tagged `NavLink` per theme page (hover triggers a CSS wiggle animation — see `.navbar-link-icon`/`@keyframes navbar-wiggle` in `App.scss`) and the `favicon.png` mark as the brand logo. The hero's CTA scrolls to the `#themes` teaser grid on the homepage rather than linking to a page.
- **i18n** ([src/i18n/](src/i18n/)): French (default, unprefixed) and English (`/en` prefix) via a hand-rolled context, no `react-i18next`. `App.jsx` renders every page component twice — once at its bare path, once at `/en${path}` — so the _same_ component instances handle both locales; there's no separate English page tree.
  - [translations.js](src/i18n/translations.js): a single `{ fr: {...}, en: {...} }` object, namespaced per page/component (`header`, `themes`, `expertise`, `domotique`, `seo`, ...). Multi-item sections (e.g. `expertise.items`, `domotique.items`) are keyed objects (`{ craftsmanship: {...}, ... }`), not arrays — components zip them with a local, language-independent `itemIcons` map (icons/order live in the component, copy lives in the dictionary).
  - [LanguageContext.jsx](src/i18n/LanguageContext.jsx): exports only the `LanguageProvider` component (mounted once in `App.jsx`, inside `BrowserRouter`). It derives `lang` from the current URL via `useLocation()` — there's no language state to sync, the URL is the single source of truth.
  - [useLanguage.js](src/i18n/useLanguage.js) / [localePaths.js](src/i18n/localePaths.js): the context object + `useLanguage()` hook, and the pure path helpers (`getLangFromPath`, `stripLangPrefix`, `withLangPrefix`), split into separate non-component files from `LanguageContext.jsx` specifically to satisfy `react-refresh/only-export-components` (a file mixing component + non-component exports breaks Vite Fast Refresh). Deliberately **not** named `languageContext.js`/`languageUtils.js` — Windows/macOS are case-insensitive but the Linux-based Docker build (`node:20-alpine`) is case-sensitive, so a name differing only by case from `LanguageContext.jsx` would build locally and break in CI.
  - Every component consumes strings via `const { t } = useLanguage()` then `t('namespace.key')` (dot-path lookup, warns to console and falls back to the key itself if missing). Internal links must go through `localizePath(path)` (or `withLangPrefix(path, lang)`) rather than being hardcoded, so navigating while on `/en/...` stays on `/en/...`.
  - `Skills.jsx`'s tech names/logos/URLs and `Experience.jsx`'s company/location/project/tech-stack values are treated as language-neutral proper nouns and kept local to the component (not duplicated in both dictionaries) — only category titles and prose (role, description, achievements) are translated.
  - The `/cgs` legal PDF itself is not translated (still French-only); the English page shows a `cgs.note` disclaimer above it instead.
- **SEO** ([src/components/Seo.jsx](src/components/Seo.jsx)): dependency-free component (no `react-helmet`) that `useEffect`s `document.title` + upserts `meta[description]`/canonical/OG/Twitter/hreflang tags per route, reading `title`/`description` from `seo.<seoKey>` in `translations.js` and `lang`/`path` from `useLanguage()`. Every page renders `<Seo seoKey="..." />` as its first child (`seoKey` matches its `pages/` name, e.g. `domotique`, `resume`). Emits `<link rel="alternate" hreflang="fr|en|x-default">` for both locales of the current page. Note: since there's no SSR/prerendering, this only helps crawlers that execute JS (Google) — social-media link-preview bots will always see the static French tags baked into `index.html` regardless of which page/language was shared. `public/robots.txt` and `public/sitemap.xml` list the 5 theme routes in both languages with `xhtml:link` hreflang annotations (legal/résumé pages intentionally excluded from the sitemap).
- **Styling**: Sass, not CSS modules/Tailwind/styled-components. `src/index.scss` defines the (dark-only) theme as CSS custom properties on `:root` (`--bg-primary`, `--text-primary`, `--accent-primary`, etc.) and global resets. `src/App.scss` holds all component/layout classes — reuse existing classes (`.section`, `.section-header`, `.eyebrow`, `.grid`, `.card`, `.card-icon`, `.card-link`, `.detail-list`, `.highlight-tags`/`.highlight-tag`, `.muted`, `.navbar*`) rather than inventing new ones, since section components already follow a consistent card/grid pattern (see `NetworkSkills.jsx`, `ComputerMaintenance.jsx`, `HomeAssistant.jsx`).
- **Icons**: `react-icons` is the icon library (e.g. `react-icons/fa` in `Footer.jsx`, `react-icons/si` for brand/tech icons like `SiHomeassistant`). Some sections instead use plain emoji as icons (`NetworkSkills.jsx`, `ComputerMaintenance.jsx`, `Themes.jsx`, `Navbar.jsx`) — either is an established pattern. `Skills.jsx` pulls technology logos from the `devicons` CDN via `<img src>` rather than a package.
- **Content language**: French (default) and English, see i18n above. New copy should match the existing tone in both dictionaries (e.g. "Compétences réseau" / "Network skills", "Infrastructure & Réseau" eyebrow style) — never hardcode new user-facing strings directly in a component.
- **ESLint**: flat config (`eslint.config.js`) extends `@eslint/js` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite preset). Custom rule: unused vars are only allowed if they start with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`). `react-refresh/only-export-components` is enforced — keep non-component exports (hooks, constants, utils) out of files that also export a component.

## Claude Code skills

- [.claude/skills/resume-cv/](.claude/skills/resume-cv/SKILL.md): generates a French résumé/CV as a `.docx` from the site's own live content (profile, experience, languages, skills — read fresh from `Footer.jsx`, `Experience.jsx`, `Languages.jsx`, `Skills.jsx` and `translations.js`), meant to be uploaded to Google Drive and opened as a Google Doc. It exists because `public/resume.pdf` is itself exported by hand from a private Google Doc that isn't reachable from here — this skill goes the other direction, building a doc _from_ the site to seed or refresh that source.
