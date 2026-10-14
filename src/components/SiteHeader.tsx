import logoDs from '../assets/images/logo-ds.png'
import appPopcorn from '../assets/images/app-popcornplanet.png'
import appJisatam from '../assets/images/app-jisatam.png'
import styles from './SiteHeader.module.css'

const GNB = ['뉴스', 'd라이브러리', 'AIR', 'DS스토어']

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logoRow}>
        <img src={logoDs} width={92} height={28} alt="동아사이언스" />
      </div>
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
            <img src={appPopcorn} width={32} height={32} alt="팝콘플래닛" />
          </a>
          <a href="#" className={styles.app}>
            <img src={appJisatam} width={32} height={32} alt="지사탐" />
          </a>
        </div>
      </nav>
    </header>
  )
}
