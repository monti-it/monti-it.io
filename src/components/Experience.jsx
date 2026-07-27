import { useLanguage } from '../i18n/useLanguage'

const experienceMeta = [
  {
    key: 'clauger',
    company: 'CLAUGER',
    location: 'Brignais (69)',
    project: 'MyClauger3E',
    tech: ['.Net Core 10', 'Angular 16', 'Kubernetes', 'Azure DevOps', 'OWASP', 'OpenID Connect']
  },
  {
    key: 'hcl',
    company: 'HOSPICES CIVILS DE LYON',
    location: 'Lyon (69)',
    project: 'ViaPatient / Mocas',
    tech: ['.Net 4.7', 'ASP.Net MVC', 'Web API', 'Angular JS', 'Azure DevOps']
  },
  {
    key: 'deeplink',
    company: 'DEEPLINK MEDICAL',
    location: 'Lyon (69)',
    project: 'ITIS/MIRIO',
    tech: ['.Net 4.7', 'ASP.Net MVC', 'SQL Server', 'Git', 'OWASP']
  },
  {
    key: 'acsXerox',
    company: 'ACS/XEROX',
    location: 'Guilherand (07)',
    project: 'ATLAS',
    tech: ['.Net 4.5', 'ASP.Net MVC', 'Oracle 11g', 'Git', 'WPF']
  },
  {
    key: 'sncf',
    company: 'SNCF',
    location: 'Lyon (69)',
    project: 'SIERRA',
    tech: ['.Net 3.0', 'C#', 'WCF', 'SQL Server', 'TFS']
  }
]

function Experience() {
  const { t } = useLanguage()
  const items = t('experience.items')

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('experience.eyebrow')}</p>
        <h2>{t('experience.title')}</h2>
        <p className="muted">{t('experience.subtitle')}</p>
      </div>
      <div className="timeline">
        {experienceMeta.map((meta) => {
          const exp = items[meta.key]
          return (
            <article key={meta.key} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-period">{exp.period}</span>
                  <h3>{meta.company}</h3>
                  <p className="timeline-meta">
                    {meta.location} • {exp.sector}
                  </p>
                </div>
                <div className="timeline-body">
                  <h4>{exp.role}</h4>
                  <p className="timeline-project"><strong>{t('experience.projectLabel')}</strong> {meta.project}</p>
                  <p>{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="timeline-achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                  <div className="timeline-tech">
                    {meta.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Experience
