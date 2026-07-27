import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

function CGS() {
    return (
        <div className="page">
            <Seo
                title="Conditions Générales de Services"
                description="Conditions générales de services de Monti IT."
                path="/cgs"
            />
            <section className="section">
                <div className="section-header">
                    <p className="eyebrow">Informations légales</p>
                    <h1>Conditions Générales de Services</h1>
                </div>

                <div className="pdf-container">
                    <iframe
                        src="/cgs.pdf"
                        title="Conditions Générales de Services"
                        width="100%"
                        height="800px"
                    />  
                </div>

                <div className="hero-actions">
                    <a className="btn primary" href="/cgs.pdf" download target="_blank" rel="noreferrer">
                        Télécharger le PDF
                    </a>
                    <Link className="btn ghost" to="/">
                        ← Retour à l'accueil
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default CGS