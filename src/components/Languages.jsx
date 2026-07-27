import { useLanguage } from '../i18n/useLanguage'
import { FlagFR, FlagGB } from './FlagIcon'

const languageMeta = [
  { key: 'french', proficiency: 100, Flag: FlagFR },
  { key: 'english', proficiency: 75, Flag: FlagGB }
]

function Languages() {
  const { t } = useLanguage()
  const items = t('languages.items')

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('languages.eyebrow')}</p>
        <h2>{t('languages.title')}</h2>
        <p className="muted">{t('languages.subtitle')}</p>
      </div>
      <div className="grid centered-grid">
        {languageMeta.map((meta) => (
          <article key={meta.key} className="card">
            <div className="card-icon">
              <meta.Flag className="card-flag" />
            </div>
            <h3>{items[meta.key].name}</h3>
            <p>{items[meta.key].level}</p>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${meta.proficiency}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Languages
