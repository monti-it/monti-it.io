import { Link } from 'react-router-dom'
import ComputerMaintenance from '../components/ComputerMaintenance'
import Seo from '../components/Seo'

function Maintenance() {
  return (
    <div className="page">
      <Seo
        title="Maintenance & Support informatique"
        description="Maintenance et support informatique pour entreprises, PME et particuliers : dépannage, sauvegarde, sécurisation et accompagnement personnalisé."
        path="/maintenance"
      />
      <ComputerMaintenance />
      <div className="hero-actions">
        <Link className="btn ghost" to="/">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

export default Maintenance
