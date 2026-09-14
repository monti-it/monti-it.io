import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  leadership: '👥',
  analyse: '🔍',
  communication: '💬',
  cicd: '⚙️',
  craftsmanship: '✨',
  expression: '📝',
  agile: '🔄',
  coaching: '🎓',
  modernisation: '🚀',
  securite: '🔒',
  agentic: '🤖'
}

function Improvements() {
  const { t, localizePath } = useLanguage()
  const items = t('expertise.items')

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('expertise.eyebrow')}</p>
        <h2>{t('expertise.title')}</h2>
        <p className="muted">{t('expertise.subtitle')}</p>
      </div>
      <div className="grid">
        {Object.entries(items).map(([key, item]) => (
          <article key={key} className="card">
            <div className="card-icon">{itemIcons[key]}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {key === 'securite' && (
              <Link className="card-link" to={localizePath('/securite')}>
                {t('common.discover')}
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Improvements
