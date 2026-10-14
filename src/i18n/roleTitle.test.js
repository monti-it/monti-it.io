import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { translations } from './translations'
// Only tests may import resume.json (see src/data/resume.test.js).
import resume from '../data/resume.json'

// ".Net" is the preferred spelling; "ASP.NET" stays, it's one product name.
const standaloneDotNet = /(?<!ASP)\.N[E]T/

const collectStrings = (value, path = []) => {
  if (typeof value === 'string') return [[path.join('.'), value]]
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      collectStrings(child, [...path, key])
    )
  }
  return []
}

describe('role title', () => {
  it.each([
    ['fr', 'header.eyebrow', 'Développeur .Net FullStack senior · IA · AppSec'],
    ['en', 'header.eyebrow', 'Senior .Net FullStack developer · AI · AppSec'],
    [
      'fr',
      'seo.home.title',
      'Développeur .Net FullStack senior freelance · IA & AppSec'
    ],
    [
      'en',
      'seo.home.title',
      'Senior .Net FullStack freelance developer · AI & AppSec'
    ],
    [
      'fr',
      'legalNotice.bannerAlt',
      'Monti IT, développeur .Net FullStack senior freelance'
    ],
    [
      'en',
      'legalNotice.bannerAlt',
      'Monti IT, senior freelance .Net FullStack developer'
    ]
  ])('%s %s reads the role title', (lang, key, expected) => {
    const value = key
      .split('.')
      .reduce((node, part) => node[part], translations[lang])
    expect(value).toBe(expected)
  })

  it.each([
    ['fr', 'Christophe Monti, développeur .Net FullStack senior : '],
    ['en', 'Christophe Monti, senior .Net FullStack developer: ']
  ])('%s seo.resume.description starts with the role title', (lang, start) => {
    expect(translations[lang].seo.resume.description.startsWith(start)).toBe(
      true
    )
  })

  it('résumé title reads the role title', () => {
    expect(resume.title).toBe(
      'Senior .Net FullStack Developer · AI · AppSec | Freelance'
    )
  })

  it('index.html static titles read the French home title', () => {
    const html = readFileSync(
      new URL('../../index.html', import.meta.url),
      'utf8'
    )
    const expected =
      'Développeur .Net FullStack senior freelance · IA &amp; AppSec | Monti IT'
    expect(html.match(/<title>\s*([^<]*?)\s*<\/title>/)[1]).toBe(expected)
    for (const property of ['og:title', 'twitter:title']) {
      const meta = html.match(
        new RegExp(`(?:property|name)="${property}"\\s+content="([^"]*)"`)
      )
      expect(meta?.[1], property).toBe(expected)
    }
  })
})

describe('".Net" spelling', () => {
  it.each(['fr', 'en'])(
    '%s translations never write the all-caps spelling',
    (lang) => {
      const offenders = collectStrings(translations[lang]).filter(([, text]) =>
        standaloneDotNet.test(text)
      )
      expect(offenders).toEqual([])
    }
  )

  it('resume.json never writes the all-caps spelling', () => {
    const offenders = collectStrings(resume).filter(([, text]) =>
      standaloneDotNet.test(text)
    )
    expect(offenders).toEqual([])
  })
})
