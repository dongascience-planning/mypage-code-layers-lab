import logoDs from '../assets/images/logo-ds.png'
import mobilePopcorn from '../assets/images/app-popcornplanet.png'
import mobileJisatam from '../assets/images/app-jisatam.png'
import appPopcorn from '../assets/figma-6953-32421/app-popcorn.svg'
import appHeart from '../assets/figma-6953-32421/app-heart.svg'
import styles from './SiteHeader.module.css'

const GNB = ['동아사이언스', '뉴스', '라이브러리', 'AI', '스토어']
const MOBILE_GNB = ['뉴스', 'd라이브러리', 'AIR', 'DS스토어']

export default function SiteHeader() {
  return (
    <>
      <header className={styles.desktopHeader}>
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
              <img src={appPopcorn} width={21} height={14} alt="팝콘플래닛" />
            </a>
            <a href="#" className={styles.app}>
              <img src={appHeart} width={16} height={16} alt="지사탐" />
            </a>
          </div>
        </nav>
      </header>

      <header className={styles.mobileHeader}>
        <div className={styles.logoRow}>
          <img src={logoDs} width={92} height={28} alt="동아사이언스" />
        </div>
        <nav className={styles.mobileGnb}>
        <ul className={styles.internal}>
          {MOBILE_GNB.map((item) => (
            <li key={item}>
              <a href="#" className={styles.mobileLink}>{item}</a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileExternal}>
          <a href="#" className={styles.app}>
            <img src={mobilePopcorn} width={32} height={32} alt="팝콘플래닛" />
          </a>
          <a href="#" className={styles.app}>
            <img src={mobileJisatam} width={32} height={32} alt="지사탐" />
          </a>
        </div>
      </nav>
      </header>
    </>
  )
}
