import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Expertise', to: '/expertise', icon: '🧭' },
  { label: 'Compétences', to: '/competences', icon: '🧰' },
  { label: 'Réseau', to: '/reseau', icon: '🔌' },
  { label: 'Domotique', to: '/domotique', icon: '🏡' },
  { label: 'Maintenance', to: '/maintenance', icon: '🔧' }
]

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/favicon.png" alt="" className="navbar-logo" />
        Monti IT
      </Link>
      <div className="navbar-links">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
          >
            <span className="navbar-link-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
      <a className="btn primary navbar-cta" href="mailto:hello@monti-it.io">
        Contactez moi
      </a>
    </nav>
  )
}

export default Navbar
