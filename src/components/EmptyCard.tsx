import type { ReactNode } from 'react'
import styles from './EmptyCard.module.css'

type Props = {
  message: ReactNode
  cta: string
  variant: 'outlineDark' | 'outlinePink' | 'outlinePurple' | 'gradient'
  /** 정기구독 빈 상태는 회색 배경·그림자 없음 */
  surface?: 'white' | 'gray'
  illustration?: ReactNode
  /** 버튼 폭: fixed=200px, auto=내용 길이 */
  ctaWidth?: 'fixed' | 'auto'
  gap?: number
}

export default function EmptyCard({
  message,
  cta,
  variant,
  surface = 'white',
  illustration,
  ctaWidth = 'fixed',
  gap = 16,
}: Props) {
  return (
    <div className={`${styles.card} ${styles[surface]}`} style={{ gap }}>
      <div className={styles.body}>
        {illustration}
        <p className={`${styles.message} ${surface === 'gray' ? styles.messagePlain : ''}`}>{message}</p>
      </div>
      <button className={`${styles.cta} ${styles[variant]} ${ctaWidth === 'fixed' ? styles.fixed : styles.auto}`}>
        {cta}
      </button>
    </div>
  )
}
