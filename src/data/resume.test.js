import { describe, it, expect } from 'vitest'
// Only this test may import resume.json: a production import would bundle the
// whole file (phone number included) into the public JS.
import resume from './resume.json'
import { CONTACT_EMAIL } from './contact'
import { translations } from '../i18n/translations'

// resume.json feeds the PDF, translations.js feeds the site. They are kept
// separate on purpose, so this only checks the facts both of them carry.
// Entries present on one side only are intentional and not compared.

const langs = ['fr', 'en']

// Typography, not a fact: the PDF uses an en dash in periods, the site a hyphen.
const normalizeDashes = (value) => value.replace(/[\u2010-\u2015]/g, '-')

describe('resume.json stays in sync with the site', () => {
  it('uses the same contact email', () => {
    expect(
      resume.contact.email,
      'resume.json contact.email vs src/data/contact.js CONTACT_EMAIL'
    ).toBe(CONTACT_EMAIL)
  })

  describe.each(langs)('%s', (lang) => {
    const siteLanguages = translations[lang].languages.items
    const sharedLanguages = resume.languages.filter(
      ({ key }) => key in siteLanguages
    )

    it.each(sharedLanguages)(
      'language "$key" has the same name and level',
      (entry) => {
        const site = siteLanguages[entry.key]
        for (const field of ['name', 'level']) {
          expect(
            entry[lang][field],
            `resume.json languages[${entry.key}].${lang}.${field} vs translations.${lang}.languages.items.${entry.key}.${field}`
          ).toBe(site[field])
        }
      }
    )

    const siteExperience = translations[lang].experience.items
    const sharedRoles = resume.experience.filter(
      ({ key }) => key in siteExperience
    )

    it.each(sharedRoles)(
      'role "$company" has the same period and sector',
      (role) => {
        const site = siteExperience[role.key]
        expect(
          normalizeDashes(role[lang].period),
          `resume.json experience[${role.key}].${lang}.period vs translations.${lang}.experience.items.${role.key}.period`
        ).toBe(normalizeDashes(site.period))
        expect(
          role[lang].sector,
          `resume.json experience[${role.key}].${lang}.sector vs translations.${lang}.experience.items.${role.key}.sector`
        ).toBe(site.sector)
      }
    )
  })

  it.each(langs)('%s: has shared entries to compare', (lang) => {
    // Guards against a key rename silently turning every check into a no-op.
    const shared = (entries, siteItems) =>
      entries.filter(({ key }) => key in siteItems)
    expect(
      shared(resume.experience, translations[lang].experience.items)
    ).not.toHaveLength(0)
    expect(
      shared(resume.languages, translations[lang].languages.items)
    ).not.toHaveLength(0)
  })
})
