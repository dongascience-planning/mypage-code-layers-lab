import type { Scenario } from '../data/mock'
import chevronWhite from '../assets/icons/chevron-banner-white.svg'
import chevronDark from '../assets/icons/chevron-banner-dark.svg'
import pressCardArt from '../assets/figma-mobile/banner-press-card.png'
import alpacaArt from '../assets/figma-6953-32421/banner-alpaca.png'
import chameleonArt from '../assets/figma-6953-32421/banner-chameleon.png'
import twinkleArt from '../assets/figma-6953-32421/banner-twinkle.png'
import airArt from '../assets/figma-6953-32421/banner-air.png'
import styles from './PromoBanners.module.css'

type Props = {
  reporter: Scenario['reporterBanner']
  mobileReporter: Scenario['mobileReporterBanner']
}

function ReporterBanner({ type, className }: { type: Scenario['reporterBanner']; className: string }) {
  return type === 'myCard' ? (
    <a href="#" className={`${styles.banner} ${styles.myCard} ${className}`}>
      <span className={styles.title}>
        나의 기자증 확인하기
        <img src={chevronWhite} width={24} height={24} alt="" />
      </span>
      <span className={styles.pressArt}><img src={pressCardArt} alt="" /></span>
    </a>
  ) : (
    <a href="#" className={`${styles.banner} ${styles.join} ${className}`}>
      <span className={styles.title}>
        어린이 기자단 혜택 받기
        <img src={chevronDark} width={24} height={24} alt="" />
      </span>
      <span className={styles.reporterArt} aria-hidden>
        <img className={styles.alpaca} src={alpacaArt} alt="" />
        <img className={styles.chameleon} src={chameleonArt} alt="" />
      </span>
    </a>
  )
}

export default function PromoBanners({ reporter, mobileReporter }: Props) {
  return (
    <div className={styles.group}>
      <a href="#" className={`${styles.banner} ${styles.family}`}>
        <span className={styles.title}>
          구독 하나로 우리 아이까지 함께 이용하기
          <img src={chevronWhite} width={24} height={24} alt="" />
        </span>
        <span className={styles.familyArt} aria-hidden>
          <img className={styles.air} src={airArt} alt="" />
          <img className={`${styles.twinkle} ${styles.twinkleOne}`} src={twinkleArt} alt="" />
          <img className={`${styles.twinkle} ${styles.twinkleTwo}`} src={twinkleArt} alt="" />
        </span>
      </a>

      <ReporterBanner type={reporter} className={styles.desktopReporter} />
      <ReporterBanner type={mobileReporter} className={styles.mobileReporter} />
    </div>
  )
}
