import { describe, it, expect, vi, afterEach } from 'vitest'
import { translate } from './translate'

const dict = {
  header: { title: 'Titre' },
  nested: { a: { b: 'deep value' } }
}

describe('translate', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('resolves a top-level dot-path key', () => {
    expect(translate(dict, 'header.title', 'fr')).toBe('Titre')
  })

  it('resolves a deeply nested dot-path key', () => {
    expect(translate(dict, 'nested.a.b', 'fr')).toBe('deep value')
  })

  it('falls back to the key itself and warns when the key is missing', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(translate(dict, 'header.missing', 'en')).toBe('header.missing')
    expect(warnSpy).toHaveBeenCalledWith('Missing translation for "header.missing" (en)')
  })

  it('falls back to the key itself when an intermediate path segment does not exist', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(translate(dict, 'does.not.exist', 'fr')).toBe('does.not.exist')
  })
})
