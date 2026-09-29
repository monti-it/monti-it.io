import { LuBriefcase, LuHouse, LuSettings2 } from 'react-icons/lu'
import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  entreprises: LuBriefcase,
  particuliers: LuHouse,
  specialises: LuSettings2
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
      <div className="pillars">
        {Object.entries(items).map(([key, service]) => {
          const Icon = itemIcons[key]
          return (
            <article key={key} className="card pillar">
              <div className="pillar-header">
                <span className="pillar-badge" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{service.name}</h3>
                  <p className="muted">{service.description}</p>
                </div>
              </div>
              {service.details && (
                <ul className="pillar-items">
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
          )
        })}
      </div>
    </section>
  )
}

export default ComputerMaintenance
