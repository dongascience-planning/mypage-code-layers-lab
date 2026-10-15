import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

// /promotion → 정기구독 프로모션 랜딩(Tailwind), 그 외 → 마이페이지(CSS Modules)
const isPromotion = window.location.pathname.replace(/\/+$/, '') === '/promotion'
const Page = lazy(() => (isPromotion ? import('./promotion/App') : import('./MyPageRoot')))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  </StrictMode>,
)
