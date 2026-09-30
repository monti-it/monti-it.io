import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function NotFound() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="notFound" noindex />
      <section className="section">
        <div className="section-header">
          <p className="eyebrow">{t('notFound.eyebrow')}</p>
          <h1>{t('notFound.title')}</h1>
          <p className="muted">{t('notFound.lead')}</p>
        </div>

        <div className="hero-actions">
          <Link className="btn primary" to={localizePath('/')}>
            {t('common.backHome')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default NotFound
