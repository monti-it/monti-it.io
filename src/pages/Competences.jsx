import { Link } from 'react-router-dom'
import Skills from '../components/Skills'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Competences() {
  const { t, localizePath } = useLanguage()

  return (
    <div className="page">
      <Seo seoKey="competences" />
      <Skills />
      <div className="hero-actions">
        <Link className="btn ghost" to={localizePath('/')}>
          {t('common.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default Competences
