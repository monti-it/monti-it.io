import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaStackOverflow, FaEnvelope, FaCode, FaHeart } from 'react-icons/fa'

function Footer() {
    const currentYear = new Date().getFullYear()

    const legalLinks = [
        { label: 'Conditions Générales de Services', href: '/cgs', internal: true },
        { label: 'Résumé de carrière', href: '/resume', internal: true }
    ]

    const socialLinks = [
        { label: 'GitHub', href: 'https://github.com/fw508', icon: FaGithub },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christophe-monti-22b97736/', icon: FaLinkedin },
        { label: 'Stack Overflow', href: 'https://stackoverflow.com/users/1560667/christophe', icon: FaStackOverflow }
    ]

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <p className="footer-title">Monti IT</p>
                    <p className="muted">Développement logiciel sur-mesure depuis 2005</p>
                </div>

                <div className="footer-section">
                    <p className="footer-section-title">Contact & Réseaux</p>
                    <div className="footer-links">
                        <a href="mailto:hello@monti-it.io">
                            <FaEnvelope style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            hello@monti-it.io
                        </a>
                        {socialLinks.map((link) => {
                            const IconComponent = link.icon
                            return (
                                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                                    <IconComponent style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    {link.label}
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="footer-section">
                    <p className="footer-section-title">Légal</p>
                    <div className="footer-links">
                        {legalLinks.map(({ label, href, internal }) =>
                            internal ? (
                                <Link key={label} to={href}>{label}</Link>
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
                © {currentYear} Monti IT.
                This site was <FaCode style={{ verticalAlign: 'middle' }} /> with <FaHeart style={{ verticalAlign: 'middle' }} /> by <a href="https://monti-it.io">monti-it.io</a>.
                All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
