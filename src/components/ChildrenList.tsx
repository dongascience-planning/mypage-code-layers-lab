import type { Child } from '../data/mock'
import plusCircle from '../assets/icons/plus-circle.svg'
import chevronRight from '../assets/icons/chevron-right-14.svg'
import reportIcon from '../assets/figma-6953-32421/file-report.svg'
import openBadgeIcon from '../assets/figma-6953-32421/open-badge.svg'
import silverBadge from '../assets/figma-6953-32421/profile-silver.png'
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
      {items.map((child, index) => (
        <li key={child.id} className={`${styles.card} ${styles[child.tone]}`}>
          <div className={styles.childName}>
            <p className={styles.name}>{child.name}</p>
            <img src={silverBadge} width={28} height={28} alt="실버 등급" />
          </div>
          <div className={styles.links}>
            <button className={styles.childLink}>
              {index === 0 && <span className={styles.newBadge}>N</span>}
              <img src={reportIcon} width={16} height={16} alt="" />
              리포트({index === 0 ? '1/4' : '3/4'})
              <img src={chevronRight} width={12} height={12} alt="" />
            </button>
            <button className={styles.childLink}>
              <img src={openBadgeIcon} width={16} height={16} alt="" />
              오픈배지
              <img src={chevronRight} width={12} height={12} alt="" />
            </button>
          </div>
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
