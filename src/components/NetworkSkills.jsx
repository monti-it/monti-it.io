import { LuNetwork } from 'react-icons/lu'
import { useLanguage } from '../i18n/useLanguage'

const itemIcons = {
  networkBay: LuNetwork
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
      <div className="pillars">
        {Object.entries(items).map(([key, skill]) => {
          const Icon = itemIcons[key]
          return (
            <article key={key} className="card pillar">
              <div className="pillar-header">
                <span className="pillar-badge" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{skill.name}</h3>
                  <p className="muted">{skill.description}</p>
                </div>
              </div>
              {skill.details && (
                <ul className="pillar-items">
                  {skill.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default NetworkSkills
