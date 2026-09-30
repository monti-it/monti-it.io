const EN_PREFIX = '/en'

// French path -> English slug, for pages whose path differs between locales.
// Paths inside the app are always the French one (see stripLangPrefix).
const EN_SLUGS = { '/mentions-legales': '/legal-notice' }
const FR_PATHS = Object.fromEntries(
  Object.entries(EN_SLUGS).map(([fr, en]) => [en, fr])
)

export function getLangFromPath(pathname) {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
    ? 'en'
    : 'fr'
}

export function stripLangPrefix(pathname) {
  if (pathname === EN_PREFIX) return '/'
  if (pathname.startsWith(`${EN_PREFIX}/`)) {
    const path = pathname.slice(EN_PREFIX.length)
    return FR_PATHS[path] ?? path
  }
  return pathname
}

export function withLangPrefix(path, lang) {
  if (lang !== 'en') return path
  return path === '/' ? EN_PREFIX : `${EN_PREFIX}${EN_SLUGS[path] ?? path}`
}
