import { Link } from 'react-router-dom'
import Experience from '../components/Experience'
import Languages from '../components/Languages'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function Resume() {
    const { t, localizePath } = useLanguage()

    return (
        <div className="page">
            <Seo seoKey="resume" />
            <Experience />
            <Languages />
            <section className="section">
                <div className="section-header">
                    <p className="eyebrow">{t('resume.eyebrow')}</p>
                    <h1>{t('resume.title')}</h1>
                </div>

                <div className="pdf-container">
                    <iframe
                        src="/resume.pdf"
                        title={t('resume.title')}
                        width="100%"
                        height="800px"
                    />
                </div>

                <div className="hero-actions">
                    <a className="btn primary" href="/resume.pdf" download target="_blank" rel="noreferrer">
                        {t('common.downloadPdf')}
                    </a>
                    <Link className="btn ghost" to={localizePath('/')}>
                        {t('common.backHome')}
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Resume
