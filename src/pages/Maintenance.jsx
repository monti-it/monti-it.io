import { Link } from 'react-router-dom'
import ComputerMaintenance from '../components/ComputerMaintenance'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Maintenance() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="maintenance" />
      <ComputerMaintenance />
      <div className="hero-actions">
        <Link className="btn ghost" to={localizePath('/')}>
          {t('common.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default Maintenance
