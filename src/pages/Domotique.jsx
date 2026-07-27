import { Link } from 'react-router-dom'
import HomeAssistant from '../components/HomeAssistant'
import Seo from '../components/Seo'

function Domotique() {
  return (
    <div className="page">
      <Seo
        title="Intégration Home Assistant — Domotique"
        description="Installation, automatisations et maintenance d'une solution domotique open source Home Assistant, sur-mesure et respectueuse de vos données."
        path="/domotique"
      />
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
