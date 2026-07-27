import { Link } from 'react-router-dom'
import Improvements from './Improvements'

function Expertise() {
  return (
    <div className="page">
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
