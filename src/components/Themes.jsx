import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'

const primaryThemes = [
  { key: 'expertise', icon: '🧭', to: '/expertise' },
  { key: 'competences', icon: '🧰', to: '/competences' },
  { key: 'securite', icon: '🛡️', to: '/securite' }
]

const secondaryThemes = [
  { key: 'reseau', icon: '🔌', to: '/reseau' },
  { key: 'domotique', icon: '🏡', to: '/domotique' },
  { key: 'maintenance', icon: '🔧', to: '/maintenance' }
]

function Themes() {
  const { t, localizePath } = useLanguage()

  const renderCard = (theme) => (
    <article key={theme.key} className="card card-gradient">
      <div className="card-icon" aria-hidden="true">
        {theme.icon}
      </div>
      <h3>{t(`themes.items.${theme.key}.title`)}</h3>
      <p>{t(`themes.items.${theme.key}.description`)}</p>
      <Link className="card-link" to={localizePath(theme.to)}>
        {t('common.discover')}
      </Link>
    </article>
  )

  return (
    <section id="themes" className="section">
      <div className="section-header">
        <p className="eyebrow">{t('themes.eyebrow')}</p>
        <h2>{t('themes.title')}</h2>
        <p className="muted">{t('themes.subtitle')}</p>
      </div>
      <div className="grid">{primaryThemes.map(renderCard)}</div>
      <p className="eyebrow">{t('themes.secondaryTitle')}</p>
      <div className="grid">{secondaryThemes.map(renderCard)}</div>
    </section>
  )
}

export default Themes
