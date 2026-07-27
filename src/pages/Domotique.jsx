import { Link } from 'react-router-dom'
import HomeAssistant from '../components/HomeAssistant'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Domotique() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="domotique" />
      <HomeAssistant />
      <div className="hero-actions">
        <Link className="btn ghost" to={localizePath('/')}>
          {t('common.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default Domotique
