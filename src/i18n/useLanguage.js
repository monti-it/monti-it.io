import { createContext, useContext } from 'react'

export const LanguageContext = createContext({
  lang: 'fr',
  path: '/',
  t: (key) => key,
  localizePath: (path) => path
})

export function useLanguage() {
  return useContext(LanguageContext)
}
