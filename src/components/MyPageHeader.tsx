import homeIcon from '../assets/icons/home.svg'
import authIcon from '../assets/icons/auth.svg'
import alarmIcon from '../assets/icons/alarm.svg'
import CoinIcon from './CoinIcon'
import styles from './MyPageHeader.module.css'

export default function MyPageHeader() {
  return (
    <div className={styles.bar}>
      <div className={`${styles.side} ${styles.left}`}>
        <button className={styles.iconBtn} aria-label="홈">
          <img src={homeIcon} width={24} height={24} alt="" />
        </button>
      </div>
      <h1 className={styles.title}>마이페이지</h1>
      <div className={`${styles.side} ${styles.right}`}>
        <button className={styles.iconBtn} aria-label="정기구독 인증">
          <img src={authIcon} width={24} height={24} alt="" />
        </button>
        <button className={styles.iconBtn} aria-label="결제 내역">
          <CoinIcon />
        </button>
        <button className={styles.iconBtn} aria-label="알림">
          <img src={alarmIcon} width={24} height={24} alt="" />
        </button>
      </div>
    </div>
  )
}
