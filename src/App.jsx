import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Expertise from './Expertise'
import Competences from './Competences'
import Reseau from './Reseau'
import Domotique from './Domotique'
import Maintenance from './Maintenance'
import CGS from './CGS'
import Resume from './Resume'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import './App.scss'

function App() {
  useEffect(() => {
    // Titre par défaut
    document.title = 'monti-it.io'
  }, [])

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
