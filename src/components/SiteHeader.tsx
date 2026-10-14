import appPopcorn from '../assets/figma-6953-32421/app-popcorn.svg'
import appHeart from '../assets/figma-6953-32421/app-heart.svg'
import styles from './SiteHeader.module.css'

const GNB = ['동아사이언스', '뉴스', '라이브러리', 'AI', '스토어']

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.gnb}>
        <ul className={styles.internal}>
          {GNB.map((item) => (
            <li key={item}>
              <a href="#" className={styles.link}>{item}</a>
            </li>
          ))}
        </ul>
        <div className={styles.external}>
          <a href="#" className={styles.app}>
            <img className={styles.popcorn} src={appPopcorn} width={21} height={14} alt="팝콘플래닛" />
          </a>
          <a href="#" className={styles.app}>
            <img src={appHeart} width={16} height={16} alt="지사탐" />
          </a>
        </div>
      </nav>
    </header>
  )
}
