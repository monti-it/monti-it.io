import { describe, it, expect } from 'vitest'
import { translations } from './translations'

// The headlines sell outcomes; AI stays the means, named in the hero lead.
describe('headlines put outcomes first', () => {
  const { fr, en } = translations

  it('titles the hero with the outcome, not AI', () => {
    expect(fr.header.title).toBe(
      'Du logiciel .Net solide et sûr, fait pour durer'
    )
    expect(en.header.title).toBe('Solid, secure .Net software, built to last')
  })

  it('opens the hero lead on quality and keeps the AI-agents sentence', () => {
    expect(fr.header.lead).toMatch(
      /^Votre application \.Net modernisée, sans rien céder sur la qualité : /
    )
    expect(fr.header.lead).toContain(
      'Des agents IA écrivent le code sous ma direction'
    )
    expect(en.header.lead).toMatch(
      /^Your \.Net application modernized with no compromise on quality: /
    )
    expect(en.header.lead).toContain(
      'AI agents write the code under my direction'
    )
  })

  it('drops the speed promise from the hero lead', () => {
    expect(fr.header.lead).not.toContain('plus vite')
    expect(en.header.lead).not.toContain('faster')
  })

  it('ends the hero panel quote on modernizing without sacrificing quality', () => {
    expect(fr.header.panelQuote).toBe(
      "Diagnostic rapide, livraison fiable, code maintenable et sécurisé. J'aide les équipes à moderniser leurs applications sans sacrifier la qualité."
    )
    expect(en.header.panelQuote).toBe(
      'Fast diagnosis, reliable delivery, maintainable and secure code. I help teams modernize their applications without sacrificing quality.'
    )
  })

  it('titles the AppSec theme card "AppSec" and keeps its description', () => {
    expect(fr.themes.items.securite.title).toBe('AppSec')
    expect(en.themes.items.securite.title).toBe('AppSec')
    expect(fr.themes.items.securite.description).toBe(
      'Contrôles de sécurité intégrés au CI/CD, revue de code orientée sécurité, sécurisation des fonctionnalités IA'
    )
    expect(en.themes.items.securite.description).toBe(
      'Security gates built into CI/CD, security-focused code review, securing AI features'
    )
  })

  it('titles the AI pillar "Construire" / "Build" and keeps its pitch', () => {
    expect(fr.expertise.pillars.ai.title).toBe('Construire')
    expect(en.expertise.pillars.ai.title).toBe('Build')
    expect(fr.expertise.pillars.ai.pitch).toBe(
      "Les agents IA écrivent, je cadre, je relis et je garde la main sur l'architecture."
    )
    expect(en.expertise.pillars.ai.pitch).toBe(
      'AI agents write the code; I frame it, review it and keep control of the architecture.'
    )
  })
})
