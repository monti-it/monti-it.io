import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'
import { withLangPrefix } from '../i18n/localePaths'
import { FlagFR, FlagGB } from './FlagIcon'
import { CONTACT_EMAIL } from '../data/contact'

const navItems = [
  { key: 'expertise', to: '/expertise', icon: '🧭' },
  { key: 'competences', to: '/competences', icon: '🧰' },
  { key: 'securite', to: '/securite', icon: '🛡️' }
]

// Field services share one entry pointing at the home Themes grid, so the
// navbar only headlines the core offers.
const fieldPaths = ['/reseau', '/domotique', '/maintenance']

function Navbar() {
  const { lang, path, t, localizePath } = useLanguage()

  return (
    <nav className="navbar">
      <Link to={localizePath('/')} className="navbar-brand">
        <img src="/mark.svg" alt="" className="navbar-logo" />
        {t('nav.brand')}
      </Link>
      <div className="navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={localizePath(item.to)}
            className={({ isActive }) =>
              `navbar-link${isActive ? ' active' : ''}`
            }
          >
            <span className="navbar-link-icon" aria-hidden="true">
              {item.icon}
            </span>
            {t(`nav.${item.key}`)}
          </NavLink>
        ))}
        <Link
          to={`${localizePath('/')}#themes`}
          className={`navbar-link${fieldPaths.includes(path) ? ' active' : ''}`}
        >
          <span className="navbar-link-icon" aria-hidden="true">
            🛠️
          </span>
          {t('nav.terrain')}
        </Link>
      </div>
      <div className="navbar-lang">
        <Link
          to={withLangPrefix(path, 'fr')}
          className={`navbar-lang-link${lang === 'fr' ? ' active' : ''}`}
          aria-label="Français"
          title="Français"
        >
          <FlagFR />
        </Link>
        <Link
          to={withLangPrefix(path, 'en')}
          className={`navbar-lang-link${lang === 'en' ? ' active' : ''}`}
          aria-label="English"
          title="English"
        >
          <FlagGB />
        </Link>
      </div>
      <a className="btn primary navbar-cta" href={`mailto:${CONTACT_EMAIL}`}>
        {t('common.contactCta')}
      </a>
    </nav>
  )
}

export default Navbar
