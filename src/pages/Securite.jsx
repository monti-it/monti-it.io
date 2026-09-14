import { Link } from 'react-router-dom'
import SecurityCaseStudy from '../components/SecurityCaseStudy'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Securite() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="securite" />
      <SecurityCaseStudy />
      <div className="hero-actions">
        <Link className="btn ghost" to={localizePath('/')}>
          {t('common.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default Securite
