import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/useLanguage'

function CGS() {
    const { t, localizePath } = useLanguage()
    const note = t('cgs.note')

    return (
        <div className="page">
            <Seo seoKey="cgs" />
            <section className="section">
                <div className="section-header">
                    <p className="eyebrow">{t('cgs.eyebrow')}</p>
                    <h1>{t('cgs.title')}</h1>
                    {note && <p className="muted">{note}</p>}
                </div>

                <div className="pdf-container">
                    <iframe
                        src="/cgs.pdf"
                        title={t('cgs.title')}
                        width="100%"
                        height="800px"
                    />
                </div>

                <div className="hero-actions">
                    <a className="btn primary" href="/cgs.pdf" download target="_blank" rel="noreferrer">
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

export default CGS
