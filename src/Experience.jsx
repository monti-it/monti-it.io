const experiences = [
  {
    period: 'Depuis 2022',
    company: 'CLAUGER',
    location: 'Brignais (69)',
    sector: 'Froid industriel',
    role: 'Ingénieur d\'études - Indépendant',
    project: 'MyClauger3E',
    description: 'Modernisation d\'une plateforme industrielle stratégique, mise en place CI/CD sous Azure DevOps, amélioration de la qualité logicielle et de la sécurité.',
    achievements: [
      'Augmentation du volet DataViz',
      'Déploiements automatisés',
      'Réduction de la dette technique'
    ],
    tech: ['.Net Core 10', 'Angular 16', 'Kubernetes', 'Azure DevOps', 'OWASP', 'OpenID Connect']
  },
  {
    period: '2020 - 2022',
    company: 'HOSPICES CIVILS DE LYON',
    location: 'Lyon (69)',
    sector: 'Télémédecine',
    role: 'Ingénieur d\'études - ECONOCOM',
    project: 'ViaPatient / Mocas',
    description: 'Maintenance évolutive des applications et amélioration de l\'architecture. Référent technique avec intégration de 5 modules de la suite Easily.',
    achievements: [
      'Mise en place de l\'intégration continue',
      'Harmonisation des process',
      'Architecture évolutive (log, cache, IOC)'
    ],
    tech: ['.Net 4.7', 'ASP.Net MVC', 'Web API', 'Angular JS', 'Azure DevOps']
  },
  {
    period: '2016 - 2019',
    company: 'DEEPLINK MEDICAL',
    location: 'Lyon (69)',
    sector: 'Télémédecine',
    role: 'Ingénieur d\'études',
    project: 'ITIS/MIRIO',
    description: 'Développement de fonctionnalités critiques dans un environnement HDS autour du métier de la téléradiologie urgentiste de nuit.',
    achievements: [
      'Mise en place d\'outils transverses (DMS, Audit trail, i18n)',
      'Optimisation des performances',
      'Meilleure réponse médicale apportée'
    ],
    tech: ['.Net 4.7', 'ASP.Net MVC', 'SQL Server', 'Git', 'OWASP']
  },
  {
    period: '2013 - 2016',
    company: 'ACS/XEROX',
    location: 'Guilherand (07)',
    sector: 'Transport public',
    role: 'Chef d\'équipe / Ingénieur d\'études - OBJECT DIRECT',
    project: 'ATLAS',
    description: 'Gestion d\'une équipe de 4 développeurs en méthode Agile pour un site web de vente à distance en télébilletique.',
    achievements: [
      'Gestion d\'équipe de 4 développeurs',
      'Architecture évolutive multi-clients',
      'Déploiement e-commerce'
    ],
    tech: ['.Net 4.5', 'ASP.Net MVC', 'Oracle 11g', 'Git', 'WPF']
  },
  {
    period: '2010 - 2011',
    company: 'SNCF',
    location: 'Lyon (69)',
    sector: 'Trafic ferroviaire',
    role: 'Chef d\'équipe / Architecte - SOGETI',
    project: 'SIERRA',
    description: 'Gestion d\'une équipe de 5 développeurs pour l\'application gérant les différentes lignes ouvertes et la maintenance des trains.',
    achievements: [
      'Gestion d\'équipe de 5 développeurs',
      'Architecture n-tiers',
      'Amélioration de la planification ferroviaire'
    ],
    tech: ['.Net 3.0', 'C#', 'WCF', 'SQL Server', 'TFS']
  },
  {
    period: '2007 - 2010',
    company: 'SNCF',
    location: 'Villeurbanne (69)',
    sector: 'Trafic ferroviaire',
    role: 'Concepteur / Développeur - SOGETI',
    project: 'SIERRA',
    description: 'Développement de l\'application gérant les différentes lignes et la maintenance des trains TER et CORAIL.',
    achievements: [
      'Développement architecture n-tiers',
      'Intégration de flux complexes',
      'Optimisation des calculs de trajet'
    ],
    tech: ['.Net 3.0', 'C#', 'WCF', 'SQL Server', 'TFS']
  }
]

function Experience() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Parcours professionnel</p>
        <h2>Expériences notables</h2>
        <p className="muted">
          Plus de 18 ans d&apos;expérience dans des projets complexes et variés
        </p>
      </div>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <article key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-period">{exp.period}</span>
                <h3>{exp.company}</h3>
                <p className="timeline-meta">
                  {exp.location} • {exp.sector}
                </p>
              </div>
              <div className="timeline-body">
                <h4>{exp.role}</h4>
                <p className="timeline-project"><strong>Projet:</strong> {exp.project}</p>
                <p>{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="timeline-achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
                <div className="timeline-tech">
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
