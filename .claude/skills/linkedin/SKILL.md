---
name: linkedin
description: Generate LinkedIn-ready profile copy (Headline, About, Experience entries, Top skills) from the site and résumé sources, in French by default, English on request, or both, and print it in the session for copy-paste. Reads the sources fresh, flags any drift between them, and writes nothing to the repo. Use when asked to "update my LinkedIn", for a "LinkedIn headline", "LinkedIn About" or "LinkedIn summary", or to "mettre à jour mon profil LinkedIn".
---

# LinkedIn profile copy

The LinkedIn profile (linked from the footer) is updated by hand, field by field. This skill turns the
repo's content into text the user pastes into each field. It goes the other way from the
[`resume`](../resume/SKILL.md) skill: it only reads.

**Print, never write.** The output goes in the session. Don't create, edit or format any file, don't
run `npm run format` or the `resume` skill, and don't `git add` or commit. `git status` must be the same
after the run as before it. Fixing a drift you report (step 3) is the user's call, through the `resume`
skill or an issue, not part of this run.

## 1. Read the request

- **Sections**: the whole profile by default (Headline, About, every Experience entry, Top skills). Only
  the named section(s) when the user asks for one ("just the headline", "my About"); a single Experience
  entry when they name a company.
- **Language**: French by default (LinkedIn's primary profile). English when asked (LinkedIn's
  secondary-language profile). Both when asked for both: print all French sections, then all English ones.
  "My LinkedIn headline in English" means the English Headline only, nothing else.

## 2. Read the sources, every run

Read these files now, with the Read tool. Don't reuse wording from this skill or from an earlier session:
the copy changes whenever the positioning does, and this skill only describes where facts live.

| Source                                                                     | What it gives you                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [src/i18n/translations.js](../../../src/i18n/translations.js)              | `header.eyebrow` (the identity line), `header.title`, `header.lead`, `footer.tagline`, `seo.home`, and `experience.items.<key>` (`period`, `sector`, `role`, `description`, `achievements`), in `fr` and `en`. `competences.categories` for skill category names. |
| [src/components/Experience.jsx](../../../src/components/Experience.jsx)    | `experienceMeta`: the roles shown on the site, **in display order**, with `company`, `location`, `project`, `tech`. This list decides which Experience entries you print.                                                                                         |
| [src/data/resume.json](../../../src/data/resume.json)                      | `title` (one language-neutral string), `profile.fr`/`en` (the CV summary), the 3 curated `experience[]` roles, `languages[]`, `skills.categories`, and `additional.careerHistory` (French only, the detailed timeline with tasks and full tech environments).     |
| [src/components/Footer.jsx](../../../src/components/Footer.jsx)            | The LinkedIn profile URL and the other public links. The contact email comes from `src/data/contact.js`.                                                                                                                                                          |
| [src/components/Skills.jsx](../../../src/components/Skills.jsx) (optional) | `skillCategories`: the full skill list, including the `securite` category, for picking Top skills.                                                                                                                                                                |

`resume.json` holds a phone number in `contact.phone`. **It never goes in any LinkedIn section**, in any
format (with or without `+33`, spaces or dots). The email and `monti-it.io` may appear in About.

## 3. Check for drift before drafting

Where two sources state the same fact, compare them. When they disagree, don't silently pick one: draft
from the site's version (`translations.js` / `Experience.jsx`, which carry the latest positioning
decision) and list the disagreement in the drift report (step 6), quoting both values with their paths.
Check at least:

- **Identity line**: `resume.json` `title` vs `header.eyebrow` (`en`, since `title` is English;
  then make sure the `fr` eyebrow says the same thing). Ignore case and a trailing `| Freelance` status;
  anything else that differs (a missing or extra role keyword, "FullStack", ".Net" vs ".NET") is drift.
- **Shared roles** (same `key` in `resume.json` `experience[]` and `experienceMeta`): `period`, `sector`,
  `company`, `location`. Hyphen vs en dash isn't drift. Wording of descriptions differs on purpose, so
  only flag a contradiction of fact (a different number, technology or scope).
- **Site roles vs `additional.careerHistory`**: company name spelling, role, period years, team size
  ("équipe de 4 développeurs").
- **Years of experience**: any "N ans" / "N years" in `profile`, `header.lead` or `seo` vs the current
  year minus 2005 (the "depuis 2005" start).
- **Missing facts**: a role in `experienceMeta` with no `experience.items.<key>` entry in a language you
  are printing, or no LinkedIn URL in `Footer.jsx`.

## 4. Draft each section

### Wording rules (positioning, decided in #70)

- Keep **"Développeur .NET senior"** (EN: "Senior .NET developer") visible, in the Headline and early in
  About, so recruiter searches on .NET find the profile.
- Imply that **AI agents write the code and Christophe frames, reviews and owns it**. Say it plainly
  ("des agents IA écrivent le code sous ma direction : je cadre, je relis et je réponds du résultat"),
  never as "I no longer code".
- Say **"AppSec"** in short labels and headlines (both languages), and spell it out as **"sécurité
  applicative"** (EN: "application security") in prose. Never "cybersécurité" / "cybersecurity".
- Claim **no security specialist title** (no "expert sécurité", "AppSec engineer", "consultant
  cybersécurité", "security architect") unless a security certification (CSSLP, Security+) appears in
  `resume.json`. Without one, security is an approach and a direction, not a title: "AppSec" names a
  field, never a role.
- Never use the words **"retraite"** / "retired" or **"maker"**.
- Don't project AI onto past roles: only the current role and the About may mention AI agents. Every fact
  (company, dates, team size, technology, result) must come from a source file; invent none.
- First person in About and Experience descriptions; same tone as the site copy.

### Field limits (LinkedIn's, in characters)

| Section              | LinkedIn field         | Limit    |
| -------------------- | ---------------------- | -------- |
| Headline             | Headline               | 220      |
| About                | About                  | 2,600    |
| Experience, per role | Title (position title) | 100      |
| Experience, per role | Description            | 2,000    |
| Top skills           | Top skills             | 5 skills |

### Content

- **Headline**: start from `header.eyebrow`, add the freelance status and the value in `header.title` /
  `header.lead`. Aim for 120 to 220 characters; LinkedIn truncates around 120 in search results, so the
  first 120 must stand alone.
- **About**: built from `resume.json` `profile` and `header.lead`: what the user does for clients, how
  (AI agents + review + application security), 21-ish years and sectors (compute from 2005), then a short
  call to action with the email and `monti-it.io`. Short paragraphs, plain text (LinkedIn renders no
  Markdown; line breaks are kept). Aim for 1,000 to 2,000 characters.
- **Experience**: one entry per item of `experienceMeta`, in that order (5 today). For each, print a
  reference line outside the code block with the fields the user fills by hand (company, location,
  period, sector), then two code blocks:
  - **Title**: `experience.items.<key>.role`, unchanged unless it exceeds 100 characters.
  - **Description**: the role's `description`, then its `achievements` as `•` bullets, then the
    project (`experienceMeta.project`) and its `tech` on one line. You may add tasks from the matching
    `additional.careerHistory` entry (French only: translate them for the English profile).
- **Top skills**: exactly 5 LinkedIn skills, one per line, taken from `Skills.jsx` / `resume.json`
  `skills`. Include .NET (or C#) and ASP.NET Core, one application-security skill (e.g. "Sécurité
  applicative" / "Application Security", or "OWASP Top 10"), and the rest from DevOps/architecture.
  Use names LinkedIn's skill picker recognises.

## 5. Count characters with a script

Count each block's characters with a script, not by eye, on the exact text inside the code block:

```bash
python3 -c 'import sys; print(len(sys.stdin.read().rstrip("\n")))' <<'EOF'
<the block's text>
EOF
```

`len` counts Unicode characters, as LinkedIn does (an accented letter or `·` is one). If a block is over
its limit, shorten it and count again. Then check no block contains the phone number: search the drafted
text for the digits of `contact.phone` with spaces, dots and the leading `+33`/`0` stripped.

## 6. Print

For each section, in this order (Headline, About, Experience, Top skills), print the LinkedIn field name
and the count as `n / limit`, then the text in its own fenced code block (`text`), so each one copies on
its own:

````markdown
## Profil LinkedIn (FR)

### Headline — 187 / 220

```text
…
```

### About — 1 642 / 2 600

```text
…
```

### Expérience 1/5 : CLAUGER · Brignais (69) · Depuis 2022 · Froid industriel

Title — 33 / 100

```text
…
```

Description — 612 / 2 000

```text
…
```

### Top skills — 5 / 5

```text
…
```

## Drift report

- `src/data/resume.json` `title`: "…" vs `src/i18n/translations.js` `header.eyebrow` (en): "…".
  Draft uses the site version. Fix through the `resume` skill.
````

Section titles follow the output language (e.g. "Experience 1/5" in English). Always end with the
**Drift report**, even for a single section: either the disagreements found in step 3, or "No drift
found" followed by the checks you ran. Then stop: no file changes, no follow-up edits unless the user asks.
