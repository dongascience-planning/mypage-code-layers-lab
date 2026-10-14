import type { Worksheet } from '../data/mock'
import newPink from '../assets/icons/new-pink.svg'
import newPurple from '../assets/icons/new-purple.svg'
import EmptyCard from './EmptyCard'
import literacyArt from '../assets/figma-mobile/empty-literacy.png'
import bookmarkArt from '../assets/figma-mobile/empty-bookmark.svg'
import styles from './WorksheetList.module.css'

type Props = {
  items: Worksheet[]
  accent: 'pink' | 'purple'
  emptyCta: string
}

export default function WorksheetList({ items, accent, emptyCta }: Props) {
  if (items.length === 0) {
    return (
      <EmptyCard
        gap={accent === 'pink' ? 16 : 12}
        illustration={<img src={accent === 'pink' ? literacyArt : bookmarkArt} width={80} height={64} alt="" />}
        message="이용 가능한 워크지가 없어요."
        cta={emptyCta}
        variant={accent === 'pink' ? 'outlinePink' : 'outlinePurple'}
        ctaWidth={accent === 'pink' ? 'fixed' : 'auto'}
      />
    )
  }

  return (
    <ul className={styles.card}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.text}>
            <p className={styles.title}>
              {item.title}
              {item.isNew && <img src={accent === 'pink' ? newPink : newPurple} width={16} height={16} alt="새 워크지" />}
            </p>
            <p className={styles.magazine}>{item.magazine}</p>
          </div>
          <a href="#" className={`${styles.go} ${styles[accent]}`}>보러가기</a>
        </li>
      ))}
    </ul>
  )
}
