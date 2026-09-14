function resolveKey(dict, key) {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict)
}

export function translate(dict, key, lang) {
  const result = resolveKey(dict, key)
  if (result === undefined) {
    console.warn(`Missing translation for "${key}" (${lang})`)
    return key
  }
  return result
}
