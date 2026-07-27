import { Link } from 'react-router-dom'
import NetworkSkills from '../components/NetworkSkills'
import Seo from '../components/Seo'

function Reseau() {
  return (
    <div className="page">
      <Seo
        title="Réseau & Infrastructure"
        description="Installation et configuration de baies de brassage, câblage structuré et réseaux pour petites structures."
        path="/reseau"
      />
      <NetworkSkills />
      <div className="hero-actions">
        <Link className="btn ghost" to="/">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

export default Reseau
