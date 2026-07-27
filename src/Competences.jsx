import { Link } from 'react-router-dom'
import Skills from './Skills'

function Competences() {
  return (
    <div className="page">
      <Skills />
      <div className="hero-actions">
        <Link className="btn ghost" to="/">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

export default Competences
