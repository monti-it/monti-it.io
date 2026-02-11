import { Link } from 'react-router-dom'
import Experience from './Experience'
import Languages from './Languages'

function Resume() {
    return (
        <div className="page">
            <Experience />
            <Languages />
            <section className="section">
                <div className="section-header">
                    <p className="eyebrow">Parcours professionnel</p>
                    <h1>Résumé de carrière</h1>
                </div>

                <div className="pdf-container">
                    <iframe
                        src="/resume.pdf"
                        title="Résumé de carrière"
                        width="100%"
                        height="800px"
                    />
                </div>

                <div className="hero-actions">
                    <a className="btn primary" href="/resume.pdf" download target="_blank" rel="noreferrer">
                        Télécharger le PDF
                    </a>
                    <Link className="btn ghost" to="/">
                        Retour à l'accueil
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Resume