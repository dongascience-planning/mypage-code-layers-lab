import type { ReactNode } from 'react'
import chevronRight from '../assets/icons/chevron-right-14.svg'
import styles from './Section.module.css'

type Props = { title: string; more?: '전체보기' | '더보기'; children: ReactNode }

export default function Section({ title, more = '전체보기', children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        <a href="#" className={styles.more}>
          {more}
          <img src={chevronRight} width={14} height={14} alt="" />
        </a>
      </div>
      {children}
    </section>
  )
}
