import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { CookieBanner } from '../common/CookieBanner'
import { ScrollToTop } from '../common/ScrollToTop'

function PageLoader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 16 }}>
      <div className="fg-loader" />
      <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6B7280' }}>
        Fagou
      </span>
    </div>
  )
}

export function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <ScrollToTop />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
