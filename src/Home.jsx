import Header from './Header'
import Quote from './Quote'
import Themes from './Themes'
import Seo from './Seo'

function Home() {
  return (
    <div className="page">
      <Seo
        title="Développeur .NET FullStack Senior Freelance"
        description="Développeur .NET FullStack senior avec 18+ ans d'expérience : architecture logicielle, software craftsmanship, DevOps et accompagnement Agile. Missions ou forfait, remote privilégié."
        path="/"
      />
      <Header />
      <Themes />
      <Quote />
    </div>
  )
}

export default Home