---
name: resume
description: Update the résumé/CV from a conversational request (e.g. "I got a new certification, add it", "tighten the Clauger description", "bump my years of experience"). Edits src/data/resume.json (both languages where relevant), updates any site component/translation that mirrors the same fact, and regenerates public/resume.pdf. Leaves everything unstaged for review — never commits. Use when asked to "update/add to my résumé", "add a certification/role/skill to my CV", "regenerate the resume PDF", or "sync a résumé change to the site".
---

# Résumé (CV) update

`src/data/resume.json` is the source of truth for the generated PDF
(`npm run resume:pdf` → [scripts/generate-resume-pdf.js](../../../scripts/generate-resume-pdf.js) → `public/resume.pdf`,
via [scripts/resume-pdf/document.js](../../../scripts/resume-pdf/document.js) and `@react-pdf/renderer`).

**The site does not read `resume.json`.** [src/pages/Resume.jsx](../../../src/pages/Resume.jsx) embeds
the generated PDF directly, but the surrounding site content (the live "Experience" timeline, "Languages"
cards, "Skills" grid, footer contact links, hero tagline) is separately hard-coded in components and
`translations.js`, following the i18n conventions in [CLAUDE.md](../../../CLAUDE.md). These two stores
overlap in subject matter but are **not** kept in sync automatically — this skill's job is to make the
requested edit in `resume.json` and then decide, fact by fact, whether the same information also lives on
the site and needs the same edit there.

## 1. Pin down exactly what changed

Read the request as a diff on real-world facts (new cert, new role, tightened wording, corrected date,
new skill), not as an instruction to touch a specific file. One conversational request can span zero, one,
or several of the areas below.

## 2. Edit `src/data/resume.json`

Structure (see the file for full examples):

- `name`, `title`, `contact` — language-neutral, top-level.
- `profile.fr` / `profile.en` — the CV summary paragraph, translate both.
- `experience[]` — objects keyed by `key`, with language-neutral `company`/`location`/`environment`
  and per-language `fr`/`en` blocks (`period`, `sector`, `description`, `results`). Only the 3 most
  relevant roles are curated here for the one-page PDF.
- `languages[]` — keyed by `key`, per-language `name`/`level`.
- `skills.categories.<key>` — language-neutral `items` array, per-language `title`.
- `additional.*` (`softSkills`, `education`, `careerHistory`) — **French only, PDF-only**, per the
  file's own `additional.note`. Nothing here has a site counterpart — never touch site files for these.

Keep the language-neutral/per-language split exactly as-is (this was deliberately deduped in #43 — don't
reintroduce duplicated proper nouns into both `fr` and `en`).

## 3. Check whether the site mirrors the same fact — and if so, update it too

The site's résumé-adjacent content is **independently curated**, not a superset or subset of
`resume.json` — do not assume every entry has a counterpart. Check each area the edit touches:

| `resume.json` area             | Site counterpart                                                                                                                                                                                                   | Notes                                                                                                                                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `contact.email` / social links | [src/components/Footer.jsx](../../../src/components/Footer.jsx)                                                                                                                                                    | mailto link + `FaGithub`/LinkedIn hrefs                                                                                                                                                                                                                                                    |
| `profile.fr`/`en`              | `translations.js` → `header.lead`                                                                                                                                                                                  | **not a direct mirror** — the hero lead is site-voice marketing copy, not the CV summary; only touch it if the request is clearly about both                                                                                                                                               |
| `experience[]` entry           | [src/components/Experience.jsx](../../../src/components/Experience.jsx)'s `experienceMeta` (company/location/project/tech) + `translations.js` → `experience.items.<key>` (period/sector/description/achievements) | site has 5 curated roles, `resume.json` has 3 — match by company name, not by array position; a role may exist in only one place                                                                                                                                                           |
| `languages[]` entry            | [src/components/Languages.jsx](../../../src/components/Languages.jsx)'s `languageMeta` + `translations.js` → `languages.items.<key>`                                                                               | 1:1 by `key` (`french`, `english`)                                                                                                                                                                                                                                                         |
| `skills.categories.<key>`      | [src/components/Skills.jsx](../../../src/components/Skills.jsx)'s `skillCategories` + `translations.js` → `competences.categories.<key>`                                                                           | category keys overlap (`backend`, `frontend`, `database`, `devops`, `architecture`) but the site has more categories (`tools`, `securite`) and longer item lists than the trimmed PDF version — adding a skill on one side doesn't imply adding it on the other unless the request says so |
| `additional.*`                 | none                                                                                                                                                                                                               | PDF-only, skip                                                                                                                                                                                                                                                                             |

When editing translations, update **both** `fr` and `en` entries in `translations.js` and follow the
existing conventions: proper nouns (company, tech, project names) stay local to the component, translated
prose (descriptions, achievements, titles) goes in `translations.js`.

## 4. Regenerate the PDF

```bash
npm run resume:pdf
```

Regenerates `public/resume.pdf` from the updated `resume.json`. If the edit added a non-trivial amount of
text (a new role, a long achievement), spot-check the result stays one page and nothing overflows:

```bash
pdftoppm -jpeg -r 100 public/resume.pdf /tmp/resume-check
```

Read the resulting `/tmp/resume-check-*.jpg` with the Read tool. Skip this check for small wording tweaks.

## 5. Lint touched site files

```bash
npm run lint
```

Only needed if `.jsx`/`.js` files were touched (lint also runs Prettier's `format:check`, which covers
`resume.json` and `translations.js` too).

## 6. Hand off

Leave every change in the working tree, unstaged, for the user to review and commit themselves — **never
`git add`, commit, or push**. Summarize in your final message which files changed and why, calling out
explicitly any area from the table above you deliberately left untouched (e.g. "site Experience section
has no Addactis entry, so I only updated resume.json").
