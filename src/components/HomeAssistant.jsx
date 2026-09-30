import { SiHomeassistant } from 'react-icons/si'
import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  installation: '🏡',
  automation: '⚡',
  maintenance: '🔧'
}

function HomeAssistant() {
  const { t } = useLanguage()
  const items = t('domotique.items')

  return (
    <section className="section" id="home-assistant">
      <div className="section-header">
        <p className="eyebrow">{t('domotique.eyebrow')}</p>
        <h2>
          <SiHomeassistant
            style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
          />
          {t('domotique.title')}
        </h2>
        <p className="muted">{t('domotique.subtitle')}</p>
      </div>
      <div className="grid">
        {Object.entries(items).map(([key, service]) => (
          <article key={key} className="card card-gradient">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>
              {itemIcons[key]}
            </div>
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

export default HomeAssistant
