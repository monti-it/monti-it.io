import { Link } from 'react-router-dom'
import Improvements from '../components/Improvements'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Expertise() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="expertise" />
      <Improvements />
      <div className="hero-actions">
        <Link className="btn ghost" to={localizePath('/')}>
          {t('common.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default Expertise
