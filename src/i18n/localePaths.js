const EN_PREFIX = '/en'

export function getLangFromPath(pathname) {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
    ? 'en'
    : 'fr'
}

export function stripLangPrefix(pathname) {
  if (pathname === EN_PREFIX) return '/'
  if (pathname.startsWith(`${EN_PREFIX}/`))
    return pathname.slice(EN_PREFIX.length)
  return pathname
}

export function withLangPrefix(path, lang) {
  if (lang !== 'en') return path
  return path === '/' ? EN_PREFIX : `${EN_PREFIX}${path}`
}
