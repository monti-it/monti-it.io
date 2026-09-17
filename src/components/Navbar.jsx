import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'
import { withLangPrefix } from '../i18n/localePaths'
import { FlagFR, FlagGB } from './FlagIcon'

const navItems = [
  { key: 'expertise', to: '/expertise', icon: '🧭' },
  { key: 'competences', to: '/competences', icon: '🧰' },
  { key: 'reseau', to: '/reseau', icon: '🔌' },
  { key: 'domotique', to: '/domotique', icon: '🏡' },
  { key: 'maintenance', to: '/maintenance', icon: '🔧' }
]

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
            className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
          >
            <span className="navbar-link-icon">{item.icon}</span>
            {t(`nav.${item.key}`)}
          </NavLink>
        ))}
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
      <a className="btn primary navbar-cta" href="mailto:hello@monti-it.io">
        {t('common.contactCta')}
      </a>
    </nav>
  )
}

export default Navbar
