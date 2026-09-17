import { Link } from 'react-router-dom'
import ExpertiseDetail from '../components/ExpertiseDetail'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Analyse() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="analyse" />
      <ExpertiseDetail topicKey="analyse" />
      <div className="hero-actions">
        <Link className="btn ghost" to={localizePath('/')}>
          {t('common.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default Analyse
