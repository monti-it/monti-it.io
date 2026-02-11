import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './Home'
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cgs" element={<CGS />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
