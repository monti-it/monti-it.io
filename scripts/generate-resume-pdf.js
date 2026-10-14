import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { renderToFile } from '@react-pdf/renderer'
import { buildResumeDocument, RESUME_LANGUAGES } from './resume-pdf/document.js'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(scriptDir, '../src/data/resume.json')

const resumeData = JSON.parse(readFileSync(dataPath, 'utf-8'))

// One PDF per language: public/resume-fr.pdf, public/resume-en.pdf.
for (const lang of RESUME_LANGUAGES) {
  const outputPath = path.join(scriptDir, `../public/resume-${lang}.pdf`)
  await renderToFile(buildResumeDocument(resumeData, lang), outputPath)
  console.log(`Resume PDF (${lang}) written to ${outputPath}`)
}
