import type { Child } from '../data/mock'
import plusCircle from '../assets/icons/plus-circle.svg'
import EmptyCard from './EmptyCard'
import styles from './ChildrenList.module.css'

type Props = { items: Child[] }

export default function ChildrenList({ items }: Props) {
  if (items.length === 0) {
    return (
      <EmptyCard
        message={
          <>
            자녀를 등록하면 추가 결제 없이
            <br />
            우리 아이도 함께 이용할 수 있어요!
          </>
        }
        cta="자녀 등록하기"
        variant="gradient"
      />
    )
  }

  return (
    <ul className={styles.row}>
      {items.map((child) => (
        <li key={child.id} className={`${styles.card} ${styles[child.tone]}`}>
          <p className={styles.name}>{child.name}</p>
          <p className={styles.status}>{child.status}</p>
        </li>
      ))}
      <li className={`${styles.card} ${styles.add}`}>
        <button className={styles.addBtn}>
          <img src={plusCircle} width={24} height={24} alt="" />
          추가하기
        </button>
      </li>
    </ul>
  )
}
