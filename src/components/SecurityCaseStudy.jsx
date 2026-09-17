import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  contexte: '🧩',
  test: '🧪',
  decouverte: '🔎',
  risque: '⚠️',
  correction: '🛠️',
  enseignement: '💡'
}

function SecurityCaseStudy() {
  const { t } = useLanguage()
  const items = t('securite.items')

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('securite.eyebrow')}</p>
        <h1>{t('securite.title')}</h1>
        <p className="muted">{t('securite.subtitle')}</p>
      </div>
      <p className="lead">{t('securite.intro')}</p>
      <div className="grid">
        {Object.entries(items).map(([key, item]) => (
          <article key={key} className="card">
            <div className="card-icon" aria-hidden="true">
              {itemIcons[key]}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.highlights && (
              <div className="highlight-tags">
                {item.highlights.map((highlight, index) => (
                  <span key={index} className="highlight-tag">
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default SecurityCaseStudy
