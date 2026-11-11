import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useCoverProgress } from "../hooks/useCoverProgress";

export type PanelTone = "dark" | "light" | "soft";

const toneClass: Record<PanelTone, string> = {
  dark: "bg-panel-dark text-on-dark",
  light: "bg-white text-fg",
  soft: "bg-soft text-fg",
};

/**
 * 모서리가 둥근 섹션 패널.
 * 끝까지 스크롤하면 그 자리에 멈추고(sticky), 다음 패널이 그 위를 덮으며 올라옵니다.
 * 화면보다 긴 패널은 아랫부분이 다 보인 뒤에 멈추도록 top 값을 계산합니다.
 */
export default function Panel({
  id,
  tone,
  children,
}: {
  id: string;
  tone: PanelTone;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // 다음 패널이 덮어 올수록 이 패널은 살짝 작아지고 어두워집니다.
  const shadeRef = useRef<HTMLDivElement>(null);
  useCoverProgress(ref, (p) => {
    const el = ref.current;
    if (!el) return;
    // 화면에 보이는 부분의 가운데를 기준으로 줄어들게 합니다.
    // (긴 패널은 위쪽이 화면 밖에 있으므로 패널 자체의 가운데가 아님)
    const originY = -parseFloat(el.style.top || "0") + window.innerHeight / 2;
    el.style.transformOrigin = `50% ${originY}px`;
    // 다음 패널이 START(85%)만큼 올라올 때까지는 변화 없음.
    // 그 뒤 남은 구간(85% → 100%)을 0 → 1로 다시 펼쳐서 씁니다.
    const START = 0.85;
    const t = Math.max(0, (p - START) / (1 - START));
    // 짧은 구간이라 시작과 끝을 부드럽게 이어 주는 곡선(smoothstep)을 씁니다.
    const e = t * t * (3 - 2 * t);
    el.style.transform = e > 0 ? `scale(${1 - e * 0.05})` : "";
    if (shadeRef.current) shadeRef.current.style.opacity = String(e * 0.25);
  });

  return (
    <section
      ref={ref}
      id={id}
      style={{ top }}
      className={`sticky -mt-(--radius-panel) rounded-t-(--radius-panel) shadow-[0_-12px_40px_-12px_rgb(0_0_0/0.4)] ${toneClass[tone]}`}
    >
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-28 sm:px-10">{children}</div>
      {/* 덮일 때 깔리는 어두운 막 */}
      <div
        ref={shadeRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-t-(--radius-panel) bg-dark opacity-0"
      />
    </section>
  );
}
