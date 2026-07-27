const networkSkills = [
  {
    name: 'Network Bay Setup',
    description: 'Installation et configuration de baies de brassage réseau',
    icon: '🔌',
    details: [
      'Câblage structuré',
      'Configuration switch',
      'Organisation des équipements'
    ]
  }
]

function NetworkSkills() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Infrastructure & Réseau</p>
        <h2>Compétences réseau</h2>
        <p className="muted">
          Installation et configuration d&apos;infrastructures réseau pour petites structures
        </p>
      </div>
      <div className="grid">
        {networkSkills.map((skill) => (
          <article key={skill.name} className="card">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>{skill.icon}</div>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
            {skill.details && (
              <ul className="detail-list" style={{ marginTop: '1rem' }}>
                {skill.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default NetworkSkills
