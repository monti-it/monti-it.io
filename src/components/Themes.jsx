import { Link } from 'react-router-dom'

const themes = [
  {
    title: 'Expertise & Leadership technique',
    description: 'Pilotage d\'équipe, software craftsmanship, DevOps, sécurité et méthodes Agile',
    icon: '🧭',
    to: '/expertise'
  },
  {
    title: 'Stack technique complète',
    description: '.NET, Angular, React, bases de données, cloud et outils DevOps',
    icon: '🧰',
    to: '/competences'
  },
  {
    title: 'Réseau & Infrastructure',
    description: 'Câblage structuré et configuration réseau pour petites structures',
    icon: '🔌',
    to: '/reseau'
  },
  {
    title: 'Domotique — Home Assistant',
    description: 'Installation, automatisations et maintenance de votre solution domotique',
    icon: '🏡',
    to: '/domotique'
  },
  {
    title: 'Maintenance & Support informatique',
    description: 'Entreprises, particuliers et interventions spécialisées',
    icon: '🔧',
    to: '/maintenance'
  }
]

function Themes() {
  return (
    <section id="themes" className="section">
      <div className="section-header">
        <p className="eyebrow">Que puis-je vous apporter ?</p>
        <h2>Un accompagnement par thématique</h2>
        <p className="muted">
          Chaque domaine d&apos;intervention est détaillé sur sa propre page
        </p>
      </div>
      <div className="grid">
        {themes.map((theme) => (
          <article key={theme.title} className="card">
            <div className="card-icon">{theme.icon}</div>
            <h3>{theme.title}</h3>
            <p>{theme.description}</p>
            <Link className="card-link" to={theme.to}>
              Découvrir →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Themes
