import { useLanguage } from '../i18n/useLanguage'
import { CONTACT_EMAIL } from '../data/contact'

const stack = [
  '.NET',
  'Angular',
  'React',
  'SQL',
  'Azure DevOps',
  'Docker',
  'Kubernetes',
  'Claude Code'
]

function Header() {
  const { t } = useLanguage()

  return (
    <header className="hero">
      <div className="hero-content">
        <p className="eyebrow">{t('header.eyebrow')}</p>
        <h1>{t('header.title')}</h1>
        <p className="lead">{t('header.lead')}</p>
        <div className="highlight-tags">
          {stack.map((tech) => (
            <span key={tech} className="highlight-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="hero-actions">
          <a className="btn primary" href={`mailto:${CONTACT_EMAIL}`}>
            {t('common.contactCta')}
          </a>
          <a className="btn ghost" href="#themes">
            {t('header.ctaMore')}
          </a>
        </div>
      </div>
      <div className="hero-panel">
        <div className="panel-card">
          <p className="panel-title">{t('header.panelTitle')}</p>
          <p className="panel-quote">{t('header.panelQuote')}</p>
          <p className="panel-author">{t('header.panelAuthor')}</p>
        </div>
      </div>
    </header>
  )
}

export default Header
