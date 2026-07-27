import { useEffect } from 'react'

const SITE_URL = 'https://monti-it.io'
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`

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

function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = `${title} | Monti IT`
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    setMetaTag('name', 'description', description)
    setLinkTag('canonical', url)

    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', url)
    setMetaTag('property', 'og:image', DEFAULT_IMAGE)

    setMetaTag('name', 'twitter:card', 'summary')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)
  }, [title, description, path])

  return null
}

export default Seo
