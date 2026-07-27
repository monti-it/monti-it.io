import { Link } from 'react-router-dom'
import HomeAssistant from './HomeAssistant'

function Domotique() {
  return (
    <div className="page">
      <HomeAssistant />
      <div className="hero-actions">
        <Link className="btn ghost" to="/">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

export default Domotique
