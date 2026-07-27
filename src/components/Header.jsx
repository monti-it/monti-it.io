function Header() {
  return (
    <header className="hero">
      <div className="hero-content">
        <p className="eyebrow">Besoin de compléter vos outils web</p>
        <h1>.Net Core, Angular, React, SQL, YAML...</h1>
        <p className="lead">
          Développeur .Net FullStack senior avec plus de 18 ans d&apos;expérience, spécialisé dans
          la conception et la modernisation d&apos;architectures logicielles robustes dans des secteurs
          variés (froid industriel, télémédecine, transport, logistique), avec une approche software
          craftsmanship (code propre, testé, maintenable) et des méthodologies Agile.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="mailto:hello@monti-it.io">
            Contactez moi
          </a>
          <a className="btn ghost" href="#themes">
            En savoir plus
          </a>
        </div>
      </div>
      <div className="hero-panel">
        <div className="panel-card">
          <p className="panel-title">Expertise & impact</p>
          <p className="panel-quote">
            Diagnostic rapide, livraison fiable et code maintenable. J’aide les
            équipes à accélérer sans sacrifier la qualité.
          </p>
          <p className="panel-author">Missions courtes ou longues, ou projets au forfait • Travail en remote privilégié</p>
        </div>
      </div>
    </header>
  )
}

export default Header
