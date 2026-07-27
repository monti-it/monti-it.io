const improvementItems = [
  {
    title: 'LEADERSHIP TECHNIQUE',
    description: 'Pilotage d\'équipe, architecture et référent technique',
    icon: '👥'
  },
  {
    title: 'ANALYSE & RÉSOLUTION',
    description: 'Analyse approfondie et résolution de problèmes complexes',
    icon: '🔍'
  },
  {
    title: 'COMMUNICATION',
    description: 'Vulgarisation technique et collaboration efficace',
    icon: '💬'
  },
  {
    title: 'CI/CD & DEVOPS',
    description: 'Automatisation complète des processus de livraison',
    icon: '⚙️'
  },
  {
    title: 'SOFTWARE CRAFTSMANSHIP',
    description: 'Code propre, testé et évolutif : principes SOLID, KISS, TDD et refactoring continu',
    icon: '✨'
  },
  {
    title: "EXPRESSION DU BESOIN",
    description: "Formaliser le besoin afin de structurer l'organisation de l'équipe",
    icon: '📝'
  },
  {
    title: 'MÉTHODES AGILE',
    description: 'Scrum, facilitation et amélioration continue',
    icon: '🔄'
  },
  {
    title: 'COACHING TECHNIQUE',
    description: 'Montée en compétences et accompagnement des équipes',
    icon: '🎓'
  },
  {
    title: 'MODERNISATION',
    description: 'Migration et refactoring d\'architectures legacy',
    icon: '🚀'
  },
  {
    title: 'SÉCURITÉ',
    description: 'Intégration OWASP et bonnes pratiques de sécurité',
    icon: '🔒'
  }
]

function Improvements() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Que puis-je vous apporter ?</p>
        <h2>De l&apos;amélioration continue</h2>
        <p className="muted">
          Accompagnement technique complet pour transformer vos défis en solutions robustes et pérennes
        </p>
      </div>
      <div className="grid">
        {improvementItems.map((item) => (
          <article key={item.title} className="card">
            <div className="card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Improvements
