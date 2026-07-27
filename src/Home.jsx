import Header from './Header'
import Quote from './Quote'
import Themes from './Themes'

function Home() {
  return (
    <div className="page">
      <Header />
      <Themes />
      <Quote />
    </div>
  )
}

export default Home