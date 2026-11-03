# LinkedIn

The LinkedIn profile, linked from the footer.

- **Audience**: recruiters and ESNs searching LinkedIn for a senior .Net profile, then clients who read
  the profile after a referral. Search keywords and a readable career story both matter.
- **Emphasize**: "Développeur .Net senior" up front for search, the AI-agents way of working and the
  application-security direction in the About, and the career story through the Experience entries.
- **Language**: French by default (LinkedIn's primary profile). English when asked (LinkedIn's
  secondary-language profile). Both when asked for both: print all French sections, then all English
  ones. "My LinkedIn headline in English" means the English Headline only, nothing else.
- **Sections**: the whole profile by default (Headline, About, every Experience entry, Top skills).
  Only the named section(s) when the user asks for one ("just the headline", "my About"); a single
  Experience entry when they name a company.
- **Headline field**: Headline. **Long-form field**: About (the one place "FullStack" goes).

## Field limits (LinkedIn's, in characters)

| Section              | LinkedIn field         | Limit    |
| -------------------- | ---------------------- | -------- |
| Headline             | Headline               | 220      |
| About                | About                  | 2,600    |
| Experience, per role | Title (position title) | 100      |
| Experience, per role | Description            | 2,000    |
| Top skills           | Top skills             | 5 skills |

## Content

- **Headline**: start from `header.eyebrow`, add the freelance status and the value in `header.title` /
  `header.lead`. Aim for 120 to 220 characters; LinkedIn truncates around 120 in search results, so the
  first 120 must stand alone.
- **About**: plain text (LinkedIn renders no Markdown; line breaks are kept), short paragraphs and
  lists, in this order. Aim for 1,500 to 2,200 characters.
  1. **Opening**, from `resume.json` `profile` and `header.lead`: "Développeur .Net FullStack senior"
     (the one FullStack), what the user does for clients, and how (AI agents + review + application
     security).
  2. **Years and sectors**: the years count (current year minus 2005), the sectors from `profile` and
     `experience.items.<key>.sector`, including logistique / logistics (backed by the BA Systemes entry
     in `additional.careerHistory`), and "en environnement Agile" / "in Agile environments".
  3. **"Mon positionnement freelance :"** (EN: "How I work as a freelancer:"), one `•` bullet per
     point: taking over complex projects and modernizing existing systems; joining a team on hard
     technical topics; cutting technical debt and making applications reliable; clean, maintainable
     architectures; industrializing the development cycle (CI/CD, quality, application security);
     technical leadership and mentoring. Word them from the Expertise page copy in
     `translations.js`: `expertise.pillars` and `expertise.items` (`modernisation`, `analyse`,
     `craftsmanship`, `cicd`, `devsecops`, `leadership`, `coaching`), and the matching detail
     namespaces (`modernisation.*`, `craftsmanship.*`, `coaching.*`, ...).
  4. **"Expertises clés :"** (EN: "Key expertise:"), one `✔️` line per group, not a one-line "Stack :":
     .Net Core / ASP.NET Core / Web API; Angular / React / TypeScript; architecture, Clean Code, SOLID,
     REST; CI/CD and DevSecOps; coaching and technical leadership. Take the names from `Skills.jsx`
     and `resume.json` `skills`, and drop a group no source backs.
  5. **Availability**: "📌 Disponible pour des missions freelance (court, moyen ou long terme) ou des
     projets au forfait." (EN: "📌 Available for freelance assignments (short, medium or long term) or
     fixed-price projects."), then the email and `monti-it.io`, one per line.
- **Experience**: one entry per item of `experienceMeta`, in that order (5 today). For each, print a
  reference line outside the code block with the fields the user fills by hand (company, location,
  period, sector), then two code blocks:
  - **Title**: `experience.items.<key>.role`, unchanged unless it exceeds 100 characters.
  - **Description**: the role's `description`, then its `achievements` as `•` bullets, then the
    project (`experienceMeta.project`) and its `tech` on one line. You may add tasks from the matching
    `additional.careerHistory` entry, in the language of the profile (its `fr` or `en` block).
- **Top skills**: exactly 5 LinkedIn skills, one per line, taken from `Skills.jsx` / `resume.json`
  `skills`. Include .Net (or C#) and ASP.NET Core, one application-security skill (e.g. "Sécurité
  applicative" / "Application Security", or "OWASP Top 10"), and the rest from DevOps/architecture.
  Use names LinkedIn's skill picker recognises.

## Print order

Headline, About, Experience, Top skills, each with its count as `n / limit`. The example in
`SKILL.md` step 6 is this platform's output.
