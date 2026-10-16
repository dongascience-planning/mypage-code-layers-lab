import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

// /promotion → 정기구독 프로모션 랜딩(Tailwind), 그 외 → 마이페이지(CSS Modules)
// 배포 위치(BASE_URL, 예: GitHub Pages의 /mypage-code-layers-lab/)를 뺀 경로로 판단
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const path = window.location.pathname.slice(base.length).replace(/\/+$/, '')
const isPromotion = path === '/promotion'
// 두 페이지를 따로 lazy 선언해야 배포 빌드에서 각 페이지의 CSS가 제대로 붙음
// (한 lazy 안에서 삼항으로 고르면 Vite가 한쪽 CSS만 미리 불러옴)
const PromotionPage = lazy(() => import('./promotion/App'))
const MyPage = lazy(() => import('./MyPageRoot'))
const Page = isPromotion ? PromotionPage : MyPage

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  </StrictMode>,
)
