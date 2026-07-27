import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
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

const pageRoutes = [
  { path: '/', Component: Home },
  { path: '/expertise', Component: Expertise },
  { path: '/competences', Component: Competences },
  { path: '/reseau', Component: Reseau },
  { path: '/domotique', Component: Domotique },
  { path: '/maintenance', Component: Maintenance },
  { path: '/cgs', Component: CGS },
  { path: '/resume', Component: Resume }
]

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <Navbar />
        <Routes>
          {pageRoutes.map((route) => (
            <Route key={`fr-${route.path}`} path={route.path} element={<route.Component />} />
          ))}
          {pageRoutes.map((route) => (
            <Route
              key={`en-${route.path}`}
              path={route.path === '/' ? '/en' : `/en${route.path}`}
              element={<route.Component />}
            />
          ))}
        </Routes>
        <Footer />
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
