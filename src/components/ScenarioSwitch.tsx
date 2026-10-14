import { scenarios, type ScenarioKey } from '../data/mock'
import styles from './ScenarioSwitch.module.css'

type Props = { value: ScenarioKey; onChange: (key: ScenarioKey) => void }

/** 실습용 상태 전환 스위치 — 실제 서비스 화면에는 없음 */
export default function ScenarioSwitch({ value, onChange }: Props) {
  return (
    <div className={styles.switch} role="radiogroup" aria-label="시안 상태">
      {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
        <button
          key={key}
          role="radio"
          aria-checked={key === value}
          className={key === value ? styles.on : undefined}
          onClick={() => onChange(key)}
        >
          {scenarios[key].label}
        </button>
      ))}
    </div>
  )
}
