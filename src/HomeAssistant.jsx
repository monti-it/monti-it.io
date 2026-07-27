import { SiHomeassistant } from 'react-icons/si'

const homeAssistantServices = [
  {
    name: 'Installation & Configuration',
    description: 'Mise en place de Home Assistant adaptée à votre logement',
    icon: '🏡',
    details: [
      'Installation sur serveur dédié (Raspberry Pi)',
      'Intégration de vos objets connectés existants',
      'Configuration des automatisations sur-mesure',
      'Mise en place de tableaux de bord personnalisés'
    ],
    highlights: ['Solution open source', 'Données hébergées chez vous']
  },
  {
    name: 'Domotique & Automatisations',
    description: 'Des scénarios pensés pour votre confort et vos économies',
    icon: '⚡',
    details: [
      'Gestion du chauffage et de l’éclairage',
      'Scénarios de présence et de sécurité',
      'Notifications et alertes personnalisées',
      'Pilotage à distance'
    ],
    highlights: ['Confort au quotidien', 'Économies d’énergie']
  },
  {
    name: 'Maintenance & Évolution',
    description: 'Un accompagnement dans la durée pour votre installation',
    icon: '🔧',
    details: [
      'Mises à jour et sauvegardes régulières',
      'Ajout de nouveaux équipements',
      'Diagnostic et résolution d’incidents',
      'Conseil sur le choix de matériel compatible'
    ],
    highlights: ['Suivi personnalisé', 'Support réactif']
  }
]

function HomeAssistant() {
  return (
    <section className="section" id="home-assistant">
      <div className="section-header">
        <p className="eyebrow">Domotique</p>
        <h2>
          <SiHomeassistant style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Intégration Home Assistant
        </h2>
        <p className="muted">
          Je vous accompagne dans la mise en place d&apos;une solution domotique open source,
          fiable et respectueuse de vos données
        </p>
      </div>
      <div className="grid">
        {homeAssistantServices.map((service) => (
          <article key={service.name} className="card">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>{service.icon}</div>
            <h3>{service.name}</h3>
            <p style={{ marginBottom: '1rem' }}>{service.description}</p>
            {service.details && (
              <ul className="detail-list">
                {service.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
            {service.highlights && (
              <div className="highlight-tags">
                {service.highlights.map((highlight, index) => (
                  <span key={index} className="highlight-tag">
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

export default HomeAssistant
