import { Link } from 'react-router-dom'
import ComputerMaintenance from './ComputerMaintenance'

function Maintenance() {
  return (
    <div className="page">
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
