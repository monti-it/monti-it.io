# Le Hibou

A French IT freelance platform for missions at large companies and public bodies. Le Hibou contracts
with the client and the user invoices Le Hibou.

- **Audience**: Le Hibou's staff, who match the profile to missions, then the IT departments of large
  companies and public bodies. Mostly CV-driven: they read the title and skills, then the uploaded CV.
- **Emphasize**: application security. Large, regulated clients care about secure development, so
  put the AppSec angle (secure development, DevSecOps, OWASP practices, as far as the sources back
  them) right after "Développeur .Net senior", plus the critical sectors from
  `experience.items.<key>.sector`. Security stays an approach, not a title (see the wording rules).
- **Language**: French by default. English when asked.
- **Sections**: Title, Skills and Summary by default, then the CV reminder. Only the named section(s)
  when the user asks for one. No Experience entries: the CV carries them.
- **Headline field**: Title. **Long-form field**: Summary (the one place "FullStack" goes).
- **Contact details**: none. Leave the email and `monti-it.io` out of these fields: the profile holds
  contact details in fields of its own.

## Field limits

Not known yet. When the user gives a limit from the form, use it for this run and suggest they copy
it here.

| Section | Le Hibou field | Limit                                   |
| ------- | -------------- | --------------------------------------- |
| Title   | Title          | unknown — copy from the platform's form |
| Skills  | Skills         | unknown — copy from the platform's form |
| Summary | Summary        | unknown — copy from the platform's form |

## Content

- **Title**: "Développeur .Net senior" (EN: "Senior .Net developer") and the rest of `header.eyebrow`,
  with "AppSec" as the short label.
- **Skills**: a keyword list, one per line: .Net, C#, ASP.NET Core and the other back-end names, then
  the security names (AppSec / application security, DevSecOps, OWASP Top 10 where the sources have
  it), CI/CD, the cloud and front-end names. Only names `Skills.jsx` or `resume.json` `skills` back.
- **Summary**: three to five sentences, from `resume.json` `profile`: "Développeur .Net FullStack
  senior" (the one FullStack), the years count (current year minus 2005), application security built
  into the delivery, the sectors, the AI-agents way of working, and the availability for freelance
  missions.

## Print order

Title, Summary, Skills, each with its count as `n chars` (Skills as `n skills`). End with one line,
in the output language, reminding the user to upload the current CV: `public/resume-fr.pdf` (and
`public/resume-en.pdf` if the form takes a second one).
