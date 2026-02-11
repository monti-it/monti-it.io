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
      <div className="grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {languages.map((language) => (
          <article key={language.name} className="card">
            <div className="card-icon" style={{ fontSize: '3rem' }}>{language.flag}</div>
            <h3>{language.name}</h3>
            <p>{language.level}</p>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e0e0e0', 
              borderRadius: '4px',
              marginTop: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${language.proficiency}%`, 
                height: '100%', 
                backgroundColor: '#007acc',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Languages
