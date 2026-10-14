// 더미 데이터 — 실제 회원·상품 정보가 아님.
// 시나리오 2개는 Figma 260825 섹션의 두 모바일 프레임에 대응한다.
//   issued : Main/m (기자증 발급)        6953:32454
//   none   : Main/m-없어요 (미발급/만료)  6953:32515

export type ScenarioKey = 'issued' | 'none'

export type MemberBadge =
  | { kind: 'member'; label: string; tone: 'subscriber' | 'basic' }
  | { kind: 'family'; label: string }
  | { kind: 'auth'; label: string }

export type Subscription = { id: string; name: string; slogan: [string, string] }

export type Worksheet = { id: string; title: string; magazine: string; isNew?: boolean }

export type Child = { id: string; name: string; status: string; tone: 'blue' | 'violet' }

export type Scenario = {
  label: string
  user: { name: string; badges: MemberBadge[]; points: number; coupons: number }
  subscriptions: Subscription[]
  /** 두 번째 배너: 기자증이 있으면 확인, 없으면 기자단 가입 유도 */
  reporterBanner: 'myCard' | 'join'
  literacyWorksheets: Worksheet[]
  bookmarkWorksheets: Worksheet[]
  children: Child[]
}

const worksheets: Worksheet[] = [
  { id: 'w9', title: '2026년 5월 1일자 9호 워크지', magazine: '어린이과학동아', isNew: true },
  { id: 'w8', title: '2026년 4월 15일자 8호 워크지', magazine: '어린이과학동아' },
  { id: 'w5', title: '2026년 3월 1일자 5호 워크지', magazine: '어린이과학동아' },
]

export const scenarios: Record<ScenarioKey, Scenario> = {
  issued: {
    label: '기자증 발급',
    user: {
      name: '홍길동',
      badges: [
        { kind: 'member', label: '정기구독 회원', tone: 'subscriber' },
        { kind: 'family', label: '자녀' },
      ],
      points: 1800,
      coupons: 2,
    },
    subscriptions: [
      { id: 'math', name: '수학동아 어린이', slogan: ['지구 최강 재미,', '우주 1등 사고력'] },
      { id: 'sci', name: '과학동아', slogan: ['과학을 느끼는 즐거움,', '미래를 보는 창'] },
      { id: 'kids', name: '어린이과학동아', slogan: ['웃기는 과학,', '똑똑한 만화'] },
    ],
    reporterBanner: 'myCard',
    literacyWorksheets: worksheets,
    bookmarkWorksheets: worksheets,
    children: [
      { id: 'c1', name: '홍첫째', status: '과학동아/진행 중', tone: 'blue' },
      { id: 'c2', name: '홍둘째', status: '어린이과학동아/진행 중', tone: 'violet' },
    ],
  },
  none: {
    label: '기자증 미발급',
    user: {
      name: '홍길동',
      badges: [
        { kind: 'member', label: '일반 회원', tone: 'basic' },
        { kind: 'auth', label: '정기구독인증' },
      ],
      points: 1800,
      coupons: 2,
    },
    subscriptions: [],
    reporterBanner: 'join',
    literacyWorksheets: [],
    bookmarkWorksheets: [],
    children: [],
  },
}

export const benefits = {
  recentContent: {
    series: '수행평가 완벽 대비 수학 시리즈',
    seriesNo: '①',
    title: '교과세특의 필수 지식 | 미래 예측',
    author: '수학동아 편집부',
  },
  keywords: ['화학', '과학동아', '시크릿', '분자', '노벨상', '과학'],
}

export const notice = '리뷰이벤트 당첨자 발표'
