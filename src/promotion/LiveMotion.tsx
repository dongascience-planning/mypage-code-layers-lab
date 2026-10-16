import { type ReactNode, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import MagazineDetailPanel from "./MagazineDetailPanel";

interface LiveMotionProps {
  children: ReactNode;
}

export default function LiveMotion({ children }: LiveMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cleanups: Array<() => void> = [];

    const normalizeText = (value: string | null) =>
      value?.replace(/\s+/g, "") ?? "";
    const findSmallestMatch = (selector: string, label: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(selector))
        .filter((element) =>
          normalizeText(element.textContent).includes(normalizeText(label)),
        )
        .sort(
          (first, second) =>
            normalizeText(first.textContent).length -
            normalizeText(second.textContent).length,
        )
        .at(0);

    const revealTargets: HTMLElement[] = [];
    const addRevealGroup = (
      labels: string[],
      selector: string,
      getTarget: (match: HTMLElement) => HTMLElement | null = (match) => match,
    ) => {
      labels.forEach((label, index) => {
        const match = findSmallestMatch(selector, label);
        const target = match ? getTarget(match) : null;
        if (!target || revealTargets.includes(target)) return;
        target.classList.add("live-reveal");
        target.style.setProperty("--reveal-delay", `${index * 120}ms`);
        revealTargets.push(target);
      });
    };

    addRevealGroup(
      [
        "관심 있는 페이지만 보고 덮어요",
        "엄마 이건 왜 그래?",
        "AI는 쓰게 해도 되는 걸까요?",
      ],
      '[data-name="item/1"]',
      (match) => match.parentElement,
    );
    addRevealGroup(
      ["어린이 기자단", "전국 90여 곳", "지구사랑탐사대", "우주 기자단"],
      '[data-name="card"]',
    );
    addRevealGroup(
      [
        "수학∙과학",
        "우리 아이 독서습관",
        "‘문해력’이 고민?",
        "초∙중등 자녀가 함께",
        "중등 과학 선행 전",
        "영재고∙과고 합격",
      ],
      '[data-name="card"]',
    );

    const movingTracks = root.querySelectorAll<HTMLElement>(
      '[data-name="image-auto rolling"] > [data-name="column-1"], [data-name="image-auto rolling"] > [data-name="column-2"]',
    );
    movingTracks.forEach((track) => {
      track.classList.add("live-marquee-track");
      if (track.dataset.name === "column-2") {
        track.classList.add("live-marquee-reverse");
      }

      if (!track.dataset.motionClone) {
        const originalItems = Array.from(track.children) as HTMLElement[];
        const duplicateSetCount = 2;
        Array.from({ length: duplicateSetCount }).forEach((_, setIndex) => {
          originalItems.forEach((item) => {
            const clone = item.cloneNode(true) as HTMLElement;
            clone.setAttribute("aria-hidden", "true");
            clone.dataset.motionDuplicate = String(setIndex + 1);
            track.appendChild(clone);
          });
        });
        track.dataset.motionClone = "true";

        const firstOriginal = originalItems.at(0);
        const secondOriginal = originalItems.at(1);
        const firstClone = track.children.item(originalItems.length) as HTMLElement | null;
        if (firstOriginal && firstClone) {
          const distance = firstClone.offsetLeft - firstOriginal.offsetLeft;
          const stepDistance = secondOriginal
            ? secondOriginal.offsetLeft - firstOriginal.offsetLeft
            : firstOriginal.offsetWidth;
          const duration = (distance / stepDistance) * 3000;
          track.style.setProperty("--marquee-distance", `${distance}px`);
          track.style.setProperty("--marquee-duration", `${duration}ms`);
        }
      }
    });

    const awardsTrack = root.querySelector<HTMLElement>('[data-name="awards"]');
    if (awardsTrack && !awardsTrack.dataset.motionClone) {
      Array.from(awardsTrack.children).forEach((child) => {
        const clone = child.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        awardsTrack.appendChild(clone);
      });
      awardsTrack.dataset.motionClone = "true";
      awardsTrack.classList.add("live-awards-track");
    }

    const animatedRegions = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-name="image-auto rolling"], [data-name="awards"]',
      ),
    );

    if (reducedMotion) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
      animatedRegions.forEach((element) => element.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-visible", entry.isIntersecting);
          });
        },
        { rootMargin: "0px 0px -15% 0px", threshold: 0 },
      );
      revealTargets.forEach((element) => revealObserver.observe(element));

      const motionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      });
      animatedRegions.forEach((element) =>
        motionObserver.observe(element),
      );
      cleanups.push(
        () => revealObserver.disconnect(),
        () => motionObserver.disconnect(),
      );
    }

    const dropdowns = root.querySelectorAll<HTMLButtonElement>(
      'button[data-name="dropdown/1"], button[data-name="dropdown/2"]',
    );
    dropdowns.forEach((dropdown) => {
      const body = dropdown.children.item(1) as HTMLElement | null;
      if (!body) return;

      dropdown.classList.add("live-accordion");
      dropdown.setAttribute("aria-expanded", "false");
      body.classList.add("live-accordion-body");

      const toggle = () => {
        const expanded = dropdown.getAttribute("aria-expanded") === "true";
        dropdown.setAttribute("aria-expanded", String(!expanded));
      };

      dropdown.addEventListener("click", toggle);
      cleanups.push(() => dropdown.removeEventListener("click", toggle));
    });

    const externalLinks: Array<{
      target: HTMLElement | null | undefined;
      url: string;
      label: string;
    }> = [
      {
        target: root
          .querySelector<HTMLElement>('[data-name="logo/AiR"]')
          ?.closest<HTMLElement>('[data-name="title"]'),
        url: "https://air.dongascience.com",
        label: "과학동아 AiR 바로가기",
      },
      {
        target: root
          .querySelector<HTMLElement>('[data-name="Logo_dLibrary"]')
          ?.closest<HTMLElement>('[data-name="card"]'),
        url: "https://dl.dongascience.com",
        label: "d라이브러리 바로가기",
      },
      {
        target: root
          .querySelector<HTMLElement>('[data-name="logo/popcorn"]')
          ?.closest<HTMLElement>('[data-name="card"]'),
        url: "https://www.popcornplanet.co.kr",
        label: "팝콘플래닛 어린이 기자단 바로가기",
      },
      {
        target: (() => {
          const heading = findSmallestMatch(
            '[data-name="title"]',
            "지구사랑탐사대",
          );
          return heading?.closest<HTMLElement>('[data-name="card"]');
        })(),
        url: "https://jisatam.dongascience.com",
        label: "지구사랑탐사대 바로가기",
      },
      {
        target: Array.from(
          root.querySelectorAll<HTMLElement>('[role="link"]'),
        ).find(
          (element) =>
            element.textContent?.trim() ===
            "https://dl.dongascience.com/dl/worksheet/main",
        ),
        url: "https://dl.dongascience.com/dl/worksheet/main",
        label: "d라이브러리 워크지 체험 바로가기",
      },
    ];

    externalLinks.forEach(({ target, url, label }) => {
      if (!target) return;
      target.classList.add("live-external-link");
      target.setAttribute("role", "link");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", label);

      const openLink = () =>
        window.open(url, "_blank", "noopener,noreferrer");
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openLink();
      };

      target.addEventListener("click", openLink);
      target.addEventListener("keydown", handleKeyDown);
      cleanups.push(() => {
        target.removeEventListener("click", openLink);
        target.removeEventListener("keydown", handleKeyDown);
      });
    });

    const cta = root.querySelector<HTMLElement>('[data-name="btn/full"]');
    if (cta) {
      cta.setAttribute("role", "link");
      cta.setAttribute("tabindex", "0");
      cta.setAttribute("aria-label", "특별혜택 받고 구독하기");

      const scrollToSubscription = () => {
        const target = root.querySelector<HTMLElement>('[data-name="btn/select"]');
        target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          scrollToSubscription();
        }
      };

      cta.addEventListener("click", scrollToSubscription);
      cta.addEventListener("keydown", handleKeyDown);
      cleanups.push(() => {
        cta.removeEventListener("click", scrollToSubscription);
        cta.removeEventListener("keydown", handleKeyDown);
      });
    }

    const subscriptionHeading = Array.from(root.querySelectorAll("p")).find(
      (element) => normalizeText(element.textContent) === "정기구독신청하기",
    );
    const subscriptionSection = subscriptionHeading?.closest<HTMLElement>(
      '[data-name^="section-"]',
    );
    const subscriptionOptions = subscriptionSection
      ? Array.from(
          subscriptionSection.querySelectorAll<HTMLElement>(
            '[data-name="btn/select"]',
          ),
        )
      : [];

    if (subscriptionSection && subscriptionOptions.length >= 8) {
      const magazineOptions = subscriptionOptions.slice(0, 3);
      const periodOptions = subscriptionOptions.slice(3, 6);
      const packageOptions = subscriptionOptions.slice(6, 8);
      const magazineNames = [
        "어린이수학동아",
        "어린이과학동아",
        "과학동아",
      ];
      const annualPrices = [240000, 264000, 288000];
      const annualBasicDiscounts = [43200, 46800, 50400];
      const selectedMagazines = new Set([1]);
      let selectedPeriod = 0;
      let selectedPackage = 1;

      const selectorRoot =
        magazineOptions[0].closest<HTMLElement>('[data-name="select-g"]');
      const formCta = selectorRoot?.lastElementChild as HTMLElement | null;
      const result = subscriptionSection.querySelector<HTMLElement>(
        '[data-name="result"]',
      );

      const setText = (selector: string, text: string) => {
        const target = result?.querySelector<HTMLElement>(selector);
        if (target) target.textContent = text;
      };
      const formatPrice = (price: number) =>
        `${Math.max(0, Math.round(price)).toLocaleString("ko-KR")}원`;
      const setSelected = (option: HTMLElement, selected: boolean) => {
        option.setAttribute("aria-pressed", String(selected));
      };

      const renderSubscription = () => {
        magazineOptions.forEach((option, index) =>
          setSelected(option, selectedMagazines.has(index)),
        );
        periodOptions.forEach((option, index) =>
          setSelected(option, selectedPeriod === index),
        );
        packageOptions.forEach((option, index) =>
          setSelected(option, selectedPackage === index),
        );

        const years = selectedPeriod + 1;
        const months = years * 12;
        const selectedNames = [...selectedMagazines].map(
          (index) => magazineNames[index],
        );
        const isSmartPackage = selectedPackage === 1;
        const isAvailable = !isSmartPackage || selectedMagazines.has(1);
        const magazinePrice = [...selectedMagazines].reduce(
          (sum, index) => sum + annualPrices[index] * years,
          0,
        );
        const regularPrice =
          magazinePrice + (isSmartPackage ? 283200 * years : 0);
        const basicDiscount = [...selectedMagazines].reduce(
          (sum, index) => sum + annualBasicDiscounts[index] * years,
          0,
        );
        const bundleDiscount =
          Math.max(0, selectedMagazines.size - 1) * 80600 * years +
          (isSmartPackage ? 164800 * years : 0);
        const longTermDiscount =
          selectedPeriod === 0 ? 0 : Math.round(regularPrice * 0.04 * selectedPeriod);
        const maximumDiscount = Math.min(
          basicDiscount + bundleDiscount + longTermDiscount,
          Math.round(regularPrice * 0.55),
        );
        const benefitPrice = regularPrice - maximumDiscount;
        const monthlyPrice = Math.round(benefitPrice / months);
        const discountRate = Math.round((maximumDiscount / regularPrice) * 100);
        const productName = `${selectedNames.join(" + ")} ${years}년${
          isSmartPackage ? " 스마트 패키지" : ""
        }`;

        setText(
          '[data-name="select-result-1"] p:last-child',
          isAvailable ? productName : `${productName} · 준비중`,
        );
        setText(
          '[data-name="select-result-2"] p:last-child',
          isAvailable ? formatPrice(regularPrice) : "—",
        );
        setText(
          '[data-name="select-result-3"] > p:last-child',
          isAvailable ? `-${formatPrice(maximumDiscount)}` : "—",
        );
        setText(
          '[data-name="select-result-3-detail"] [data-name="detail-1"] p:last-child',
          isAvailable ? `-${formatPrice(basicDiscount)}` : "—",
        );
        setText(
          '[data-name="select-result-3-detail"] [data-name="detail-2"] p:first-child',
          isSmartPackage ? "패키지·동시구독 할인" : "동시구독 할인",
        );
        setText(
          '[data-name="select-result-3-detail"] [data-name="detail-2"] p:last-child',
          isAvailable ? `-${formatPrice(bundleDiscount)}` : "—",
        );
        setText(
          '[data-name="select-result-3-detail"] [data-name="detail-3"] p:last-child',
          isAvailable ? `-${formatPrice(longTermDiscount)}` : "—",
        );
        setText(
          '[data-name="order-result-1"] [data-name="badge/round"] p',
          isAvailable ? `${discountRate}% 할인` : "준비중",
        );
        setText(
          '[data-name="order-result-1"] > p:last-child',
          isAvailable ? formatPrice(benefitPrice) : "—",
        );
        setText(
          '[data-name="order-result-2"] [data-name="badge/round"] p',
          `${months}개월`,
        );
        setText(
          '[data-name="order-result-2"] > p:last-child',
          isAvailable ? formatPrice(monthlyPrice) : "—",
        );

        const includedRows = result
          ? Array.from(
              result.querySelectorAll<HTMLElement>(
                '[data-name="order-result-2-detail"] > div',
              ),
            )
          : [];
        const includedItems = [
          [
            selectedNames.join(" · "),
            `${24 * years}권${selectedMagazines.size > 1 ? "씩" : ""}`,
          ],
          ...(isSmartPackage
            ? ([["스마트 패키지 서비스", `${months}개월`]] as const)
            : []),
        ];
        includedRows.forEach((row, index) => {
          const item = includedItems[index];
          row.hidden = !item || !isAvailable;
          if (!item) return;
          const labels = row.querySelectorAll("p");
          if (labels[0]) labels[0].textContent = item[0];
          if (labels[1]) labels[1].textContent = item[1];
        });

        if (result) {
          result.classList.toggle("live-subscription-unavailable", !isAvailable);
        }
        if (formCta) {
          const label = formCta.querySelector("p");
          if (label) {
            label.textContent = isAvailable
              ? `월 혜택가 ${formatPrice(monthlyPrice)}에 시작하기`
              : "선택한 조합은 준비중이에요";
          }
          formCta.setAttribute("aria-disabled", String(!isAvailable));
        }
      };

      const groups = [magazineOptions, periodOptions, packageOptions];
      groups.forEach((options, groupIndex) => {
        options.forEach((option, optionIndex) => {
          option.classList.add("live-select-option");
          option.setAttribute("role", "button");
          option.setAttribute("tabindex", "0");
          option.setAttribute(
            "aria-label",
            groupIndex === 0
              ? magazineNames[optionIndex]
              : normalizeText(option.textContent),
          );

          const chooseOption = () => {
            if (groupIndex === 0) {
              if (
                selectedMagazines.has(optionIndex) &&
                selectedMagazines.size === 1
              ) {
                return;
              }
              if (selectedMagazines.has(optionIndex)) {
                selectedMagazines.delete(optionIndex);
              } else {
                selectedMagazines.add(optionIndex);
              }
            } else if (groupIndex === 1) {
              selectedPeriod = optionIndex;
            } else {
              selectedPackage = optionIndex;
            }
            renderSubscription();
          };
          const handleOptionKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              chooseOption();
              return;
            }
            if (
              groupIndex > 0 &&
              ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                event.key,
              )
            ) {
              event.preventDefault();
              const direction =
                event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
              const nextIndex =
                (optionIndex + direction + options.length) % options.length;
              if (groupIndex === 1) selectedPeriod = nextIndex;
              if (groupIndex === 2) selectedPackage = nextIndex;
              renderSubscription();
              options[nextIndex].focus();
            }
          };

          option.addEventListener("click", chooseOption);
          option.addEventListener("keydown", handleOptionKeyDown);
          cleanups.push(() => {
            option.removeEventListener("click", chooseOption);
            option.removeEventListener("keydown", handleOptionKeyDown);
          });
        });
      });

      if (formCta) {
        formCta.classList.add("live-subscription-cta");
        formCta.setAttribute("role", "button");
        formCta.setAttribute("tabindex", "0");
      }
      renderSubscription();
    }

    const magazineShowcase = root.querySelector<HTMLElement>(
      '[data-name$="kid-sci"]',
    );
    const magazineTabs =
      magazineShowcase?.querySelector<HTMLElement>(
        '[data-name="tabs-sticky"]',
      ) ?? null;
    const magazineTabOptions = magazineTabs
      ? Array.from(magazineTabs.children) as HTMLElement[]
      : [];

    if (
      magazineShowcase &&
      magazineTabs &&
      magazineTabOptions.length === 3
    ) {
      const sectionTitle = magazineShowcase.querySelector<HTMLElement>(
        '[data-name="section-title"]',
      );
      const titleTexts = sectionTitle
        ? Array.from(sectionTitle.querySelectorAll<HTMLParagraphElement>("p"))
        : [];
      const wordmark = magazineShowcase.querySelector<HTMLElement>(
        '[data-name="logo_scikid"]',
      );
      const magazineImages = Array.from(
        magazineShowcase.querySelectorAll<HTMLImageElement>(
          '[data-name="mag"] img',
        ),
      );
      const originalWordmark = wordmark?.innerHTML ?? "";
      const originalImageSources = magazineImages.map((image) => image.src);
      const originalTexts = new Map(
        Array.from(magazineShowcase.querySelectorAll("p")).map((element) => [
          element,
          element.textContent ?? "",
        ]),
      );
      const originalSub = magazineShowcase.querySelector<HTMLElement>(
        '[data-name="sub"]',
      );
      const originalList = magazineShowcase.querySelector<HTMLElement>(
        '[data-name="list"]',
      );
      magazineShowcase
        .querySelectorAll<HTMLElement>(
          '[data-name="list"] [data-name="card"]',
        )
        .forEach((rail) => rail.classList.add("live-preview-rail"));

      const initializedRails = new Set<HTMLElement>();
      const setupPreviewRail = (rail: HTMLElement) => {
        if (initializedRails.has(rail) || rail.children.length === 0) return;
        initializedRails.add(rail);
        rail.setAttribute("role", "region");
        rail.setAttribute("tabindex", "0");
        rail.setAttribute("aria-label", "콘텐츠 카드 슬라이더");

        let pointerId: number | null = null;
        let startX = 0;
        let startScrollLeft = 0;
        let dragged = false;

        const updateCardWidth = () => {
          const firstCard = rail.firstElementChild as HTMLElement | null;
          if (firstCard) {
            rail.style.setProperty(
              "--preview-card-width",
              `${firstCard.offsetWidth}px`,
            );
          }
        };
        const snapToClosestCard = () => {
          const cards = Array.from(rail.children) as HTMLElement[];
          if (!cards.length) return;
          const railCenter = rail.scrollLeft + rail.clientWidth / 2;
          const closest = cards.reduce((nearest, card) =>
            Math.abs(card.offsetLeft + card.offsetWidth / 2 - railCenter) <
            Math.abs(
              nearest.offsetLeft + nearest.offsetWidth / 2 - railCenter,
            )
              ? card
              : nearest,
          );
          rail.scrollTo({
            left:
              window.innerWidth < 1025
                ? closest.offsetLeft -
                  (rail.clientWidth - closest.offsetWidth) / 2
                : closest.offsetLeft,
            behavior: reducedMotion ? "auto" : "smooth",
          });
        };
        const moveByCard = (direction: number) => {
          const cards = Array.from(rail.children) as HTMLElement[];
          if (!cards.length) return;
          const railCenter = rail.scrollLeft + rail.clientWidth / 2;
          const currentIndex = cards.reduce(
            (nearestIndex, card, index) =>
              Math.abs(card.offsetLeft + card.offsetWidth / 2 - railCenter) <
              Math.abs(
                cards[nearestIndex].offsetLeft +
                  cards[nearestIndex].offsetWidth / 2 -
                  railCenter,
              )
                ? index
                : nearestIndex,
            0,
          );
          const target =
            cards[
              Math.max(0, Math.min(cards.length - 1, currentIndex + direction))
            ];
          rail.scrollTo({
            left:
              window.innerWidth < 1025
                ? target.offsetLeft -
                  (rail.clientWidth - target.offsetWidth) / 2
                : target.offsetLeft,
            behavior: reducedMotion ? "auto" : "smooth",
          });
        };
        const handlePointerDown = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          pointerId = event.pointerId;
          startX = event.clientX;
          startScrollLeft = rail.scrollLeft;
          dragged = false;
          rail.classList.add("is-dragging");
          rail.setPointerCapture(event.pointerId);
        };
        const handlePointerMove = (event: PointerEvent) => {
          if (pointerId !== event.pointerId) return;
          const distance = event.clientX - startX;
          if (Math.abs(distance) > 4) dragged = true;
          rail.scrollLeft = startScrollLeft - distance;
        };
        const endPointerDrag = (event: PointerEvent) => {
          if (pointerId !== event.pointerId) return;
          pointerId = null;
          rail.classList.remove("is-dragging");
          if (rail.hasPointerCapture(event.pointerId)) {
            rail.releasePointerCapture(event.pointerId);
          }
          if (dragged) snapToClosestCard();
        };
        const handleClick = (event: MouseEvent) => {
          if (!dragged) return;
          event.preventDefault();
          event.stopPropagation();
          dragged = false;
        };
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          moveByCard(event.key === "ArrowLeft" ? -1 : 1);
        };

        const resizeObserver = new ResizeObserver(updateCardWidth);
        resizeObserver.observe(rail);
        updateCardWidth();
        rail.addEventListener("pointerdown", handlePointerDown);
        rail.addEventListener("pointermove", handlePointerMove);
        rail.addEventListener("pointerup", endPointerDrag);
        rail.addEventListener("pointercancel", endPointerDrag);
        rail.addEventListener("click", handleClick, true);
        rail.addEventListener("keydown", handleKeyDown);
        cleanups.push(() => {
          resizeObserver.disconnect();
          rail.removeEventListener("pointerdown", handlePointerDown);
          rail.removeEventListener("pointermove", handlePointerMove);
          rail.removeEventListener("pointerup", endPointerDrag);
          rail.removeEventListener("pointercancel", endPointerDrag);
          rail.removeEventListener("click", handleClick, true);
          rail.removeEventListener("keydown", handleKeyDown);
        });
      };
      const setupPreviewRails = () =>
        magazineShowcase
          .querySelectorAll<HTMLElement>(".live-preview-rail")
          .forEach(setupPreviewRail);

      setupPreviewRails();
      const railObserver = new MutationObserver(setupPreviewRails);
      railObserver.observe(magazineShowcase, {
        childList: true,
        subtree: true,
      });
      cleanups.push(() => railObserver.disconnect());

      const detailHost = document.createElement("div");
      detailHost.className = "live-magazine-detail-host";
      detailHost.hidden = true;
      (originalSub?.parentElement ?? magazineShowcase).insertBefore(
        detailHost,
        originalSub ?? null,
      );
      const detailRoot = createRoot(detailHost);
      cleanups.push(() => detailRoot.unmount());

      const magazineConfigs = [
        {
          name: "어린이과학동아",
          sectionName: "section-8 / kid-sci",
          badges: ["어린이과학동아", "초등 전학년", "한 달에 2권"],
          title: ["최신 과학 이슈부터", "일상의 호기심까지!"],
          body: [
            "다양한 사회 현상을 과학적 시선으로 풀어내,",
            "아이 눈높이에 딱 맞는 생생한 이야기로 전달합니다.",
          ],
          wordmark: "",
          covers: [] as string[],
          accent: "#f12e41",
          replacements: {},
        },
        {
          name: "과학동아",
          sectionName: "section-8 / sci",
          badges: ["과학동아", "중학생 이상", "한 달에 1권"],
          title: ["세상을 바꾸는 과학부터", "미래를 여는 기술까지!"],
          body: [
            "최신 과학 연구와 기술 트렌드를 깊이 있게 다뤄,",
            "과학을 좋아하는 독자에게 새로운 관점을 전합니다.",
          ],
          wordmark: "과학동아",
          covers: [
            `${import.meta.env.BASE_URL}promotion-assets/552aea78799db772.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/f8d4b1f04bf6dbbe.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/d6759cf60dcd8f9c.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/a6bf54a54f9fce89.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/87c03fb9fc81e8fa.webp`,
          ],
          accent: "#2f7bd4",
          replacements: {
            "AI시대 유일한 미래 경쟁력": "과학의 깊이로 세상을 읽는 힘",
            "생각하는 힘": "새로운 관점",
            "서울대, 카이스트 출신 과학 전문 기자가":
              "전문 과학 기자가 전하는",
            "만든 수준 높은 과학·문해력 콘텐츠":
              "최신 연구와 미래 기술 콘텐츠",
          },
        },
        {
          name: "어린이수학동아",
          sectionName: "section-8 / kid-ma",
          badges: ["어린이수학동아", "초등 1~6학년", "한 달에 2권"],
          title: ["수학이 놀이가 되고", "생각하는 힘이 자라요!"],
          body: [
            "생활 속 수학을 재미있는 이야기와 활동으로 풀어내,",
            "아이 스스로 수학적 사고력을 키우도록 도와줍니다.",
          ],
          wordmark: "어린이수학동아",
          covers: [
            `${import.meta.env.BASE_URL}promotion-assets/8b24a8679b19cec9.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/438f32f8631f1b28.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/4a931d90893b44a7.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/3ae8161649d23371.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/a0a787b8f9a3396f.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/18fe6d3e56b472aa.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/45b686c82d24ff45.webp`,
            `${import.meta.env.BASE_URL}promotion-assets/a5fb67b0d18873ac.webp`,
          ],
          accent: "#6d2ef2",
          replacements: {
            "AI시대 유일한 미래 경쟁력": "수학을 좋아하게 만드는",
            "생각하는 힘": "즐거운 발견",
            "서울대, 카이스트 출신 과학 전문 기자가":
              "수학 교육 전문가가 만드는",
            "만든 수준 높은 과학·문해력 콘텐츠":
              "놀이처럼 즐기는 수학·사고력 콘텐츠",
          },
        },
      ];

      const selectMagazineTab = (selectedIndex: number) => {
        const config = magazineConfigs[selectedIndex];
        originalTexts.forEach((text, element) => {
          element.textContent = text;
        });

        config.badges.forEach((text, index) => {
          if (titleTexts[index]) titleTexts[index].textContent = text;
        });
        config.title.forEach((text, index) => {
          if (titleTexts[index + 3]) {
            titleTexts[index + 3].textContent = text;
          }
        });
        config.body.forEach((text, index) => {
          if (titleTexts[index + 5]) {
            titleTexts[index + 5].textContent = text;
          }
        });

        if (wordmark) {
          if (selectedIndex === 0) {
            wordmark.innerHTML = originalWordmark;
            wordmark.classList.remove("live-magazine-wordmark");
          } else {
            wordmark.replaceChildren();
            const label = document.createElement("span");
            label.textContent = config.wordmark;
            wordmark.appendChild(label);
            wordmark.classList.add("live-magazine-wordmark");
            wordmark.style.setProperty("--magazine-accent", config.accent);
          }
        }

        magazineImages.forEach((image, index) => {
          image.src =
            selectedIndex === 0
              ? originalImageSources[index]
              : config.covers[index % config.covers.length];
          image.alt =
            selectedIndex === 0
              ? `${config.name} 표지`
              : `${config.name} ${index % config.covers.length + 1}호 표지`;
        });
        Object.entries(config.replacements).forEach(([from, to]) => {
          Array.from(magazineShowcase.querySelectorAll("p"))
            .filter((element) => normalizeText(element.textContent) === normalizeText(from))
            .forEach((element) => {
              element.textContent = to;
            });
        });

        magazineShowcase.dataset.name = config.sectionName;
        magazineShowcase.setAttribute(
          "aria-label",
          `${config.name} 소개 콘텐츠`,
        );
        if (originalSub) originalSub.hidden = selectedIndex !== 0;
        if (originalList) originalList.hidden = selectedIndex !== 0;
        detailHost.hidden = selectedIndex === 0;
        detailRoot.render(
          selectedIndex === 0 ? null : (
            <MagazineDetailPanel
              kind={selectedIndex === 1 ? "science" : "math"}
            />
          ),
        );
        magazineTabOptions.forEach((option, index) => {
          const selected = index === selectedIndex;
          option.setAttribute("aria-selected", String(selected));
          option.setAttribute("tabindex", selected ? "0" : "-1");
          const label = option.querySelector("p");
          if (label) label.textContent = magazineConfigs[index].name;
        });
      };

      magazineTabs.setAttribute("role", "tablist");
      magazineTabs.setAttribute("aria-label", "잡지 선택");
      magazineShowcase.id = "magazine-showcase";
      magazineTabOptions.forEach((option, index) => {
        option.setAttribute("role", "tab");
        option.setAttribute("aria-controls", "magazine-showcase");
        option.classList.add("live-magazine-tab");
        const chooseTab = () => selectMagazineTab(index);
        const handleTabKeyDown = (event: KeyboardEvent) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            return;
          }
          event.preventDefault();
          const nextIndex =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? magazineTabOptions.length - 1
                : (index +
                    (event.key === "ArrowLeft" ? -1 : 1) +
                    magazineTabOptions.length) %
                  magazineTabOptions.length;
          selectMagazineTab(nextIndex);
          magazineTabOptions[nextIndex].focus();
        };
        option.addEventListener("click", chooseTab);
        option.addEventListener("keydown", handleTabKeyDown);
        cleanups.push(() => {
          option.removeEventListener("click", chooseTab);
          option.removeEventListener("keydown", handleTabKeyDown);
        });
      });
      selectMagazineTab(0);
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div ref={rootRef} className="live-motion-root">
      {children}
    </div>
  );
}
