import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { translations } from '../src/i18n/translations.js'
import { githubSocialPreview, linkedinBanner } from './banners/layouts.js'
import { woffToTtf } from './banners/woffToTtf.js'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(scriptDir, '../branding')
const SCALE = 2 // render at 2x so the images stay crisp on high-DPI screens

// Pin the text font to the bundled Inter (same as the site) instead of
// whatever the machine has, so the output is reproducible. resvg-js only
// takes font file paths, hence the temp TTFs.
const require = createRequire(import.meta.url)
const fontDir = mkdtempSync(path.join(tmpdir(), 'banners-'))
const fontFiles = [400, 700].map((weight) => {
  const woff = readFileSync(
    require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`)
  )
  const file = path.join(fontDir, `inter-${weight}.ttf`)
  writeFileSync(file, woffToTtf(woff))
  return file
})

const banners = {
  'github-social-preview': githubSocialPreview,
  'linkedin-banner': linkedinBanner
}

mkdirSync(outputDir, { recursive: true })
try {
  for (const lang of ['fr', 'en']) {
    const { eyebrow: tagline, title } = translations[lang].header
    for (const [name, layout] of Object.entries(banners)) {
      const png = new Resvg(layout({ tagline, title }), {
        fitTo: { mode: 'zoom', value: SCALE },
        font: { loadSystemFonts: false, fontFiles, defaultFontFamily: 'Inter' }
      })
        .render()
        .asPng()
      const outputPath = path.join(outputDir, `${name}-${lang}.png`)
      writeFileSync(outputPath, png)
      console.log(`Banner written to ${outputPath}`)
    }
  }
} finally {
  rmSync(fontDir, { recursive: true, force: true })
}
