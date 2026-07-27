import { Link } from 'react-router-dom'
import NetworkSkills from '../components/NetworkSkills'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Reseau() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="reseau" />
      <NetworkSkills />
      <div className="hero-actions">
        <Link className="btn ghost" to={localizePath('/')}>
          {t('common.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default Reseau
