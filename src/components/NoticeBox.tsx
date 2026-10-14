import bellIcon from '../assets/figma-6953-32421/notice-bell.svg'
import styles from './NoticeBox.module.css'

export default function NoticeBox({ text }: { text: string }) {
  return (
    <a href="#" className={styles.box}>
      <span className={styles.head}>
        <img src={bellIcon} width={20} height={20} alt="" />
        공지
      </span>
      <span className={styles.text}>{text}</span>
    </a>
  )
}
