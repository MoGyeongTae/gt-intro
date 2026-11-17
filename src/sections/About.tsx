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
 * 사진 카드 — 코드 에디터 창처럼 꾸밈 (히어로의 코드 기호와 같은 분위기)
 *  ─ 위: 창 버튼 3개
 *  ─ 가운데: 4:5 사진 (칸에 꽉 채워 자르고, 아래를 살짝 어둡게)
 *  ─ 뒤: 비껴 깔린 앰버 테두리
 *  마우스를 올리면 사진이 천천히 살짝 확대되고, 뒤 테두리가 조금 더 벌어짐
 */
function Photo() {
  return (
    <div className="group relative">
      {/* 뒤에 살짝 비껴 깔린 앰버 테두리 */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-accent-light/40 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4 motion-reduce:transition-none"
      />

      <figure className="relative overflow-hidden rounded-3xl bg-panel-dark ring-1 ring-line-dark">
        {/* 에디터 창 윗줄: 창 버튼 3개 */}
        <div
          aria-hidden
          className="flex cursor-default gap-1.5 border-b border-line-dark px-4 py-3 select-none"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef6b5e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-light" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5fc56b]" />
        </div>

        <div className="relative aspect-4/5 overflow-hidden bg-dark">
          {profile.photo ? (
            <>
              <img
                src={profile.photo}
                alt={`${profile.name} 사진`}
                loading="lazy"
                decoding="async"
                width={768}
                height={1007}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
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
                <path
                  d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-mono text-xs tracking-wide">photo</span>
            </div>
          )}
        </div>
      </figure>
    </div>
  );
}
