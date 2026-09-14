import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { translations } from './translations'
import { LanguageContext } from './useLanguage'
import { getLangFromPath, stripLangPrefix, withLangPrefix } from './localePaths'
import { translate } from './translate'

export function LanguageProvider({ children }) {
  const { pathname } = useLocation()
  const lang = getLangFromPath(pathname)

  const value = useMemo(() => {
    const dict = translations[lang]
    const t = (key) => translate(dict, key, lang)
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
