import { useLanguage } from '../i18n/useLanguage'

function ExpertiseDetail({ topicKey }) {
  const { t } = useLanguage()
  const practices = t(`${topicKey}.practices`)
  const highlights = t(`${topicKey}.highlights`)

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('expertiseDetail.eyebrow')}</p>
        <h1>{t(`${topicKey}.title`)}</h1>
        <p className="muted">{t(`${topicKey}.subtitle`)}</p>
      </div>
      <p className="lead">{t(`${topicKey}.intro`)}</p>
      <ul className="detail-list">
        {practices.map((practice, index) => (
          <li key={index}>{practice}</li>
        ))}
      </ul>
      <div className="highlight-tags">
        {highlights.map((highlight, index) => (
          <span key={index} className="highlight-tag">{highlight}</span>
        ))}
      </div>
    </section>
  )
}

export default ExpertiseDetail
