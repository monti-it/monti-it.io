import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { translations } from './translations'
import { LanguageContext } from './useLanguage'
import { getLangFromPath, stripLangPrefix, withLangPrefix } from './localePaths'

function resolveKey(dict, key) {
  return key
    .split('.')
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      dict
    )
}

export function LanguageProvider({ children }) {
  const { pathname } = useLocation()
  const lang = getLangFromPath(pathname)

  const value = useMemo(() => {
    const dict = translations[lang]
    const t = (key) => {
      const result = resolveKey(dict, key)
      if (result === undefined) {
        console.warn(`Missing translation for "${key}" (${lang})`)
        return key
      }
      return result
    }
    return {
      lang,
      path: stripLangPrefix(pathname),
      t,
      localizePath: (path) => withLangPrefix(path, lang)
    }
  }, [lang, pathname])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
