import { useState } from 'react'
import chevronUp from '../assets/icons/chevron-up-14.svg'
import escrow from '../assets/images/escrow.png'
import styles from './Footer.module.css'

const MENU = ['회사소개', '저작권 · 콘텐츠 이용안내', '개인정보 처리방침', '광고안내', '고객센터', '입점신청']

// 사업자 정보는 전부 더미 값
export default function Footer() {
  const [open, setOpen] = useState(true)
  return (
    <footer className={styles.wrap}>
      <div className={styles.footer}>
        <ul className={styles.menu}>
          {MENU.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <div className={styles.biz}>
          <p className={styles.bizName}>(주)샘플컴퍼니 샘플스토어</p>
          <button className={styles.toggle} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            사업자정보
            <img src={chevronUp} width={14} height={14} alt="" className={open ? undefined : styles.flip} />
          </button>
          {open && (
            <div className={styles.info}>
              <p>
                대표 : 홍대표 <i>|</i> 개인정보관리책임자 : 김담당 <i>|</i> 청소년보호책임자 : 이담당 (00000) 서울시 샘플구 샘플로 1
              </p>
              <p>
                문의 : 00-0000-0000 <i>|</i> 팩스 : 00-0000-0000
              </p>
              <p>
                사업자등록번호 : 000-00-00000 <i>|</i> 통신판매업신고번호 : 제0000-서울샘플-00000호
              </p>
              <p>온라인 결제를 위한 PG사의 구매안전서비스(가입사실 확인)</p>
            </div>
          )}
        </div>
        <p className={styles.copy}>Copyright © Sample Company. All right reserved.</p>
        <img src={escrow} width={80} height={80} alt="구매안전서비스 안전결제" />
      </div>
    </footer>
  )
}
