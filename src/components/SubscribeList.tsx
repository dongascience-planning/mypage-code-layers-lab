import type { Subscription } from '../data/mock'
import EmptyCard from './EmptyCard'
import logoMathKids from '../assets/images/logo-math-kids.png'
import logoScience from '../assets/images/logo-science.png'
import logoKidsScience from '../assets/images/logo-kids-science.png'
import styles from './SubscribeList.module.css'

// 잡지별 로고와 썸네일 안 간격 (Figma Thumb 프레임 기준)
const LOGOS: Record<string, { src: string; width: number; height: number; gap: number }> = {
  math: { src: logoMathKids, width: 52, height: 47.5, gap: 5 },
  sci: { src: logoScience, width: 68, height: 44, gap: 7 },
  kids: { src: logoKidsScience, width: 42, height: 46, gap: 7 },
}

type Props = { items: Subscription[] }

export default function SubscribeList({ items }: Props) {
  if (items.length === 0) {
    return (
      <EmptyCard
        surface="gray"
        gap={20}
        message="구독 중인 상품이 없어요.😢"
        cta="정기구독 상품 보러가기"
        variant="outlineDark"
      />
    )
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const logo = LOGOS[item.id]
        return (
        <li key={item.id} className={styles.item}>
          <div className={styles.thumb} style={{ gap: logo.gap }}>
            <img src={logo.src} width={logo.width} height={logo.height} alt={item.name} />
            <p className={styles.slogan}>
              {item.slogan[0]}
              <br />
              {item.slogan[1]}
            </p>
          </div>
          <button className={styles.btn}>자세히 보기</button>
        </li>
        )
      })}
    </ul>
  )
}
