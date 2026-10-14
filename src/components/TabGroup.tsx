import tabDot from '../assets/icons/tab-dot.svg'
import styles from './TabGroup.module.css'

const TABS = ['구독', '콘텐츠', '쇼핑'] as const
export type TabKey = (typeof TABS)[number]

type Props = { active: TabKey; onChange: (tab: TabKey) => void }

export default function TabGroup({ active, onChange }: Props) {
  return (
    <div className={styles.group} role="tablist">
      {TABS.map((tab) => {
        const on = tab === active
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={on}
            className={`${styles.tab} ${on ? styles.on : ''}`}
            onClick={() => onChange(tab)}
          >
            {on && <img src={tabDot} width={5} height={5} alt="" className={styles.dot} />}
            {tab}
          </button>
        )
      })}
    </div>
  )
}
