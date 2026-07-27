import { useLanguage } from '../i18n/useLanguage'

const skillCategories = [
  {
    categoryKey: 'backend',
    skills: [
      {
        name: 'C#',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
        url: 'https://docs.microsoft.com/en-us/dotnet/csharp/'
      },
      {
        name: '.NET Core',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
        url: 'https://dotnet.microsoft.com/'
      },
      {
        name: 'ASP.NET Core',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
        url: 'https://dotnet.microsoft.com/apps/aspnet'
      },
      {
        name: 'Entity Framework',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
        url: 'https://learn.microsoft.com/en-us/ef/'
      },
      {
        name: 'Web API',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
        url: 'https://dotnet.microsoft.com/apps/aspnet/apis'
      },
      {
        name: 'LINQ',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/linq/'
      }
    ]
  },
  {
    categoryKey: 'frontend',
    skills: [
      {
        name: 'Angular',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
        url: 'https://angular.dev/'
      },
      {
        name: 'React',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        url: 'https://react.dev/'
      },
      {
        name: 'TypeScript',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        url: 'https://www.typescriptlang.org/'
      },
      {
        name: 'JavaScript',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
      },
      {
        name: 'HTML5',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
      },
      {
        name: 'CSS3',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
      }
    ]
  },
  {
    categoryKey: 'database',
    skills: [
      {
        name: 'SQL Server',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
        url: 'https://www.microsoft.com/en-us/sql-server'
      },
      {
        name: 'T-SQL',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
        url: 'https://www.microsoft.com/en-us/sql-server'
      }
    ]
  },
  {
    categoryKey: 'devops',
    skills: [
      {
        name: 'Azure DevOps',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
        url: 'https://azure.microsoft.com/en-us/products/devops'
      },
      {
        name: 'CI/CD',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
        url: 'https://azure.microsoft.com/en-us/products/devops'
      },
      {
        name: 'YAML',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg',
        url: 'https://yaml.org/'
      },
      {
        name: 'Docker',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        url: 'https://www.docker.com/'
      },
      {
        name: 'Kubernetes',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
        url: 'https://kubernetes.io/'
      }
    ]
  },
  {
    categoryKey: 'tools',
    skills: [
      {
        name: 'Git',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        url: 'https://git-scm.com/'
      },
      {
        name: 'Visual Studio',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg',
        url: 'https://visualstudio.microsoft.com/'
      },
      {
        name: 'VS Code',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        url: 'https://code.visualstudio.com/'
      },
      {
        name: 'SonarQube',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg',
        url: 'https://www.sonarsource.com/products/sonarcloud/'
      },
      {
        name: 'NUnit',
        logo: 'https://avatars.githubusercontent.com/u/2678858?s=200&v=4',
        url: 'https://nunit.org/'
      }
    ]
  },
  {
    categoryKey: 'architecture',
    skills: [
      {
        name: 'REST API',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg',
        url: 'https://restfulapi.net/'
      },
      {
        name: 'Microservices',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
        url: 'https://microservices.io/'
      },
      {
        name: 'SOLID',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
        url: 'https://en.wikipedia.org/wiki/SOLID'
      },
      {
        name: 'OpenID Connect',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg',
        url: 'https://openid.net/connect/'
      },
      {
        name: 'OWASP',
        logo: 'https://owasp.org/assets/images/logo.png',
        url: 'https://owasp.org/'
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
                    <h3 className="skill-category-title">{t(`competences.categories.${category.categoryKey}`)}</h3>
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
