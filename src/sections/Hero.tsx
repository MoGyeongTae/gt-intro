import { useEffect, useRef } from "react";
import { profile } from "../data/profile";
import HeroBackdrop from "../components/HeroBackdrop";

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
      {/* 배경: 흐르는 오로라 + 커서 스포트라이트. 처음 들어올 때 살짝 줌아웃됩니다. */}
      <HeroBackdrop auroraRef={glowRef} />

      <div ref={contentRef} className="relative mx-auto w-full max-w-5xl px-6 pt-16 pb-24 sm:px-10">
        {/*
          코드(읽는) 순서: 안녕하세요 → 이름(h1) → 소개 문구
            - 스크린리더가 "안녕하세요, 모경태입니다, 디테일을…" 순으로 자연스럽게 읽음
          화면(보이는) 순서: 안녕하세요 → 소개 문구 → 이름  (order로 자리만 바꿈)
          등장 애니메이션은 화면 순서대로 위에서 아래로 120ms씩
        */}
        <div className="flex flex-col">
          {/* 코드 주석처럼 보이는 인사말 (// 는 장식이라 스크린리더에서 숨김) */}
          <p className="hero-intro font-mono text-sm font-semibold tracking-wide text-accent-light sm:text-base">
            <span aria-hidden className="mr-2 text-on-dark-muted/60">
              //
            </span>
            안녕하세요
          </p>
          {/* 이름만 앰버 그라디언트 + 한 번 빛이 훑고 지나감, 끝에 깜빡이는 커서 */}
          <h1
            className="hero-intro order-3 mt-4 text-5xl leading-tight font-bold tracking-tight sm:text-7xl"
            style={{ animationDelay: "240ms" }}
          >
            <span className="name-shine">{profile.name}</span>입니다.
            <span
              aria-hidden
              className="caret ml-2 inline-block h-[0.85em] w-[0.1em] translate-y-[0.1em] rounded-sm bg-accent-light"
            />
          </h1>
          <p
            className="hero-intro order-2 mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted sm:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            {profile.tagline}
          </p>
        </div>
        <div className="hero-intro mt-10 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
          <a
            href="#experience"
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
