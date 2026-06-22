import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx' // eager: the landing page stays instant

// Inner templates are split into their own chunks, fetched on first navigation.
const Equipe = lazy(() => import('./pages/Equipe.jsx'))
const DoctorProfile = lazy(() => import('./pages/DoctorProfile.jsx'))
const ExamDetail = lazy(() => import('./pages/ExamDetail.jsx'))
const Actualites = lazy(() => import('./pages/Actualites.jsx'))
const Article = lazy(() => import('./pages/Article.jsx'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales.jsx'))
const Confidentialite = lazy(() => import('./pages/Confidentialite.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Minimal fallback while a route chunk loads — sized to avoid layout shift,
// calm and on-brand. Reduced-motion users simply see the static cream panel.
function PageFallback() {
  return (
    <div className="min-h-[70vh] grid place-items-center bg-cream" aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement…</span>
      <span className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" aria-hidden="true" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="equipe"
          element={
            <Suspense fallback={<PageFallback />}>
              <Equipe />
            </Suspense>
          }
        />
        <Route
          path="equipe/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <DoctorProfile />
            </Suspense>
          }
        />
        <Route
          path="examens/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <ExamDetail />
            </Suspense>
          }
        />
        <Route
          path="actualites"
          element={
            <Suspense fallback={<PageFallback />}>
              <Actualites />
            </Suspense>
          }
        />
        <Route
          path="actualites/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <Article />
            </Suspense>
          }
        />
        <Route
          path="mentions-legales"
          element={
            <Suspense fallback={<PageFallback />}>
              <MentionsLegales />
            </Suspense>
          }
        />
        <Route
          path="confidentialite"
          element={
            <Suspense fallback={<PageFallback />}>
              <Confidentialite />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
