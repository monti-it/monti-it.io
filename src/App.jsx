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
import Leadership from './pages/Leadership'
import Analyse from './pages/Analyse'
import Communication from './pages/Communication'
import Cicd from './pages/Cicd'
import Craftsmanship from './pages/Craftsmanship'
import Expression from './pages/Expression'
import Agile from './pages/Agile'
import Coaching from './pages/Coaching'
import Modernisation from './pages/Modernisation'
import Securite from './pages/Securite'
import Devsecops from './pages/Devsecops'
import Agentic from './pages/Agentic'
import './App.scss'

const pageRoutes = [
  { path: '/', Component: Home },
  { path: '/expertise', Component: Expertise },
  { path: '/competences', Component: Competences },
  { path: '/reseau', Component: Reseau },
  { path: '/domotique', Component: Domotique },
  { path: '/maintenance', Component: Maintenance },
  { path: '/cgs', Component: CGS },
  { path: '/resume', Component: Resume },
  { path: '/leadership', Component: Leadership },
  { path: '/analyse', Component: Analyse },
  { path: '/communication', Component: Communication },
  { path: '/cicd', Component: Cicd },
  { path: '/craftsmanship', Component: Craftsmanship },
  { path: '/expression', Component: Expression },
  { path: '/agile', Component: Agile },
  { path: '/coaching', Component: Coaching },
  { path: '/modernisation', Component: Modernisation },
  { path: '/securite', Component: Securite },
  { path: '/devsecops', Component: Devsecops },
  { path: '/agentic', Component: Agentic }
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
