type MagazineKind = "science" | "math";

interface MagazineDetailPanelProps {
  kind: MagazineKind;
}

interface DetailCard {
  title: string;
  description: string;
  badge?: string;
  image: string;
}


const scienceFeatureCards: DetailCard[] = [
  {
    title: "아르테미스",
    description: "인류, 다시 달로 향하다\n아르테미스 프로젝트의 모든 것",
    badge: "우주 메가이슈",
    image: `${import.meta.env.BASE_URL}promotion-assets/3515b6893e7b64c2.webp`,
  },
  {
    title: "그린란드",
    description: "기후위기의 최전선\n그린란드가 말하는 미래",
    badge: "기후 환경",
    image: `${import.meta.env.BASE_URL}promotion-assets/4c01a32e37f18739.webp`,
  },
  {
    title: "차세대 반도체",
    description: "AI 시대를 움직이는 힘\n차세대 반도체의 미래",
    badge: "기술 산업",
    image: `${import.meta.env.BASE_URL}promotion-assets/e98115af1f8f75e6.webp`,
  },
  {
    title: "전파 망원경 SKA",
    description: "인류 최대 규모 프로젝트\n우주의 비밀을 듣다",
    badge: "우주 탐사",
    image: `${import.meta.env.BASE_URL}promotion-assets/eef49c3716d7165d.webp`,
  },
  {
    title: "희토류",
    description: "보이지 않는 핵심 자원\n희토류의 숨겨진 가치",
    badge: "기초과학 실생활",
    image: `${import.meta.env.BASE_URL}promotion-assets/3742b6f23c966b3c.webp`,
  },
  {
    title: "둘리사우루스",
    description: "한반도에서 발견된 신종 공룡\n둘리사우루스의 의미",
    badge: "국내 이슈",
    image: `${import.meta.env.BASE_URL}promotion-assets/624b5c0ed8819030.webp`,
  },
];

const sciencePerspectiveCards: DetailCard[] = [
  {
    title: "미래 시사",
    description: "사회 이슈를 관통하는 과학의 해답",
    image: `${import.meta.env.BASE_URL}promotion-assets/0b033ca836791949.webp`,
  },
  {
    title: "심층 기획",
    description: "깊이 있는 주제 리포트",
    image: `${import.meta.env.BASE_URL}promotion-assets/324afdad7ac0295b.webp`,
  },
  {
    title: "미래 기술 트렌드",
    description: "AI, 반도체, 바이오 등 핵심 기술 흐름과 변화",
    image: `${import.meta.env.BASE_URL}promotion-assets/babc9261de77eb87.webp`,
  },
  {
    title: "과학과 사람",
    description: "과학자의 연구와 삶을 통해 읽는 생생한 기록",
    image: `${import.meta.env.BASE_URL}promotion-assets/5693121acddcd74a.webp`,
  },
  {
    title: "그래픽 뉴스",
    description: "복잡한 원리를 요약한 비주얼 콘텐츠",
    image: `${import.meta.env.BASE_URL}promotion-assets/79449d85083c95ae.webp`,
  },
  {
    title: "진로와 커리어",
    description: "이공계 선배들이 제안하는 현실적인 로드맵",
    image: `${import.meta.env.BASE_URL}promotion-assets/3fb8a33bba543cda.webp`,
  },
];

const mathCards: DetailCard[] = [
  {
    title: "우와! 여기도 수학이?!",
    description: "뽑기에도 수학이 숨어있다?",
    badge: "확률",
    image: `${import.meta.env.BASE_URL}promotion-assets/b88881ac3c37c4a7.webp`,
  },
  {
    title: "아하! 만들기",
    description: "점프 개구리로 배우는 길이",
    badge: "길이·측정",
    image: `${import.meta.env.BASE_URL}promotion-assets/bc2ce060710e0c5f.webp`,
  },
  {
    title: "밸런스 게임",
    description: "4점 vs 7점, 뭐가 더 클까?",
    badge: "수 비교",
    image: `${import.meta.env.BASE_URL}promotion-assets/2defd29c43a731a8.webp`,
  },
  {
    title: "그림동화",
    description: "끝없이 커지는 수의 세계",
    badge: "수 개념",
    image: `${import.meta.env.BASE_URL}promotion-assets/f92ec6b143c291aa.webp`,
  },
  {
    title: "학습만화",
    description: "수학으로 문제를 해결하는 힘",
    badge: "사고력",
    image: `${import.meta.env.BASE_URL}promotion-assets/8e3d0eddf3006cdd.webp`,
  },
  {
    title: "수학 신들의 나라",
    description: "어렵던 개념이 이야기로 이해된다",
    badge: "수학용어",
    image: `${import.meta.env.BASE_URL}promotion-assets/0c3df82604f1fbc4.webp`,
  },
];

function FeatureSpread({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-6">
      <p className="whitespace-pre-line text-center text-xl font-bold leading-7 tracking-[-0.04em] text-[#212121] desktop:text-[28px] desktop:leading-10">
        {title}
      </p>
      <div className="h-[212px] w-full overflow-hidden tablet:h-[260px]">
        <img
          alt=""
          className="h-full w-full object-cover"
          src={image}
        />
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-1 px-5 desktop:px-0">
      <p className="text-sm leading-5 tracking-[-0.04em] text-[#666] desktop:text-base desktop:leading-6">
        {eyebrow}
      </p>
      <p className="text-xl font-bold leading-7 tracking-[-0.04em] text-[#212121] desktop:text-[28px] desktop:leading-10">
        {title}
      </p>
    </div>
  );
}

function CardRail({
  cards,
  tone,
  centered = false,
}: {
  cards: DetailCard[];
  tone: "dark" | "light";
  centered?: boolean;
}) {
  return (
    <div className="live-preview-rail flex w-full snap-x gap-3 overflow-x-auto px-5 pb-3 desktop:gap-4 desktop:px-0">
      {cards.map((card) => (
        <div
          className={`relative flex h-[180px] w-[220px] shrink-0 snap-center flex-col overflow-hidden rounded-xl p-5 desktop:h-[240px] desktop:w-[300px] desktop:p-8 ${
            tone === "dark"
              ? "bg-[#212121] text-white"
              : "bg-[#cce7ff] text-[#212121]"
          } ${centered ? "items-center text-center" : "items-start"}`}
          key={card.title}
        >
          <img
            alt=""
            className={`absolute object-cover ${
              centered
                ? "bottom-[-60px] left-1/2 h-[150px] w-[180px] -translate-x-1/2 desktop:bottom-[-80px] desktop:h-[200px] desktop:w-[240px]"
                : "bottom-[-30px] right-[-70px] h-[150px] w-[180px] desktop:bottom-[-40px] desktop:right-[-100px] desktop:h-[200px] desktop:w-[240px]"
            }`}
            src={card.image}
          />
          <div className={`relative z-10 flex flex-col gap-2 ${centered ? "items-center" : "items-start"}`}>
            <p className={`${centered ? "text-xl desktop:text-2xl" : "text-base desktop:text-xl"} font-bold leading-7 tracking-[-0.04em]`}>
              {card.title}
            </p>
            <p
              className={`max-w-[150px] whitespace-pre-line text-xs leading-4 tracking-[-0.04em] desktop:text-sm desktop:leading-5 ${
                tone === "dark" ? "text-[#ccc]" : "text-[#666]"
              }`}
            >
              {card.description}
            </p>
          </div>
          {card.badge && (
            <div className="relative z-10 mt-auto rounded-full bg-[#08f] px-3 py-0.5 text-xs font-bold leading-4 text-white desktop:text-sm desktop:leading-5">
              {card.badge}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SciencePanel() {
  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-12 pb-20 desktop:gap-[60px] desktop:px-10">
      <div className="grid gap-10 px-5 pt-10 tablet:grid-cols-2 desktop:gap-5 desktop:px-0">
        <FeatureSpread
          image={`${import.meta.env.BASE_URL}promotion-assets/d1289ccb908e38f1.webp`}
          title={"호기심이 실력이 되는\n상위 1%의 선택"}
        />
        <FeatureSpread
          image={`${import.meta.env.BASE_URL}promotion-assets/79449d85083c95ae.webp`}
          title={"40년간 쌓아온 과학 콘텐츠\n대한민국 대표 과학 잡지 과학동아"}
        />
      </div>
      <div className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="서울대 x 카이스트 출신 전문 과학 기자가 직접 취재하는"
          title="깊이 읽는 과학 콘텐츠"
        />
        <CardRail cards={scienceFeatureCards} tone="dark" />
      </div>
      <div className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="기사, 특집, 비주얼을 넘어 시대의 맥락을 읽는 입체적 탐구"
          title="세상을 읽는 다양한 관점"
        />
        <CardRail cards={sciencePerspectiveCards} centered tone="dark" />
      </div>
    </div>
  );
}

function MathPanel() {
  const openVideo = () =>
    window.open(
      "https://youtu.be/--Q9chzQXP4?si=H-CNx30G4-ncPe8y",
      "_blank",
      "noopener,noreferrer",
    );

  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-12 pb-20 desktop:gap-[60px] desktop:px-10">
      <div className="grid gap-10 px-5 pt-10 tablet:grid-cols-2 desktop:gap-5 desktop:px-0">
        <FeatureSpread
          image={`${import.meta.env.BASE_URL}promotion-assets/77c125817aeaba60.webp`}
          title={"연산, 공식 암기보다 중요한 건\n생각하는 힘과 수학 자신감!"}
        />
        <FeatureSpread
          image={`${import.meta.env.BASE_URL}promotion-assets/71471245e832c40b.webp`}
          title={"읽다보면 자연스럽게\n수학 사고력을 키워주는 잡지"}
        />
      </div>
      <div className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="생활 속 발견부터 만들기, 동화, 퍼즐까지"
          title="수학을 만나는 다양한 방법"
        />
        <CardRail cards={mathCards} tone="light" />
      </div>
      <div className="flex flex-col gap-5 px-5 desktop:px-0">
        <SectionHeading
          eyebrow="만들고, 고르고, 상상하며 자연스럽게 이해하는 수학 경험"
          title="놀면서 배우는 수학"
        />
        <div className="grid gap-3 tablet:grid-cols-2 desktop:gap-4">
          <div className="relative flex h-[240px] flex-col overflow-hidden rounded-xl bg-[#cce7ff] p-6 desktop:h-[260px] desktop:p-8">
            <img
              alt=""
              className="absolute bottom-0 right-0 h-full w-auto object-cover"
              src={`${import.meta.env.BASE_URL}promotion-assets/3418117d1ccbae1a.webp`}
            />
            <p className="relative z-10 text-xl font-bold leading-7 tracking-[-0.04em] text-[#212121] desktop:text-2xl">
              재미있는 만들기 도안
            </p>
            <p className="relative z-10 mt-2 text-sm leading-5 tracking-[-0.04em] text-[#666]">
              한 달에 두 번 제공
            </p>
          </div>
          <div
            className="flex h-[240px] cursor-pointer items-center justify-center rounded-xl bg-[#212121] text-xl font-bold leading-7 text-white desktop:h-[260px]"
            onClick={openVideo}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") openVideo();
            }}
            role="link"
            tabIndex={0}
          >
            영상 보기
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MagazineDetailPanel({
  kind,
}: MagazineDetailPanelProps) {
  return kind === "science" ? <SciencePanel /> : <MathPanel />;
}
