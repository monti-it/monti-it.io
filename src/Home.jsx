import Header from './Header'
import Quote from './Quote'
import Skills from './Skills'
import Improvements from './Improvements'
import NetworkSkills from './NetworkSkills'
import ComputerMaintenance from './ComputerMaintenance'

function Home() {
  return (
    <div className="page">
      <Header />
      <Improvements />
      <Quote />
      <Skills />
      <NetworkSkills />
      <ComputerMaintenance />
    </div>
  )
}

export default Home