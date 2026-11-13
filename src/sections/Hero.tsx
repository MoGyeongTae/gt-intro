import { useEffect, useRef } from "react";
import { profile } from "../data/profile";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  // 스크롤할수록 히어로 글자는 위로 밀리며 흐려지고, 배경 빛은 천천히 커집니다.
  // 히어로 자체는 제자리에 멈춰 있고, 아래 패널이 그 위를 덮으며 올라옵니다.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = sectionRef.current?.offsetHeight ?? 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - p);
        contentRef.current.style.transform = `translateY(${-p * 80}px) scale(${1 - p * 0.06})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `scale(${1 + p * 0.35})`;
      }
      // 소개 패널이 덮어 올수록 히어로 전체가 어두워집니다.
      if (shadeRef.current) {
        shadeRef.current.style.opacity = String(p ** 2 * 0.55);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="sticky top-0 flex min-h-svh items-center overflow-hidden bg-dark text-on-dark"
    >
      {/* 배경 장식: 은은한 빛과 격자. 처음 들어올 때 살짝 줌아웃됩니다. */}
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-0">
        <div
          ref={glowRef}
          className="absolute -top-1/4 right-[-15%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(251_191_36/0.16),transparent)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
      </div>

      <div ref={contentRef} className="relative mx-auto w-full max-w-5xl px-6 pt-16 pb-24 sm:px-10">
        <p className="hero-intro text-sm font-semibold tracking-wide text-accent-light">
          안녕하세요
        </p>
        <p
          className="hero-intro mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted sm:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          {profile.tagline}
        </p>
        <h1
          className="hero-intro mt-4 text-4xl leading-tight font-bold sm:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {profile.name}입니다.
        </h1>
        <div className="hero-intro mt-10 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
          <a
            href="#projects"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-panel-dark transition-opacity hover:opacity-90"
          >
            프로젝트 보기
          </a>
        </div>
      </div>

      {/* 스크롤 안내 */}
      <div
        aria-hidden
        className="hero-intro absolute bottom-10 left-1/2 -translate-x-1/2 text-on-dark-muted"
        style={{ animationDelay: "800ms" }}
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-line-dark pt-2">
          <span className="scroll-dot h-2 w-1 rounded-full bg-on-dark-muted" />
        </div>
      </div>

      {/* 덮일 때 깔리는 어두운 막 */}
      <div
        ref={shadeRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
      />
    </section>
  );
}
