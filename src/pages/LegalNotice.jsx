import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'
import { CONTACT_EMAIL } from '../data/contact'
import bannerFr from '../../branding/linkedin-banner-fr.png'
import bannerEn from '../../branding/linkedin-banner-en.png'

const banners = { fr: bannerFr, en: bannerEn }

function LegalNotice() {
  const { t, lang, localizePath } = useLanguage()
  const bindingNote = t('legalNotice.bindingNote')
  const sections = t('legalNotice.sections')

  return (
    <div className="page">
      <Seo seoKey="legalNotice" />
      <section className="section">
        <img
          className="legal-banner"
          src={banners[lang]}
          alt={t('legalNotice.bannerAlt')}
          width="1584"
          height="396"
        />

        <div className="section-header">
          <p className="eyebrow">{t('legalNotice.eyebrow')}</p>
          <h1>{t('legalNotice.title')}</h1>
          {bindingNote && <p className="muted">{bindingNote}</p>}
        </div>

        <div className="grid">
          {Object.entries(sections).map(([key, section]) => (
            <article key={key} className="card">
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.rows &&
                Object.entries(section.rows).map(([rowKey, row]) => (
                  <p key={rowKey}>
                    <span className="muted">{row.label}</span>
                    <br />
                    {rowKey === 'email' ? (
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    ) : (
                      row.value
                    )}
                  </p>
                ))}
            </article>
          ))}
        </div>

        <div className="hero-actions">
          <Link className="btn ghost" to={localizePath('/')}>
            {t('common.backHome')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LegalNotice
