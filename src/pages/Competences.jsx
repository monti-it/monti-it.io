import { Link } from 'react-router-dom'
import Skills from '../components/Skills'
import Seo from '../components/Seo'

function Competences() {
  return (
    <div className="page">
      <Seo
        title="Compétences techniques — .NET, Angular, React, Azure DevOps"
        description="Stack technique complète : C#, .NET Core, Angular, React, TypeScript, SQL Server, Azure DevOps, Docker, Kubernetes et bonnes pratiques de sécurité."
        path="/competences"
      />
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
