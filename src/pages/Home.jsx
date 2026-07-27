import Header from '../components/Header'
import Quote from '../components/Quote'
import Themes from '../components/Themes'
import Seo from '../components/Seo'

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