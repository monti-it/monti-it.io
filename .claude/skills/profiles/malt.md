# Malt

The main French freelance marketplace.

- **Audience**: clients (companies, project leads) who search Malt directly and pick a freelancer for a
  mission. Malt's search ranks profiles on the skills they list and on their reviews.
- **Emphasize**: what the user delivers on a mission and its outcome, not the career story: taking
  over and modernizing an existing application, cutting technical debt, industrializing and securing
  the delivery pipeline, AI agents writing the code under his framing and review. Word the outcomes
  from `expertise.pillars`, `expertise.items` and `experience.items.<key>.achievements`.
- **Language**: French by default. English when asked. Both when asked for both: all French sections,
  then all English ones.
- **Sections**: the whole profile by default (Profile title, Description, Skills, every Experience
  entry). Only the named section(s) when the user asks for one; a single Experience entry when they
  name a company.
- **Headline field**: Profile title. **Long-form field**: Description (the one place "FullStack" goes).
- **Contact details**: none. Leave the email and `monti-it.io` out of every Malt field: clients reach
  the user through the platform.
- **Day rate**: Malt shows one, but it's out of scope (`SKILL.md` step 1): the output only ends with
  a reminder to set it (see Print order).

## Field limits

Not known yet. When the user gives a limit from the form, use it for this run and suggest they copy
it here.

| Section              | Malt field    | Limit                                   |
| -------------------- | ------------- | --------------------------------------- |
| Profile title        | Profile title | unknown — copy from the platform's form |
| Description          | Description   | unknown — copy from the platform's form |
| Skills               | Skills        | unknown — copy from the platform's form |
| Experience, per role | Title         | unknown — copy from the platform's form |
| Experience, per role | Description   | unknown — copy from the platform's form |

## Content

- **Profile title**: "Développeur .Net senior" (EN: "Senior .Net developer") plus what a client hires
  the user for, from `header.eyebrow` and `header.title` ("AppSec" as the short label). Keep it short
  enough to read in a search result list.
- **Description**: plain text unless the form shows formatting, short paragraphs and `•` bullets, in
  this order:
  1. **Opening**: "Développeur .Net FullStack senior" (the one FullStack) and what a client gets from a
     mission with the user, from `resume.json` `profile` and `header.lead`.
  2. **Typical missions**: one `•` bullet per kind of mission, each with its outcome for the client
     (modernisation, technical debt, CI/CD and DevSecOps, architecture, technical leadership and
     coaching), from the Expertise page copy.
  3. **How I work**: AI agents write the code, the user frames, reviews and owns it; application
     security built into the delivery.
  4. **Credibility**: the years count (current year minus 2005) and the sectors from
     `experience.items.<key>.sector`.
  5. **Availability**: freelance missions (short, medium or long term) or fixed-price projects. No
     contact details.
- **Skills**: a longer keyword list than LinkedIn's 5, one per line, most important first: .Net, C#,
  ASP.NET Core and the other back-end names, then AppSec / application security, DevSecOps, CI/CD,
  Azure DevOps and front-end names. Only names `Skills.jsx` or `resume.json` `skills` back;
  use the names Malt's skill picker recognises. Print every backed skill and let the user trim to the
  form's limit.
- **Experience**: one entry per item of `experienceMeta`, in that order. For each, print a reference
  line outside the code block with the fields the user fills by hand (company, location, period,
  sector), then two code blocks:
  - **Title**: `experience.items.<key>.role`, unchanged.
  - **Description**: written as a mission report for a client: the `achievements` first, as `•`
    bullets, then the context from `description`, then the project (`experienceMeta.project`) and its
    `tech` on one line.

## Print order

Profile title, Description, Skills, Experience, each with its count as `n chars` (Skills as
`n skills`). End the Malt output with one line, in the output language, reminding the user to set the
day rate themself in Malt (FR: "Tarif journalier : à renseigner toi-même dans Malt.").
