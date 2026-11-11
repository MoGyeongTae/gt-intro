import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/*
  화면에 들어올 때 아래에서 위로 떠오르며 나타나는 래퍼.
  한 번 나타나면 다시 숨지 않습니다.

  - delay를 주지 않으면: 같은 순간에 화면에 들어온 요소끼리 순서대로 70ms씩 늦게 나타납니다.
    (최대 4단계까지만 늦춤 → 항목이 아무리 많아도 280ms 이상 기다리지 않음)
  - delay(ms)를 주면: 그 값을 그대로 씁니다. 제목·소제목처럼 순서가 고정된 곳에 쓰세요.
    목록에 i * 60 처럼 순번을 곱해 주면 뒤쪽 항목이 몇 초씩 기다리게 되니 피하세요.
*/

const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 4;

/** 아직 나타나지 않은 요소들 */
const pending = new Set<Element>();
let observer: IntersectionObserver | null = null;
let frame = 0;

function reveal(el: Element) {
  el.classList.add("is-in");
  pending.delete(el);
  observer?.unobserve(el);
}

/*
  스크롤이 아주 빠르면 요소가 화면을 한 번도 "걸치지" 않고
  화면 아래 → 화면 위로 건너뛸 수 있습니다. 이 경우 IntersectionObserver는 알려 주지 않으므로,
  스크롤할 때 "이미 화면 위로 지나간" 요소를 찾아 바로 보이게 합니다.
*/
function revealPassed() {
  frame = 0;
  for (const el of pending) {
    if (el.getBoundingClientRect().bottom < 0) {
      (el as HTMLElement).style.setProperty("--reveal-delay", "0ms");
      reveal(el);
    }
  }
}

function onScroll() {
  if (!frame && pending.size) frame = requestAnimationFrame(revealPassed);
}

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        let step = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.autoDelay !== undefined) {
            el.style.setProperty(
              "--reveal-delay",
              `${Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS}ms`,
            );
            step++;
          }
          reveal(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  return observer;
}

export default function Reveal({
  as: Tag = "div",
  delay,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    pending.add(el);
    io.observe(el);
    return () => {
      pending.delete(el);
      io.unobserve(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-auto-delay={delay === undefined ? "" : undefined}
      style={delay === undefined ? undefined : ({ "--reveal-delay": `${delay}ms` } as CSSProperties)}
    >
      {children}
    </Tag>
  );
}
