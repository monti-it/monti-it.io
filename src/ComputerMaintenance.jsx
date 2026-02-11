const maintenanceServices = [
  {
    name: 'Entreprises & PME',
    description: 'Je vous accompagne dans la gestion de votre infrastructure',
    icon: '💼',
    details: [
      'Gestion et suivi de votre parc informatique',
      'Installation et configuration de postes de travail',
      'Diagnostic et résolution rapide de vos incidents',
      'Optimisation et mise à niveau de vos systèmes',
      'Support et formation de vos utilisateurs',
      'Sécurisation et sauvegarde de vos données'
    ],
    highlights: ['Sur site ou à distance', 'Réactivité garantie']
  },
  {
    name: 'Particuliers',
    description: 'Assistance personnalisée à votre domicile ou en atelier',
    icon: '🏠',
    details: [
      'Dépannage de votre matériel et logiciels',
      'Récupération de vos données importantes',
      'Installation et configuration',
      'Nettoyage, désinfection et optimisation',
      'Montage et upgrade de votre PC',
      'Conseil et accompagnement adapté à vos besoins'
    ],
    highlights: ['Déplacement à domicile', 'Sans surprise']
  },
  {
    name: 'Services Spécialisés',
    description: 'Mon expertise technique pour vos besoins spécifiques',
    icon: '🔧',
    details: [
      'Mise en place de solutions de sauvegarde',
      'Configuration de réseaux',
      'Migration de données et transfert de systèmes',
      'Conseil personnalisé en achat de matériel',
      'Formation et accompagnement numérique',
      'Audit et recommandations sur-mesure'
    ],
    highlights: ['Approche personnalisée', 'Conseils indépendants']
  }
]

function ComputerMaintenance() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Services complémentaires</p>
        <h2>Maintenance & Support Informatique</h2>
        <p className="muted">
          De l&apos;intervention ponctuelle à l&apos;accompagnement régulier, 
          je mets mon expertise technique au service de votre infrastructure
        </p>
      </div>
      <div className="grid">
        {maintenanceServices.map((service) => (
          <article key={service.name} className="card">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>{service.icon}</div>
            <h3>{service.name}</h3>
            <p style={{ marginBottom: '1rem' }}>{service.description}</p>
            {service.details && (
              <ul style={{ 
                marginTop: '0.5rem', 
                paddingLeft: '1.5rem',
                color: '#475569',
                fontSize: '0.9rem',
                lineHeight: '1.8'
              }}>
                {service.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
            {service.highlights && (
              <div style={{ 
                marginTop: '1.25rem', 
                display: 'flex', 
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {service.highlights.map((highlight, index) => (
                  <span 
                    key={index} 
                    style={{
                      background: '#e0f2fe',
                      color: '#0369a1',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ComputerMaintenance
