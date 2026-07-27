import { Link } from 'react-router-dom'
import NetworkSkills from './NetworkSkills'

function Reseau() {
  return (
    <div className="page">
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
