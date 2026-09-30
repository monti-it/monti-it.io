import { describe, it, expect } from 'vitest'
import { getLangFromPath, stripLangPrefix, withLangPrefix } from './localePaths'

describe('getLangFromPath', () => {
  it('returns "en" for the bare /en path', () => {
    expect(getLangFromPath('/en')).toBe('en')
  })

  it('returns "en" for a path under /en/', () => {
    expect(getLangFromPath('/en/expertise')).toBe('en')
  })

  it('returns "fr" for a French path', () => {
    expect(getLangFromPath('/expertise')).toBe('fr')
  })

  it('returns "fr" for a path that merely starts with "en" but is not prefixed', () => {
    expect(getLangFromPath('/entretien')).toBe('fr')
  })
})

describe('stripLangPrefix', () => {
  it('strips the bare /en prefix down to "/"', () => {
    expect(stripLangPrefix('/en')).toBe('/')
  })

  it('strips the /en/ prefix from a nested path', () => {
    expect(stripLangPrefix('/en/expertise')).toBe('/expertise')
  })

  it('leaves a French path unchanged', () => {
    expect(stripLangPrefix('/expertise')).toBe('/expertise')
  })

  it('maps a localized English slug back to its French path', () => {
    expect(stripLangPrefix('/en/legal-notice')).toBe('/mentions-legales')
  })

  it('leaves a localized French path unchanged', () => {
    expect(stripLangPrefix('/mentions-legales')).toBe('/mentions-legales')
  })
})

describe('withLangPrefix', () => {
  it('leaves the path unchanged for French', () => {
    expect(withLangPrefix('/expertise', 'fr')).toBe('/expertise')
  })

  it('prefixes a nested path for English', () => {
    expect(withLangPrefix('/expertise', 'en')).toBe('/en/expertise')
  })

  it('maps the root path to the bare /en prefix for English', () => {
    expect(withLangPrefix('/', 'en')).toBe('/en')
  })

  it('maps a localized French path to its English slug', () => {
    expect(withLangPrefix('/mentions-legales', 'en')).toBe('/en/legal-notice')
  })

  it('leaves a localized French path unchanged for French', () => {
    expect(withLangPrefix('/mentions-legales', 'fr')).toBe('/mentions-legales')
  })
})
