import { useState } from 'react'
import { notice, scenarios, type ScenarioKey } from './data/mock'
import SiteHeader from './components/SiteHeader'
import MyPageHeader from './components/MyPageHeader'
import ProfileCard from './components/ProfileCard'
import TabGroup, { type TabKey } from './components/TabGroup'
import Section from './components/Section'
import SubscribeList from './components/SubscribeList'
import PromoBanners from './components/PromoBanners'
import WorksheetList from './components/WorksheetList'
import ChildrenList from './components/ChildrenList'
import Benefits from './components/Benefits'
import NoticeBox from './components/NoticeBox'
import Footer from './components/Footer'
import Fab from './components/Fab'
import ScenarioSwitch from './components/ScenarioSwitch'
import styles from './App.module.css'

// ?state=none 으로 열면 미발급 상태부터 시작
function initialScenario(): ScenarioKey {
  const q = new URLSearchParams(window.location.search).get('state')
  return q === 'none' ? 'none' : 'issued'
}

export default function App() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>(initialScenario)
  const [tab, setTab] = useState<TabKey>('구독')
  const s = scenarios[scenarioKey]

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <SiteHeader />
        <MyPageHeader />
        <ProfileCard user={s.user} />
        <TabGroup active={tab} onChange={setTab} />
        <div className={styles.sheetEdge} />
      </div>

      <main className={styles.contents}>
        <Section title="정기구독">
          <SubscribeList items={s.subscriptions} />
        </Section>

        <PromoBanners reporter={s.reporterBanner} mobileReporter={s.mobileReporterBanner} />

        <Section title="문해력 워크지" more="더보기">
          <WorksheetList items={s.literacyWorksheets} accent="pink" emptyCta="문해력 워크지 알아보기" />
        </Section>

        <Section title="사이언스 북마크 워크지" more="더보기">
          <WorksheetList items={s.bookmarkWorksheets} accent="purple" emptyCta="사이언스 북마크 워크지 알아보기" />
        </Section>

        <Section title="자녀 관리">
          <ChildrenList items={s.children} />
        </Section>

        <Section title="이용중인 혜택">
          <Benefits />
        </Section>

        <NoticeBox text={notice} />
      </main>

      <Footer />
      <Fab />
      <ScenarioSwitch value={scenarioKey} onChange={setScenarioKey} />
    </div>
  )
}
