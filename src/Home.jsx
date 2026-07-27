import Header from './Header'
import Quote from './Quote'
import Skills from './Skills'
import Improvements from './Improvements'
import NetworkSkills from './NetworkSkills'
import ComputerMaintenance from './ComputerMaintenance'
import HomeAssistant from './HomeAssistant'

function Home() {
  return (
    <div className="page">
      <Header />
      <Improvements />
      <Quote />
      <Skills />
      <NetworkSkills />
      <HomeAssistant />
      <ComputerMaintenance />
    </div>
  )
}

export default Home