---
name: profiles
description: Generate paste-ready freelance profile copy for LinkedIn (Headline, About, Experience entries, Top skills), Malt (profile title, description, skills, experiences), Free-Work and Le Hibou (title, skills, short summary, CV upload reminder) from the site and résumé sources, in French by default, English on request, or both, and print it in the session for copy-paste. Reads the sources fresh, applies the positioning wording rules, flags any drift between them, never prints the phone number or a day rate, and writes nothing to the repo. Use when asked to "update my LinkedIn", "update my Malt profile", "update my Free-Work profile", "update my Le Hibou profile" or "update all my profiles", for a "LinkedIn headline", "LinkedIn About", "LinkedIn summary" or "Malt description", or to "mettre à jour mon profil LinkedIn / Malt / Free-Work / Le Hibou" or "mettre à jour tous mes profils".
---

# Freelance profile copy

The user's public profiles are updated by hand, field by field. This skill turns the repo's content
into text the user pastes into each field. It goes the other way from the [`resume`](../resume/SKILL.md)
skill: it only reads.

This file holds what every platform shares: the sources, the drift check, the wording rules, the
character count, the phone-number guard and the output format. Each platform's fields, limits,
audience and emphasis live in its own file, next to this one:

| Platform  | File                         | Audience                          | Asked for as                              |
| --------- | ---------------------------- | --------------------------------- | ----------------------------------------- |
| LinkedIn  | [linkedin.md](linkedin.md)   | Recruiters                        | "LinkedIn", "profil LinkedIn"             |
| Malt      | [malt.md](malt.md)           | Clients searching the marketplace | "Malt", "profil Malt"                     |
| Free-Work | [free-work.md](free-work.md) | ESNs searching a CV database      | "Free-Work", "Freework", "Freelance-info" |
| Le Hibou  | [le-hibou.md](le-hibou.md)   | Large companies and public bodies | "Le Hibou", "Hibou", "profil Le Hibou"    |

**Print, never write.** The output goes in the session. Don't create, edit or format any file, don't
run `npm run format` or the `resume` skill, and don't `git add` or commit. `git status` must be the same
after the run as before it. Fixing a drift you report (step 3) is the user's call, through the `resume`
skill or an issue, not part of this run.

## 1. Read the request

- **Platform**: the one the user names. "All my profiles" / "tous mes profils" means every platform,
  in the table's order. With no platform named ("update my profile"), ask which one, listing the four
  and "all". Read each requested platform's file now: it gives the platform's default language, its
  sections and how to narrow them ("just the headline", one company), its limits and its content
  rules.
- **Sections and language**: as the platform file says. By default, the whole profile in French.
- **Day rate**: never propose, compute or print one, on any platform. It's the user's call and no
  source file holds it.

## 2. Read the sources, every run

Read these files now, with the Read tool. Don't reuse wording from this skill or from an earlier session:
the copy changes whenever the positioning does, and this skill only describes where facts live.

| Source                                                                     | What it gives you                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [src/i18n/translations.js](../../../src/i18n/translations.js)              | `header.eyebrow` (the identity line), `header.title`, `header.lead`, `footer.tagline`, `seo.home`, and `experience.items.<key>` (`period`, `sector`, `role`, `description`, `achievements`), in `fr` and `en`. `competences.categories` for skill category names.            |
| [src/components/Experience.jsx](../../../src/components/Experience.jsx)    | `experienceMeta`: the roles shown on the site, **in display order**, with `company`, `location`, `project`, `tech`. This list decides which Experience entries you print.                                                                                                    |
| [src/data/resume.json](../../../src/data/resume.json)                      | `title` (one language-neutral string), `profile.fr`/`en` (the CV summary), the 3 curated `experience[]` roles, `languages[]`, `skills.categories`, and `additional.careerHistory` (the detailed timeline with tasks and full tech environments, `fr`/`en` blocks per entry). |
| [src/components/Footer.jsx](../../../src/components/Footer.jsx)            | The LinkedIn profile URL and the other public links. The contact email comes from `src/data/contact.js`.                                                                                                                                                                     |
| [src/components/Skills.jsx](../../../src/components/Skills.jsx) (optional) | `skillCategories`: the full skill list, including the `securite` category, for picking skills.                                                                                                                                                                               |

`resume.json` holds a phone number in `contact.phone`. **It never goes in any section of any
platform**, in any format (with or without `+33`, spaces or dots). The email and `monti-it.io` may
appear only where the platform file allows them.

## 3. Check for drift before drafting

Where two sources state the same fact, compare them. When they disagree, don't silently pick one: draft
from the site's version (`translations.js` / `Experience.jsx`, which carry the latest positioning
decision) and list the disagreement in the drift report (step 6), quoting both values with their paths.
Check at least:

- **Identity line**: `resume.json` `title` vs `header.eyebrow` (`en`, since `title` is English;
  then make sure the `fr` eyebrow says the same thing). Ignore title case ("Developer" vs "developer")
  and a trailing `| Freelance` status; anything else that differs (a missing or extra role keyword) is
  drift, and so is "FullStack" in either title or an all-caps ".NET" outside "ASP.NET" in either source.
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

Each platform file names its **headline field** (the short title under the name) and its **long-form
field** (the About, description or summary). The rules below use those two terms.

### Start from the current text, when the user gives it

If the user pastes (or points to) their current text for a section, read it before drafting that
section. Keep what is still true and on-positioning (its strong points, structure and phrasing),
rewrite the rest from the sources, and list what you dropped or changed as outdated, under an
**Outdated in the current text** heading before the drift report (step 6). Outdated means, for example:

- a years count other than the current year minus 2005;
- ".NET" in capitals outside "ASP.NET";
- "FullStack" anywhere but once in the long-form field;
- no mention of AI agents or of application security;
- anything breaking a wording rule below, or a fact no source file backs.

The pasted text is input only: this still prints, never writes.

### Wording rules (positioning, decided in #70), for every platform

- Keep **"Développeur .Net senior"** (EN: "Senior .Net developer") visible, in the headline field and
  early in the long-form field, so recruiter and client searches on .Net find the profile.
- Say **"FullStack"** once in the long-form field, as a search keyword ("Développeur .Net FullStack
  senior" / "Senior .Net FullStack developer"), and nowhere else: not in the headline field,
  Experience entries or skill lists.
- Write **".Net"**, never ".NET", except in the product name "ASP.NET" ("ASP.NET Core", "ASP.NET MVC").
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
- Don't project AI onto past roles: only the current role and the long-form field may mention AI
  agents. Every fact (company, dates, team size, technology, result) must come from a source file;
  invent none.
- First person in the long-form field and Experience descriptions; same tone as the site copy.

Then draft each of the platform's sections from its file's **Content** rules.

## 5. Count characters with a script

Count each block's characters with a script, not by eye, on the exact text inside the code block. Use
Node, which the repo already needs (Python isn't always installed: on Windows, `python3` can resolve to
the Microsoft Store alias and fail):

```bash
node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log([...s.replace(/\r/g,"").replace(/\n+$/,"")].length))' <<'__PROFILE_BLOCK_END__'
<the block's text>
__PROFILE_BLOCK_END__
```

It drops `\r` and trailing newlines, then `[...s]` counts Unicode code points, as LinkedIn does: an
accented letter, `·` or `•` is one, but "✔️" is two (✔ plus the variation selector U+FE0F), while "📌" is
one. Don't use `s.length`, which counts UTF-16 units. If a block is over its limit, shorten it and
count again. A limit marked `unknown — copy from the platform's form` has no number to check against:
count anyway, and print the count alone (step 6). For a skills list, count the skills, not the
characters. Then check no block contains the phone number, with a script that prints only a verdict, never the
number:

```bash
node -e 'const p=require("./src/data/resume.json").contact.phone.replace(/\D/g,"").replace(/^(33|0)/,"");let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(s.replace(/\D/g,"").includes(p)?"PHONE FOUND":"no phone"))' <<'__PROFILE_BLOCK_END__'
<all the drafted blocks>
__PROFILE_BLOCK_END__
```

It compares digits only, so spaces, dots and a `+33` or leading `0` don't hide the number. On
`PHONE FOUND`, remove it and check again.

## 6. Print

For each section, in the platform file's print order, print the field name and the count as
`n / limit` (or `n chars`, `n skills` where the limit is unknown), then the text in its own fenced
code block (`text`), so each one copies on its own. Then the platform file's closing reminder, if it
has one. For several platforms, print each one in turn under its own `## Profil <Platform> (FR)`
heading, and a single drift report at the very end. This is LinkedIn's output:

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
found" followed by the checks you ran. When the user gave their current text, put **Outdated in the
current text** just before it, one bullet per item, quoting it. Then stop: no file changes, no follow-up edits unless the user asks.
