// SVG layouts for the social banners. Colors mirror the --brand-* / --text-*
// tokens in src/index.scss; the mark mirrors public/mark.svg.
const NAVY = '#1b244f'
const NAVY_DARK = '#0f1829'
const GOLD = '#fecb57'
const TEXT = '#f1f5f9'
const MUTED = '#94a3b8'
const FONT = 'font-family="Inter"'

// 5x7 pixel font for the wordmark, matching public/og-image.png
const GLYPHS = {
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000']
}

const pixelWidth = (text, px) => text.length * 6 * px - px

const pixelText = (text, x, y, px, fill) => {
  const rects = [...text].flatMap((ch, i) =>
    GLYPHS[ch].flatMap((row, r) =>
      [...row].flatMap((bit, c) =>
        bit === '1'
          ? `<rect x="${x + (i * 6 + c) * px}" y="${y + r * px}" width="${px}" height="${px}"/>`
          : []
      )
    )
  )
  return `<g fill="${fill}" shape-rendering="crispEdges">${rects.join('')}</g>`
}

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const mark = (x, y, size) =>
  `<g transform="translate(${x} ${y}) scale(${size / 64})">` +
  `<rect x="2" y="2" width="60" height="60" rx="14" fill="${NAVY}"/>` +
  `<path d="M14 47 L23 20 L32 35 L41 20 L50 47 Z" fill="${GOLD}"/></g>`

const peaks = (x, y, scale, opacity) =>
  `<path transform="translate(${x} ${y}) scale(${scale})" d="M0 100 L32 0 L64 55 L96 0 L128 100 Z" fill="${MUTED}" opacity="${opacity}"/>`

const frame = (
  width,
  height,
  content
) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY_DARK}"/></linearGradient></defs>
<rect width="${width}" height="${height}" fill="url(#bg)"/>
${content}
</svg>`

// GitHub repository social preview: 1280x640 (2:1)
export const githubSocialPreview = ({ tagline, title }) => {
  const x = 330
  const px = 14
  return frame(
    1280,
    640,
    `${peaks(800, 60, 4.4, 0.07)}
${mark(110, 170, 180)}
${pixelText('MONTI IT', x, 180, px, GOLD)}
<rect x="${x}" y="298" width="${pixelWidth('MONTI IT', px)}" height="3" fill="${GOLD}" opacity="0.6"/>
<text x="${x}" y="352" ${FONT} font-size="30" font-weight="700" fill="${TEXT}">${escapeXml(tagline)}</text>
<text x="${x}" y="398" ${FONT} font-size="24" fill="${MUTED}">${escapeXml(title)}</text>
${pixelText('MONTI-IT.IO', x, 440, 5, TEXT)}`
  )
}

// LinkedIn profile banner: 1584x396. The profile photo covers the lower-left,
// so everything is right-aligned.
export const linkedinBanner = ({ tagline, title }) => {
  const right = 1494
  const px = 11
  const wordX = right - pixelWidth('MONTI IT', px)
  const ruleY = 60 + 7 * px + 28
  return frame(
    1584,
    396,
    `${peaks(-60, 60, 4.2, 0.08)}
${mark(wordX - 150, 42, 120)}
${pixelText('MONTI IT', wordX, 60, px, GOLD)}
<rect x="${wordX - 150}" y="${ruleY}" width="${right - wordX + 150}" height="3" fill="${GOLD}" opacity="0.6"/>
<text x="${right}" y="${ruleY + 52}" text-anchor="end" ${FONT} font-size="30" font-weight="700" fill="${TEXT}">${escapeXml(tagline)}</text>
<text x="${right}" y="${ruleY + 92}" text-anchor="end" ${FONT} font-size="22" fill="${MUTED}">${escapeXml(title)}</text>
${pixelText('MONTI-IT.IO', right - pixelWidth('MONTI-IT.IO', 4), 305, 4, TEXT)}`
  )
}

// Site logo lockup (mark + wordmark, no tagline) on a transparent background,
// used as an SVG by the footer so it stays sharp at any size
export const logoLockup = () => {
  const px = 6
  const x = 64 + 16
  const width = x + pixelWidth('MONTI IT', px)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="64" viewBox="0 0 ${width} 64">
${mark(0, 0, 64)}
${pixelText('MONTI IT', x, (64 - 7 * px) / 2, px, GOLD)}
</svg>
`
}
