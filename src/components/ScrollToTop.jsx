import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Client-side navigation doesn't jump to anchors on its own (e.g. the
    // navbar's /#themes entry clicked from another page).
    const target = hash && document.getElementById(hash.slice(1))
    if (target) {
      target.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
