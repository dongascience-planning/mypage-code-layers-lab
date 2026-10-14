import coinInner from '../assets/icons/coin-inner.svg'
import styles from './CoinIcon.module.css'

/** Figma icon/coin (6315:21739): 24px 프레임 안에 inset 14.58% 그룹 */
export default function CoinIcon() {
  return (
    <span className={styles.frame}>
      <span className={styles.group}>
        <img src={coinInner} alt="" className={styles.img} />
      </span>
    </span>
  )
}
