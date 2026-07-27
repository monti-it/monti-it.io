import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  entreprises: '💼',
  particuliers: '🏠',
  specialises: '🔧'
}

function ComputerMaintenance() {
  const { t } = useLanguage()
  const items = t('maintenance.items')

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('maintenance.eyebrow')}</p>
        <h2>{t('maintenance.title')}</h2>
        <p className="muted">{t('maintenance.subtitle')}</p>
      </div>
      <div className="grid">
        {Object.entries(items).map(([key, service]) => (
          <article key={key} className="card">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>{itemIcons[key]}</div>
            <h3>{service.name}</h3>
            <p style={{ marginBottom: '1rem' }}>{service.description}</p>
            {service.details && (
              <ul className="detail-list">
                {service.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
            {service.highlights && (
              <div className="highlight-tags">
                {service.highlights.map((highlight, index) => (
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

export default ComputerMaintenance
