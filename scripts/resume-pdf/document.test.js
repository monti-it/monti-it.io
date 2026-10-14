import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { renderToBuffer } from '@react-pdf/renderer'
import { buildResumeDocument } from './document.js'

const resume = JSON.parse(
  readFileSync(new URL('../../src/data/resume.json', import.meta.url), 'utf-8')
)

// Link annotations and the catalog/info dictionaries are plain PDF objects (not
// compressed streams), so their values show up as-is in the raw bytes.
const linkUris = (pdf) =>
  [...pdf.toString('latin1').matchAll(/\/URI \(([^)]*)\)/g)].map(
    ([, uri]) => uri
  )
// A string entry, written inline (`/Lang (fr)`) or as an indirect object
// (`/Title 33 0 R` ... `33 0 obj\n(...)`).
const pdfEntry = (pdf, name) => {
  const raw = pdf.toString('latin1')
  const inline = raw.match(new RegExp(`/${name} \\(([^)]*)\\)`))
  if (inline) return inline[1]
  const ref = raw.match(new RegExp(`/${name} (\\d+) 0 R`))
  return ref
    ? raw.match(new RegExp(`\\n${ref[1]} 0 obj\\n\\(([^)]*)\\)`))?.[1]
    : undefined
}

// Every string the document renders, read from the element tree (the page text
// itself is in compressed content streams).
const renderedText = (element) => {
  if (typeof element === 'string' || typeof element === 'number') {
    return [String(element)]
  }
  if (Array.isArray(element)) return element.flatMap(renderedText)
  if (!element || typeof element !== 'object') return []
  return renderedText(element.props?.children)
}

// Leaf strings found under every `lang` key of resume.json.
const blockStrings = (node, lang, inBlock = false) => {
  if (typeof node === 'string') return inBlock ? [node] : []
  if (Array.isArray(node)) {
    return node.flatMap((item) => blockStrings(item, lang, inBlock))
  }
  if (!node || typeof node !== 'object') return []
  return Object.entries(node).flatMap(([key, value]) =>
    blockStrings(value, lang, inBlock || key === lang)
  )
}

// The shape of a value: its keys and array lengths, not its strings.
const shape = (node) => {
  if (Array.isArray(node)) return node.map(shape)
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [key, shape(value)])
    )
  }
  return typeof node
}

// Every object of resume.json that has a `fr` block, with its path.
const frBlockOwners = (node, path = 'resume') => {
  if (Array.isArray(node)) {
    return node.flatMap((item, index) =>
      frBlockOwners(item, `${path}[${index}]`)
    )
  }
  if (!node || typeof node !== 'object') return []
  const own = 'fr' in node ? [[path, node]] : []
  return [
    ...own,
    ...Object.entries(node).flatMap(([key, value]) =>
      key === 'fr' || key === 'en' ? [] : frBlockOwners(value, `${path}.${key}`)
    )
  ]
}

describe('résumé PDF contact line', () => {
  it('links the phone number to tel: with the spaces of contact.phone removed', async () => {
    const data = {
      ...resume,
      contact: { ...resume.contact, phone: '+33 1 23 45 67 89' }
    }

    const pdf = await renderToBuffer(buildResumeDocument(data, 'fr'))

    expect(linkUris(pdf)).toContain('tel:+33123456789')
  })
})

describe('resume.json translations', () => {
  it('has English content for the additional block', () => {
    expect(frBlockOwners(resume.additional, 'additional')).not.toEqual([])
  })

  it.each(frBlockOwners(resume))(
    '%s has an en block shaped like its fr block',
    (_path, node) => {
      expect(node.en).toBeDefined()
      expect(shape(node.en)).toEqual(shape(node.fr))
    }
  )
})

describe('résumé PDF language', () => {
  it.each([
    ['fr', 'Christophe MONTI - CV'],
    ['en', 'Christophe MONTI - Resume']
  ])('the %s PDF declares its language and title', async (lang, title) => {
    const pdf = await renderToBuffer(buildResumeDocument(resume, lang))

    expect(pdfEntry(pdf, 'Lang')).toBe(lang)
    expect(pdfEntry(pdf, 'Title')).toBe(title)
  })

  it('the en PDF renders no French text', () => {
    const text = renderedText(buildResumeDocument(resume, 'en')).join('\n')
    const english = new Set(blockStrings(resume, 'en'))
    const frenchOnly = blockStrings(resume, 'fr').filter(
      (value) => !english.has(value)
    )
    const frenchLabels = [
      'Profil professionnel',
      'Compétences techniques',
      'Expériences notables',
      'Formation',
      'Langues',
      'Résumé de carrière',
      'Résultats',
      'Environnement',
      'Projet',
      'Tâches'
    ]

    for (const french of [...frenchOnly, ...frenchLabels]) {
      expect(text, `"${french}" in the en PDF`).not.toContain(french)
    }
  })

  it('the en PDF renders the en blocks', () => {
    const text = renderedText(buildResumeDocument(resume, 'en')).join('\n')

    expect(text).toContain(resume.profile.en)
    expect(text).toContain(resume.additional.careerHistory[0].en.role)
    expect(text).toContain(resume.additional.softSkills.en[0])
  })

  it('rejects an unknown language', () => {
    expect(() => buildResumeDocument(resume, 'de')).toThrow(/de/)
  })
})
