# 마이페이지 · 코드 레이어 실습 리포

Figma 코드 레이어(Code Layers) 실습용 경량 리포. 동아사이언스 디자인파트 내부 실습 자료.

- 원본 시안: 통합마이페이지 › 01. 메인 › `260825_자녀등록유도 및 수정` 섹션
- 구현 범위: 모바일 메인(360px 기준), 넓은 화면은 600px 칼럼 가운데 정렬(PC 시안과 같은 구조)
- 스택: Vite 8 + React 19 + TypeScript. 마이페이지는 CSS Modules, 프로모션은 Tailwind CSS v4

## 페이지 2개

| 주소 | 화면 | 출처 |
| --- | --- | --- |
| `/` | 통합마이페이지 (260825 자녀등록유도) | Figma 시안 → 코드 |
| `/promotion` | 동아사이언스 정기구독 프로모션 랜딩 (모바일·태블릿·PC) | Figma 코드 레이어 Build with code 결과를 내려받아 이관 |

- Figma 코드 레이어 패널의 **Route**에 `/promotion` 입력하면 프로모션 화면
- 두 페이지의 스타일은 주소별로 따로 불러와 섞이지 않음
- 프로모션 이미지: 라이브 랜딩(dsstore.dongascience.com/promotion/landing)과 같은 이미지는 라이브 주소 사용, 나머지는 중복 제거 후 WebP 변환(`public/promotion-assets`, 원본 650MB → 약 16MB)
- `src/promotion/generated/`는 Figma 자동 생성 파일. 직접 수정하지 않고 타입 검사에서 제외

## 데이터·이미지 원칙

이미 공개된 서비스 화면을 테스트용으로 옮긴 것. 개인 정보만 더미로 바꿈.

| 항목 | 처리 |
| --- | --- |
| 회원 이름·자녀 이름 | 가명(홍길동 등) |
| 사업자 정보(푸터) | 전부 0·샘플 값 |
| UI 아이콘 18종 | Figma MCP 에셋 SVG (`src/assets/icons`) |
| 로고·잡지 로고·배너·캐릭터·표지·안전결제 마크 15종 | TalkToFigma로 원본 노드를 2배 PNG로 내보냄 (`src/assets/images`) |

API 키·토큰·비밀번호는 이 리포와 코드 레이어 어디에도 넣지 않음.

## 실행

```bash
npm install
npm run dev
```

`http://localhost:5173` 접속. `?state=none`을 붙이면 미발급 상태로 시작.

## 상태 2개

화면 왼쪽 아래 스위치로 전환. 데이터는 `src/data/mock.ts` 한 곳에서 관리.

| 상태 | Figma 프레임 | 차이 |
| --- | --- | --- |
| 기자증 발급 (`issued`) | `Main/m (기자증 발급)` 6953:32454 | 정기구독 회원 배지, 구독 목록, 기자증 확인 배너, 워크지 목록, 자녀 카드 |
| 기자증 미발급 (`none`) | `Main/m-없어요 (기자증 미발급/만료)` 6953:32515 | 일반 회원 + 정기구독인증, 빈 상태 카드 4종, 기자단 혜택 배너 |

## 컴포넌트 ↔ Figma 레이어

| 컴포넌트 | Figma 레이어 |
| --- | --- |
| `SiteHeader` | Header_m |
| `MyPageHeader` | Header_mo_view |
| `ProfileCard` | info_list (포인트/쿠폰2, 이용권과 정기결제) |
| `TabGroup` | TabGroup |
| `Section` | title (제목 + 전체보기/더보기) |
| `SubscribeList` | SubscribeList (최대3개 / 없음) |
| `PromoBanners` | banner-360x100-1·2·3 |
| `WorksheetList` | 문해력 워크지 / 사이언스 북마크 워크지 (Badge, btn/item_NIE, 빈 상태) |
| `ChildrenList` | Children (childCase / 스마트회원·연결x) |
| `Benefits` | benefitGroup (dLibrary, AiR) |
| `NoticeBox` | noticeBox |
| `Footer` | Footer_mo |
| `Fab` | FAB |

## 코드 레이어에서 불러오기

1. Figma 디자인 파일에서 코드 레이어 생성
2. GitHub 클론 → 이 리포의 HTTPS URL 입력
3. 프롬프트로 시안 방향 변형 (예: "자녀 관리 빈 상태를 일러스트 중심으로 바꿔줘")
4. 상태 스위치로 발급/미발급 두 경우 모두 확인

## 시안과 다른 점

- 폰트: 시안의 NEXON Lv1 Gothic(빈 상태 문구)·Sandoll GothicNeo2(구독 슬로건)는 웹폰트 미탑재라 Pretendard로 대체
- 콘텐츠·쇼핑 탭은 선택 표시만 바뀌고 내용은 구독 탭과 같음
