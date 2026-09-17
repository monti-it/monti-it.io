---
name: resume-cv
description: Generate a French résumé/CV as a .docx from this site's own content (profile, experience, languages, skills), meant to be uploaded to Google Drive and opened as a Google Doc. Use when asked to "generate the resume/CV doc", "export the résumé to docx", "build/update the CV first page", or "sync the resume content to a doc".
---

# Résumé (CV) docx generator

This repo's public résumé PDF ([public/resume.pdf](../../../public/resume.pdf)) is exported by hand from a private Google Doc and embedded in [src/pages/Resume.jsx](../../../src/pages/Resume.jsx). That Google Doc isn't reachable from here, so this skill goes the other direction: it builds a Word document **from the site's own structured content**, for the user to upload to Drive and use as (or merge into) that source doc.

This intentionally only covers what the site already tracks (no education, certifications, or roles before the oldest entry in `Experience.jsx`). Say so in your final message so the user knows to fill gaps manually in Drive.

## 1. Read the live content (don't reuse a stale copy — that's the whole point)

- **Name / tagline / contact**: [src/components/Footer.jsx](../../../src/components/Footer.jsx) for email + social links; `src/i18n/translations.js` → `fr.header.title` for the tagline.
- **Profile summary**: `translations.js` → `fr.header.lead`.
- **Experience**: [src/components/Experience.jsx](../../../src/components/Experience.jsx)'s `experienceMeta` array (company, location, project, tech, in display order) zipped by `key` with `translations.js` → `fr.experience.items` (period, sector, role, description, achievements).
- **Languages**: [src/components/Languages.jsx](../../../src/components/Languages.jsx)'s `languageMeta` order zipped with `translations.js` → `fr.languages.items`.
- **Skills**: [src/components/Skills.jsx](../../../src/components/Skills.jsx)'s `skillCategories` (names only — drop `logo`/`url`), category titles from `translations.js` → `fr.competences.categories.<categoryKey>`.

Always use the **French** (`fr`) strings — per [CLAUDE.md](../../../CLAUDE.md) the résumé/legal PDFs are French-only, same as `cgs.pdf`.

## 2. Fill the template

Copy `template.html` (next to this file) to a scratch working copy and replace its `{{PLACEHOLDER}}` tokens with the current data using the Edit tool. Keep the existing HTML structure/CSS/classes as-is so repeated exports stay visually consistent.

The experience section has one comment-delimited block per role (`<!-- EXPERIENCE ITEM START -->` … `<!-- EXPERIENCE ITEM END -->`). Duplicate or remove that whole block to match however many entries `experienceMeta` currently has, and repeat the `<li>` per achievement. Same idea for the one `<p class="skill-cat">` per skill category.

## 3. Convert to docx

No Node/pandoc dependency needed — LibreOffice handles HTML → docx directly:

```bash
soffice --headless --infilter="HTML" --convert-to "docx:MS Word 2007 XML" resume.html
```

## 4. Verify before handing it over

```bash
soffice --headless --convert-to pdf resume.docx
pdftoppm -jpeg -r 100 resume.pdf page
```

Read the resulting `page-*.jpg` file(s) with the Read tool and check nothing overflows, is cut off, or misformats. Fix and re-convert if it does.

## 5. Deliver

This is a personal export artifact, not a site asset — **do not commit it to the repo**. Write the final `.docx` outside the working tree (e.g. the scratchpad, or the user's home directory if they want it easy to find), tell them the path, and remind them: upload to Drive, then right-click → **Open with → Google Docs** to get an editable copy.

## Future enhancements

- New site sections (education, certifications, side projects) → extend both the "live content" list above and `template.html`.
- Writing straight into a specific Drive folder/doc would need a Drive API/service-account integration — out of scope today, this only produces a local file.
