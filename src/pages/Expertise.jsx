import { Link } from 'react-router-dom'
import Improvements from '../components/Improvements'
import Seo from '../components/Seo'

function Expertise() {
  return (
    <div className="page">
      <Seo
        title="Expertise & Leadership technique"
        description="Pilotage d'équipe, software craftsmanship, CI/CD, sécurité et méthodes Agile : l'accompagnement technique complet d'un développeur senior freelance."
        path="/expertise"
      />
      <Improvements />
      <div className="hero-actions">
        <Link className="btn ghost" to="/">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

export default Expertise
