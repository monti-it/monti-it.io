import { Link } from 'react-router-dom'
import { LuBot, LuSearch, LuShieldCheck, LuUsers } from 'react-icons/lu'
import { useLanguage } from '../i18n/useLanguage'

// Keys match expertise.pillars; items are expertise.items keys, in display order.
const pillars = [
  {
    key: 'ai',
    Icon: LuBot,
    items: ['agentic', 'craftsmanship', 'modernisation'],
    highlighted: true
  },
  {
    key: 'security',
    Icon: LuShieldCheck,
    items: ['securite', 'devsecops', 'cicd'],
    highlighted: true
  },
  { key: 'lead', Icon: LuUsers, items: ['leadership', 'coaching', 'agile'] },
  {
    key: 'needs',
    Icon: LuSearch,
    items: ['analyse', 'expression', 'communication']
  }
]

function Improvements() {
  const { t, localizePath } = useLanguage()

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('expertise.eyebrow')}</p>
        <h2>{t('expertise.title')}</h2>
        <p className="muted">{t('expertise.subtitle')}</p>
      </div>
      <div className="pillars">
        {pillars.map((pillar) => {
          const { key, Icon, items, highlighted } = pillar
          return (
            <article
              key={key}
              className={
                highlighted ? 'card pillar pillar-highlighted' : 'card pillar'
              }
            >
              <div className="pillar-header">
                <span className="pillar-badge" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{t(`expertise.pillars.${key}.title`)}</h3>
                  <p className="muted">{t(`expertise.pillars.${key}.pitch`)}</p>
                </div>
              </div>
              <ul className="pillar-items">
                {items.map((itemKey) => (
                  <li key={itemKey}>
                    <Link to={localizePath(`/${itemKey}`)}>
                      <strong>{t(`expertise.items.${itemKey}.title`)}</strong>
                      <span className="muted">
                        {t(`expertise.items.${itemKey}.description`)}
                      </span>
                      <span className="pillar-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Improvements
