import type { Scenario } from '../data/mock'
import authBadgeIcon from '../assets/icons/auth-badge.svg'
import chevronPoint from '../assets/icons/chevron-10-point.svg'
import chevronCoupon from '../assets/icons/chevron-10-coupon.svg'
import chevronWhite from '../assets/icons/chevron-10-white.svg'
import silverBadge from '../assets/figma-6953-32421/profile-silver.png'
import styles from './ProfileCard.module.css'

type Props = { user: Scenario['user'] }

export default function ProfileCard({ user }: Props) {
  return (
    <section className={styles.card} aria-label="회원 정보">
      <div className={styles.top}>
        <div className={styles.info}>
          <p className={styles.greeting}>
            <span className={styles.nameLine}>
              <strong className={styles.name}>{user.name}</strong>님,
            </span>
            <span>반갑습니다! 👋</span>
          </p>
          <ul className={styles.badges}>
            {user.badges.map((b) => (
              <li key={b.label}>
                {b.kind === 'member' && (
                  <span className={`${styles.pill} ${styles[b.tone]}`}>
                    {b.label === 'Smart+ 회원' ? (
                      <>
                        Smart<sup>+</sup> 회원
                      </>
                    ) : b.label}
                  </span>
                )}
                {b.kind === 'family' && <span className={`${styles.pill} ${styles.family}`}>{b.label}</span>}
                {b.kind === 'auth' && (
                  <button className={styles.auth}>
                    <img src={authBadgeIcon} width={24} height={24} alt="" />
                    {b.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        {user.grade && <img className={styles.grade} src={silverBadge} width={120} height={120} alt="실버 등급" />}
      </div>

      <div className={styles.wallet}>
        <div className={styles.summary}>
          <button className={styles.half}>
            <span className={styles.tit}>
              <span className={styles.gradText}>포인트</span>
              <img src={chevronPoint} width={10} height={10} alt="" />
            </span>
            <span className={`${styles.value} ${styles.gradText}`}>
              <b>{user.points.toLocaleString('ko-KR')}</b>
              <small>P</small>
            </span>
          </button>
          <span className={styles.divider} aria-hidden />
          <button className={styles.half}>
            <span className={styles.tit}>
              <span className={styles.gradText}>쿠폰</span>
              <img src={chevronCoupon} width={10} height={10} alt="" />
            </span>
            <span className={`${styles.value} ${styles.gradText}`}>
              <b>{user.coupons}</b>
              <small>장</small>
            </span>
          </button>
        </div>

        <div className={styles.actions}>
          {['이용권 등록', '정기결제 관리'].map((label) => (
            <button key={label} className={styles.action}>
              {label}
              <img src={chevronWhite} width={10} height={10} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
