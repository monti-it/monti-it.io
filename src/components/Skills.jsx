import { useLanguage } from '../i18n/useLanguage'
import csharpLogo from '../assets/logos/csharp.svg'
import dotnetcoreLogo from '../assets/logos/dotnetcore.svg'
import angularjsLogo from '../assets/logos/angularjs.svg'
import reactLogo from '../assets/logos/react.svg'
import typescriptLogo from '../assets/logos/typescript.svg'
import javascriptLogo from '../assets/logos/javascript.svg'
import html5Logo from '../assets/logos/html5.svg'
import css3Logo from '../assets/logos/css3.svg'
import bootstrapLogo from '../assets/logos/bootstrap.svg'
import microsoftsqlserverLogo from '../assets/logos/microsoftsqlserver.svg'
import postgresqlLogo from '../assets/logos/postgresql.svg'
import azureLogo from '../assets/logos/azure.svg'
import yamlLogo from '../assets/logos/yaml.svg'
import dockerLogo from '../assets/logos/docker.svg'
import kubernetesLogo from '../assets/logos/kubernetes.svg'
import gitLogo from '../assets/logos/git.svg'
import visualstudioLogo from '../assets/logos/visualstudio.svg'
import vscodeLogo from '../assets/logos/vscode.svg'
import sonarqubeLogo from '../assets/logos/sonarqube.svg'
import nunitLogo from '../assets/logos/nunit.png'
import swaggerLogo from '../assets/logos/swagger.svg'
import oauthLogo from '../assets/logos/oauth.svg'
import owaspLogo from '../assets/logos/owasp.svg'
import traefikproxyLogo from '../assets/logos/traefikproxy.svg'
import vaultLogo from '../assets/logos/vault.svg'
import certManagerLogo from '../assets/logos/cert-manager.svg'
import anthropicLogo from '../assets/logos/anthropic.svg'

const skillCategories = [
  {
    categoryKey: 'backend',
    skills: [
      {
        name: 'C#',
        logo: csharpLogo,
        url: 'https://docs.microsoft.com/en-us/dotnet/csharp/'
      },
      {
        name: '.NET Core',
        logo: dotnetcoreLogo,
        url: 'https://dotnet.microsoft.com/'
      },
      {
        name: 'ASP.NET Core',
        logo: dotnetcoreLogo,
        url: 'https://dotnet.microsoft.com/apps/aspnet'
      },
      {
        name: 'Entity Framework',
        logo: dotnetcoreLogo,
        url: 'https://learn.microsoft.com/en-us/ef/'
      },
      {
        name: 'Web API',
        logo: dotnetcoreLogo,
        url: 'https://dotnet.microsoft.com/apps/aspnet/apis'
      },
      {
        name: 'LINQ',
        logo: csharpLogo,
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/linq/'
      }
    ]
  },
  {
    categoryKey: 'frontend',
    skills: [
      {
        name: 'Angular',
        logo: angularjsLogo,
        url: 'https://angular.dev/'
      },
      {
        name: 'React',
        logo: reactLogo,
        url: 'https://react.dev/'
      },
      {
        name: 'TypeScript',
        logo: typescriptLogo,
        url: 'https://www.typescriptlang.org/'
      },
      {
        name: 'JavaScript',
        logo: javascriptLogo,
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
      },
      {
        name: 'HTML5',
        logo: html5Logo,
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
      },
      {
        name: 'CSS3',
        logo: css3Logo,
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
      },
      {
        name: 'Bootstrap',
        logo: bootstrapLogo,
        url: 'https://getbootstrap.com/'
      }
    ]
  },
  {
    categoryKey: 'database',
    skills: [
      {
        name: 'SQL Server',
        logo: microsoftsqlserverLogo,
        url: 'https://www.microsoft.com/en-us/sql-server'
      },
      {
        name: 'T-SQL',
        logo: microsoftsqlserverLogo,
        url: 'https://www.microsoft.com/en-us/sql-server'
      },
      {
        name: 'PostgreSQL',
        logo: postgresqlLogo,
        url: 'https://www.postgresql.org/'
      }
    ]
  },
  {
    categoryKey: 'devops',
    skills: [
      {
        name: 'Azure DevOps',
        logo: azureLogo,
        url: 'https://azure.microsoft.com/en-us/products/devops'
      },
      {
        name: 'CI/CD',
        logo: azureLogo,
        url: 'https://azure.microsoft.com/en-us/products/devops'
      },
      {
        name: 'YAML',
        logo: yamlLogo,
        url: 'https://yaml.org/'
      },
      {
        name: 'Docker',
        logo: dockerLogo,
        url: 'https://www.docker.com/'
      },
      {
        name: 'Kubernetes',
        logo: kubernetesLogo,
        url: 'https://kubernetes.io/'
      }
    ]
  },
  {
    categoryKey: 'tools',
    skills: [
      {
        name: 'Git',
        logo: gitLogo,
        url: 'https://git-scm.com/'
      },
      {
        name: 'Visual Studio',
        logo: visualstudioLogo,
        url: 'https://visualstudio.microsoft.com/'
      },
      {
        name: 'VS Code',
        logo: vscodeLogo,
        url: 'https://code.visualstudio.com/'
      },
      {
        name: 'SonarQube',
        logo: sonarqubeLogo,
        url: 'https://www.sonarsource.com/products/sonarcloud/'
      },
      {
        name: 'NUnit',
        logo: nunitLogo,
        url: 'https://nunit.org/'
      },
      {
        name: 'Claude Code',
        logo: anthropicLogo,
        url: 'https://claude.com/claude-code'
      }
    ]
  },
  {
    categoryKey: 'architecture',
    skills: [
      {
        name: 'REST API',
        logo: swaggerLogo,
        url: 'https://restfulapi.net/'
      },
      {
        name: 'Microservices',
        logo: kubernetesLogo,
        url: 'https://microservices.io/'
      },
      {
        name: 'SOLID',
        logo: csharpLogo,
        url: 'https://en.wikipedia.org/wiki/SOLID'
      }
    ]
  },
  {
    categoryKey: 'securite',
    skills: [
      {
        name: 'OWASP Top 10',
        logo: owaspLogo,
        url: 'https://owasp.org/www-project-top-ten/'
      },
      {
        name: 'OpenID Connect / OAuth2',
        logo: oauthLogo,
        url: 'https://openid.net/connect/'
      },
      {
        name: 'JWT',
        logo: oauthLogo,
        url: 'https://jwt.io/'
      },
      {
        name: 'SSO & Forward Auth',
        logo: traefikproxyLogo,
        url: 'https://doc.traefik.io/traefik/middlewares/http/forwardauth/'
      },
      {
        name: 'RBAC Design',
        logo: oauthLogo,
        url: 'https://en.wikipedia.org/wiki/Role-based_access_control'
      },
      {
        name: 'Secrets Management',
        logo: vaultLogo,
        url: 'https://www.vaultproject.io/'
      },
      {
        name: 'Container & Kubernetes Hardening',
        logo: kubernetesLogo,
        url: 'https://kubernetes.io/docs/concepts/security/'
      },
      {
        name: 'TLS & cert-manager',
        logo: certManagerLogo,
        url: 'https://cert-manager.io/'
      }
    ]
  }
]

function Skills() {
  const { t } = useLanguage()

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">{t('competences.eyebrow')}</p>
        <h2>{t('competences.title')}</h2>
        <p className="muted">{t('competences.subtitle')}</p>
      </div>
      {skillCategories.map((category) => (
        <div key={category.categoryKey} className="skill-category">
          <h3 className="skill-category-title">
            {t(`competences.categories.${category.categoryKey}`)}
          </h3>
          <div className="skills">
            {category.skills.map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noreferrer"
                className="skill-item"
              >
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
                <span>{skill.name}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Skills
