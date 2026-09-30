import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaEnvelope,
  FaCode,
  FaHeart
} from 'react-icons/fa'
import { useLanguage } from '../i18n/useLanguage'
import { CONTACT_EMAIL } from '../data/contact'
import logoLockup from '../../branding/logo-lockup.svg'

function Footer() {
  const { t, localizePath } = useLanguage()
  const currentYear = new Date().getFullYear()

  const legalLinks = [
    {
      label: t('footer.legalNotice'),
      href: localizePath('/mentions-legales'),
      internal: true
    },
    { label: t('footer.cgs'), href: localizePath('/cgs'), internal: true },
    { label: t('footer.resume'), href: localizePath('/resume'), internal: true }
  ]

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/christophe-monti-22b97736/',
      icon: FaLinkedin
    },
    {
      label: 'Azure DevOps',
      href: 'https://dev.azure.com/Monti-IT/Monti-IT',
      icon: FaCode
    },
    { label: 'GitHub', href: 'https://github.com/monti-it', icon: FaGithub },
    {
      label: 'Stack Overflow',
      href: 'https://stackoverflow.com/users/1560667/christophe',
      icon: FaStackOverflow
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src={logoLockup}
            alt="Monti IT"
            width="181"
            height="32"
          />
          <p className="muted">{t('footer.tagline')}</p>
        </div>

        <div className="footer-section">
          <p className="footer-section-title">{t('footer.contactTitle')}</p>
          <div className="footer-links">
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <FaEnvelope
                style={{ marginRight: '8px', verticalAlign: 'middle' }}
              />
              {CONTACT_EMAIL}
            </a>
            {socialLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconComponent
                    style={{ marginRight: '8px', verticalAlign: 'middle' }}
                  />
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>

        <div className="footer-section">
          <p className="footer-section-title">{t('footer.legalTitle')}</p>
          <div className="footer-links">
            {legalLinks.map(({ label, href, internal }) =>
              internal ? (
                <Link key={label} to={href}>
                  {label}
                </Link>
              ) : (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {currentYear} Monti IT. This site was{' '}
        <FaCode style={{ verticalAlign: 'middle' }} /> with{' '}
        <FaHeart style={{ verticalAlign: 'middle' }} /> by{' '}
        <a href="https://monti-it.io">monti-it.io</a>. {t('footer.rights')}
      </div>
    </footer>
  )
}

export default Footer
