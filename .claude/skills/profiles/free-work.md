# Free-Work

Free-Work (formerly Freelance-info), a mission board where ESNs post missions and search a CV
database.

- **Audience**: ESN recruiters and account managers who search the CV database by keyword, then open
  the uploaded CV. The profile is mostly a way to be found; the CV does the convincing.
- **Emphasize**: the keywords a recruiter types for a senior .Net mission (title, skills), with the
  AppSec direction among them. Keep the summary short: the CV holds the detail.
- **Language**: French by default. English when asked.
- **Sections**: Title, Skills and Summary by default, then the CV reminder. Only the named section(s)
  when the user asks for one. No Experience entries: the CV carries them.
- **Headline field**: Title. **Long-form field**: Summary (the one place "FullStack" goes).
- **Contact details**: none. Leave the email and `monti-it.io` out of these fields: the profile holds
  contact details in fields of its own.

## Field limits

Not known yet. When the user gives a limit from the form, use it for this run and suggest they copy
it here.

| Section | Free-Work field | Limit                                   |
| ------- | --------------- | --------------------------------------- |
| Title   | Title           | unknown — copy from the platform's form |
| Skills  | Skills          | unknown — copy from the platform's form |
| Summary | Summary         | unknown — copy from the platform's form |

## Content

- **Title**: "Développeur .Net senior" (EN: "Senior .Net developer") and the rest of `header.eyebrow`
  ("AppSec" as the short label). A job title a recruiter would search, not a slogan.
- **Skills**: a keyword list, one per line, most searched first: .Net, C#, ASP.NET Core and the other
  back-end names, then AppSec / application security, DevSecOps, CI/CD, the cloud and front-end
  names. Only names `Skills.jsx` or `resume.json` `skills` back.
- **Summary**: three to five sentences, from `resume.json` `profile`: "Développeur .Net FullStack
  senior" (the one FullStack), the years count (current year minus 2005), the sectors, the AI-agents
  way of working, the application-security direction, and the availability for freelance missions.

## Print order

Title, Summary, Skills, each with its count as `n chars` (Skills as `n skills`). End with one line,
in the output language, reminding the user to upload the current CV: `public/resume-fr.pdf` (and
`public/resume-en.pdf` if the form takes a second one).
