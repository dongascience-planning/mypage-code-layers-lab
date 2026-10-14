import type { Subscription } from '../data/mock'
import EmptyCard from './EmptyCard'
import mathCover from '../assets/figma-6953-32421/subscribe-math.png'
import scienceCover from '../assets/figma-6953-32421/subscribe-science.png'
import kidsCover from '../assets/figma-6953-32421/subscribe-kids.png'
import styles from './SubscribeList.module.css'

const COVERS: Record<string, { src: string; action: string; date: string; tone: string }> = {
  math: { src: mathCover, action: '곧 도착해요', date: '2024년 21호', tone: 'soon' },
  sci: { src: scienceCover, action: '재도전', date: '2024년 11호', tone: 'retry' },
  kids: { src: kidsCover, action: '퀴즈 풀기', date: '2024년 21호', tone: 'quiz' },
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
        const cover = COVERS[item.id]
        return (
          <li key={item.id} className={styles.item}>
            <img className={styles.cover} src={cover.src} alt={`${item.name} ${cover.date} 표지`} />
            <div className={styles.bottom}>
              <button className={`${styles.btn} ${styles[cover.tone]}`}>{cover.action}</button>
              <p className={styles.date}>{cover.date}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
