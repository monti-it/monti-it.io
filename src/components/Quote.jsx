import { useLanguage } from '../i18n/useLanguage'

function Quote() {
  const { t } = useLanguage()

  return (
    <section className="section contrast">
      <div className="section-header">
        <p className="eyebrow">{t('quote.eyebrow')}</p>
        <h2>{t('quote.title')}</h2>
      </div>
      <blockquote>
        {t('quote.text')}
        <span>{t('quote.author')}</span>
      </blockquote>
    </section>
  )
}

export default Quote
