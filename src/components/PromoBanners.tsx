import type { Scenario } from '../data/mock'
import chevronWhite from '../assets/icons/chevron-banner-white.svg'
import chevronDark from '../assets/icons/chevron-banner-dark.svg'
import familyArt from '../assets/images/banner-family.png'
import pressCardArt from '../assets/images/banner-press-card.png'
import reporterArt from '../assets/images/banner-reporter.png'
import styles from './PromoBanners.module.css'

type Props = { reporter: Scenario['reporterBanner'] }

export default function PromoBanners({ reporter }: Props) {
  return (
    <div className={styles.group}>
      <a href="#" className={`${styles.banner} ${styles.family}`}>
        <span className={styles.title}>
          구독 하나로 우리 아이까지 함께 이용하기
          <img src={chevronWhite} width={24} height={24} alt="" />
        </span>
        <img className={styles.art} src={familyArt} width={128} height={80} alt="" />
      </a>

      {reporter === 'myCard' ? (
        <a href="#" className={`${styles.banner} ${styles.myCard}`}>
          <span className={styles.title}>
            나의 기자증 확인하기
            <img src={chevronWhite} width={24} height={24} alt="" />
          </span>
          <img className={styles.art} src={pressCardArt} width={138} height={80} alt="" />
        </a>
      ) : (
        <a href="#" className={`${styles.banner} ${styles.join}`}>
          <span className={styles.title}>
            어린이 기자단 혜택 받기
            <img src={chevronDark} width={24} height={24} alt="" />
          </span>
          <img className={styles.art} src={reporterArt} width={128} height={80} alt="" />
        </a>
      )}
    </div>
  )
}
