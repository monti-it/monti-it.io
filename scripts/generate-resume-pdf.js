import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { renderToFile } from '@react-pdf/renderer'
import { buildResumeDocument } from './resume-pdf/document.js'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(scriptDir, '../src/data/resume.json')
const outputPath = path.join(scriptDir, '../public/resume.pdf')

const resumeData = JSON.parse(readFileSync(dataPath, 'utf-8'))

await renderToFile(buildResumeDocument(resumeData), outputPath)

console.log(`Resume PDF written to ${outputPath}`)
