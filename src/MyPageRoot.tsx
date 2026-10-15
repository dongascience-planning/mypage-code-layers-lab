import App from './App'
import './index.css'

// 마이페이지 전역 스타일(index.css)은 이 경로에서만 불러와 프로모션 페이지와 섞이지 않게 함
export default function MyPageRoot() {
  return <App />
}
