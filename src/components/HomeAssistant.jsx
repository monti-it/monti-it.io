import { LuHouse, LuWrench, LuZap } from 'react-icons/lu'
import { SiHomeassistant } from 'react-icons/si'
import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  installation: LuHouse,
  automation: LuZap,
  maintenance: LuWrench
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

export default HomeAssistant
