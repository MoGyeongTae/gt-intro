import { useEffect, useRef, type Ref } from "react";
import FloatingGlyphs from "./FloatingGlyphs";

/*
  히어로 배경 효과
  ─ 흐르는 오로라: 따뜻한 빛 덩어리 3개가 서로 다른 속도로 천천히 떠다님 (CSS 애니메이션)
  ─ 떠다니는 코드 기호: 마우스 쪽으로 살짝 따라 움직임 (패럴랙스)
       · 마우스 위치를 화면 가운데 기준 -1 ~ 1 값(--px, --py)으로 바꿔 기호들에 넘겨줌
       · 마우스가 없거나(터치 기기) 히어로 밖에 있으면 가운데 주변을 천천히 맴돔
       · 목표 위치를 바로 따라가지 않고 부드럽게 쫓아감(lerp)

  성능·접근성
  ─ 무거운 캔버스 없이 그라디언트 + CSS 변수만 사용
  ─ 히어로가 화면에서 가려지거나 탭이 숨겨지면 움직임 계산을 멈춤
  ─ "움직임 줄이기" 설정이면 오로라와 기호 모두 제자리에
*/

const GRID = "56px 56px";
const GRID_LINES = (color: string) =>
  `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;

export default function HeroBackdrop({ auroraRef }: { auroraRef?: Ref<HTMLDivElement> }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 움직임 줄이기: 기호 제자리 (기본값 0 그대로)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setParallax = (x: number, y: number) => {
      const r = root.getBoundingClientRect();
      root.style.setProperty("--px", ((x - r.width / 2) / (r.width / 2)).toFixed(3));
      root.style.setProperty("--py", ((y - r.height / 2) / (r.height / 2)).toFixed(3));
    };

    const center = () => {
      const r = root.getBoundingClientRect();
      return { x: r.width / 2, y: r.height / 2, w: r.width, h: r.height };
    };

    let cur = { x: center().x, y: center().y };
    let mouse: { x: number; y: number } | null = null;
    let t = 0;
    let frame = 0;
    let visible = true;

    const tick = () => {
      frame = 0;
      const c = center();
      t += 0.004;
      // 마우스가 히어로 위에 있으면 그 위치, 아니면 가운데 주변을 천천히 맴돔
      const target = mouse ?? {
        x: c.x + Math.cos(t) * c.w * 0.18,
        y: c.y + Math.sin(t * 1.3) * c.h * 0.16,
      };
      // 남은 거리의 10%씩 다가감 → 부드럽게 쫓아오는 느낌
      cur = { x: cur.x + (target.x - cur.x) * 0.1, y: cur.y + (target.y - cur.y) * 0.1 };
      setParallax(cur.x, cur.y);
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // 터치는 자동 움직임 유지
      const r = root.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      mouse = inside ? { x: e.clientX - r.left, y: e.clientY - r.top } : null;
    };
    const onLeave = () => (mouse = null);

    // 히어로가 화면에 보일 때만 계산
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(root);
    const onVisibility = () => start();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="hero-bg pointer-events-none absolute inset-0">
      {/* 오로라: 스크롤하면 Hero에서 이 묶음 전체를 천천히 키웁니다 (auroraRef) */}
      <div ref={auroraRef} className="absolute inset-0">
        <div className="aurora aurora-1 absolute top-[-25%] right-[-10%] h-[65vmax] w-[65vmax] rounded-full bg-[radial-gradient(closest-side,rgb(245_158_11/0.22),transparent)]" />
        <div className="aurora aurora-2 absolute top-[20%] right-[20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(closest-side,rgb(180_83_9/0.26),transparent)]" />
        <div className="aurora aurora-3 absolute bottom-[-30%] left-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgb(253_230_138/0.08),transparent)]" />
      </div>

      {/* 기본 격자 (옅게, 오른쪽 위로 갈수록 보임) */}
      <div
        className="absolute inset-0 mask-[radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
        style={{ backgroundImage: GRID_LINES("rgb(255 255 255 / 0.04)"), backgroundSize: GRID }}
      />

      {/* 떠다니는 코드 기호 — 마우스 쪽으로 살짝 따라 움직임 */}
      <FloatingGlyphs />
    </div>
  );
}
