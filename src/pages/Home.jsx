import Header from '../components/Header'
import Quote from '../components/Quote'
import Themes from '../components/Themes'
import Seo from '../components/Seo'

function Home() {
  return (
    <div className="page">
      <Seo seoKey="home" />
      <Header />
      <Themes />
      <Quote />
    </div>
  )
}

export default Home
