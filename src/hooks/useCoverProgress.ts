import { useEffect, type RefObject } from "react";

/**
 * 바로 다음 요소(다음 패널, 마지막이면 푸터)가 이 요소를 얼마나 덮었는지 0~1로 계산해
 * 스크롤할 때마다 onProgress로 넘겨줍니다.
 *
 * 0 = 다음 요소가 아직 화면 아래에 있음
 * 1 = 다음 요소의 위쪽이 화면 맨 위까지 올라옴 (완전히 덮임)
 */
export function useCoverProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const next = el.nextElementSibling ?? el.parentElement?.nextElementSibling;
    if (!next) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const nextTop = next.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (vh - nextTop) / vh));
      onProgress(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
    // onProgress는 ref만 만지는 함수라 한 번만 등록해도 됩니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
