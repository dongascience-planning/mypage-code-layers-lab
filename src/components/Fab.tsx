import menuIcon from '../assets/figma-6953-32421/menu.svg'
import styles from './Fab.module.css'

export default function Fab() {
  return (
    <button className={styles.fab} aria-label="전체 메뉴">
      <img src={menuIcon} width={24} height={24} alt="" />
    </button>
  )
}
