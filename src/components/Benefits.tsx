import { benefits } from '../data/mock'
import logoLibrary from '../assets/figma-6953-32421/logo-dlibrary.svg'
import logoAir from '../assets/figma-6953-32421/logo-air.svg'
import cover from '../assets/figma-6953-32421/recent-content.png'
import styles from './Benefits.module.css'

export default function Benefits() {
  const { recentContent: c, keywords } = benefits
  return (
    <div className={styles.group}>
      <button className={styles.card}>
        <span className={`${styles.label} ${styles.library}`}>
          <img src={logoLibrary} width={80} height={20} alt="d라이브러리" />
        </span>
        <span className={styles.box}>
          <span className={styles.tit}>최근 본 콘텐츠</span>
          <span className={styles.content}>
            <img className={styles.cover} src={cover} width={80} height={118} alt="" />
            <span className={styles.text}>
              <span className={styles.titles}>
                <span className={styles.series}>
                  {c.series} <small>{c.seriesNo}</small>
                </span>
                <span className={styles.headline}>{c.title}</span>
              </span>
              <span className={styles.author}>{c.author}</span>
            </span>
          </span>
        </span>
      </button>

      <button className={styles.card}>
        <span className={`${styles.label} ${styles.air}`}>
          <img src={logoAir} width={79.5} height={20} alt="과학동아 AiR" />
        </span>
        <span className={styles.box}>
          <span className={styles.titBlock}>
            <span className={styles.tit}>나의 관심 키워드</span>
            <span className={styles.note}>※ AiR 이용 내역을 기반으로 추천된 키워드입니다.</span>
          </span>
          <span className={styles.tags}>
            {keywords.map((k) => (
              <span key={k} className={styles.tag}>
                {k}
              </span>
            ))}
          </span>
        </span>
      </button>
    </div>
  )
}
