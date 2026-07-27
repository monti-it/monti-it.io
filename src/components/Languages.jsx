const languages = [
  {
    name: 'Français',
    level: 'Langue maternelle',
    proficiency: 100,
    flag: '🇫🇷'
  },
  {
    name: 'Anglais',
    level: 'Professionnel / Technique',
    proficiency: 75,
    flag: '🇬🇧'
  }
]

function Languages() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Compétences linguistiques</p>
        <h2>Langues</h2>
        <p className="muted">
          Communication efficace en français et anglais technique
        </p>
      </div>
      <div className="grid centered-grid">
        {languages.map((language) => (
          <article key={language.name} className="card">
            <div className="card-icon" style={{ fontSize: '3rem' }}>{language.flag}</div>
            <h3>{language.name}</h3>
            <p>{language.level}</p>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${language.proficiency}%` }} 
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Languages
