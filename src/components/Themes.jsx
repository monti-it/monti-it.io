import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'

const themeMeta = [
  { key: 'expertise', icon: '🧭', to: '/expertise' },
  { key: 'competences', icon: '🧰', to: '/competences' },
  { key: 'reseau', icon: '🔌', to: '/reseau' },
  { key: 'domotique', icon: '🏡', to: '/domotique' },
  { key: 'maintenance', icon: '🔧', to: '/maintenance' }
]

function Themes() {
  const { t, localizePath } = useLanguage()

  return (
    <section id="themes" className="section">
      <div className="section-header">
        <p className="eyebrow">{t('themes.eyebrow')}</p>
        <h2>{t('themes.title')}</h2>
        <p className="muted">{t('themes.subtitle')}</p>
      </div>
      <div className="grid">
        {themeMeta.map((theme) => (
          <article key={theme.key} className="card">
            <div className="card-icon" aria-hidden="true">{theme.icon}</div>
            <h3>{t(`themes.items.${theme.key}.title`)}</h3>
            <p>{t(`themes.items.${theme.key}.description`)}</p>
            <Link className="card-link" to={localizePath(theme.to)}>
              {t('common.discover')}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Themes
