import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  networkBay: '🔌'
}

function NetworkSkills() {
  const { t } = useLanguage()
  const items = t('reseau.items')

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('reseau.eyebrow')}</p>
        <h2>{t('reseau.title')}</h2>
        <p className="muted">{t('reseau.subtitle')}</p>
      </div>
      <div className="grid">
        {Object.entries(items).map(([key, skill]) => (
          <article key={key} className="card card-gradient">
            <div
              className="card-icon"
              style={{ fontSize: '2.5rem' }}
              aria-hidden="true"
            >
              {itemIcons[key]}
            </div>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
            {skill.details && (
              <ul className="detail-list" style={{ marginTop: '1rem' }}>
                {skill.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default NetworkSkills
