import { profile } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

export default function About() {
  return (
    <Panel id="about" tone="dark">
      <SectionTitle eyebrow="About" dark>
        소개
      </SectionTitle>
      {/* 모바일: 사진 → 글 (세로), 데스크톱: 글 | 사진 (사진은 스크롤해도 옆에 붙어 있음) */}
      <div className="flex flex-col-reverse gap-12 md:flex-row md:items-start md:gap-14">
        <div className="max-w-3xl flex-1 space-y-5 text-lg leading-relaxed text-on-dark-muted">
          {profile.about.map((p, i) => (
            <Reveal as="p" key={i}>
              {p}
            </Reveal>
          ))}
        </div>
        <Reveal className="w-full max-w-60 self-center md:sticky md:top-28 md:w-64 md:max-w-none md:shrink-0 md:self-start">
          <Photo />
        </Reveal>
      </div>
    </Panel>
  );
}

/**
 * 4:5 세로 사진 칸.
 * 증명사진이 아니어도 정돈돼 보이도록 칸에 꽉 채워 자르고,
 * 아래쪽을 배경색으로 살짝 어둡게 깔아 패널과 자연스럽게 이어지게 합니다.
 */
function Photo() {
  return (
    <div className="relative">
      {/* 뒤에 살짝 비껴 깔린 앰버 테두리 — 사진에 포인트를 줌 */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-accent-light/40"
      />
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-dark ring-1 ring-line-dark">
        {profile.photo ? (
          <>
            <img
              src={profile.photo}
              alt={`${profile.name} 사진`}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ objectPosition: profile.photoPosition }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-panel-dark/60 via-transparent to-transparent"
            />
          </>
        ) : (
          // 사진을 넣기 전까지 보이는 빈 자리
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-on-dark-muted/60">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-xs tracking-wide">photo</span>
          </div>
        )}
      </div>
    </div>
  );
}
