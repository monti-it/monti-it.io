import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Expertise from './pages/Expertise'
import Competences from './pages/Competences'
import Reseau from './pages/Reseau'
import Domotique from './pages/Domotique'
import Maintenance from './pages/Maintenance'
import CGS from './pages/CGS'
import Resume from './pages/Resume'
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/competences" element={<Competences />} />
        <Route path="/reseau" element={<Reseau />} />
        <Route path="/domotique" element={<Domotique />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/cgs" element={<CGS />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
