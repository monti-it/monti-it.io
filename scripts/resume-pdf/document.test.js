import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { renderToBuffer } from '@react-pdf/renderer'
import { buildResumeDocument } from './document.js'

const resume = JSON.parse(
  readFileSync(new URL('../../src/data/resume.json', import.meta.url), 'utf-8')
)

// Link annotations are plain PDF objects (not compressed streams), so their
// URI shows up as-is in the raw bytes.
const linkUris = (pdf) =>
  [...pdf.toString('latin1').matchAll(/\/URI \(([^)]*)\)/g)].map(
    ([, uri]) => uri
  )

describe('résumé PDF contact line', () => {
  it('links the phone number to tel: with the spaces of contact.phone removed', async () => {
    const data = {
      ...resume,
      contact: { ...resume.contact, phone: '+33 1 23 45 67 89' }
    }

    const pdf = await renderToBuffer(buildResumeDocument(data))

    expect(linkUris(pdf)).toContain('tel:+33123456789')
  })
})
