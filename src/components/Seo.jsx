import { useEffect } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { withLangPrefix } from '../i18n/localePaths'

const SITE_URL = 'https://monti-it.io'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

function setMetaTag(attr, key, content) {
  let element = document.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function setAlternateLink(hreflang, href) {
  let element = document.querySelector(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  )
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'alternate')
    element.setAttribute('hreflang', hreflang)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function Seo({ seoKey, noindex = false }) {
  const { t, lang, path } = useLanguage()

  useEffect(() => {
    const title = t(`seo.${seoKey}.title`)
    const description = t(`seo.${seoKey}.description`)
    const fullTitle = `${title} | Monti IT`
    const frUrl = `${SITE_URL}${path}`
    const enUrl = `${SITE_URL}${withLangPrefix(path, 'en')}`
    const currentUrl = lang === 'en' ? enUrl : frUrl

    document.documentElement.lang = lang
    document.title = fullTitle
    setMetaTag('name', 'description', description)
    setLinkTag('canonical', currentUrl)

    setAlternateLink('fr', frUrl)
    setAlternateLink('en', enUrl)
    setAlternateLink('x-default', frUrl)

    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', currentUrl)
    setMetaTag('property', 'og:image', DEFAULT_IMAGE)
    setMetaTag('property', 'og:image:width', '1200')
    setMetaTag('property', 'og:image:height', '630')
    setMetaTag('property', 'og:image:type', 'image/png')
    setMetaTag('property', 'og:image:alt', 'Monti IT')
    setMetaTag('property', 'og:locale', lang === 'en' ? 'en_US' : 'fr_FR')

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)

    // Head tags persist across client-side navigations, so clear it on pages that don't set it
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex')
    } else {
      document.querySelector('meta[name="robots"]')?.remove()
    }
  }, [seoKey, noindex, t, lang, path])

  return null
}

export default Seo
