import type { CSSProperties } from "react";
import { profile, type Experience as ExperienceItem, type Work } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

/** 바깥으로 나가는 화살표 ↗ — 마우스를 올리면 오른쪽 위로 살짝 튀어나감 (group-hover) */
function ArrowIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1 inline-block h-3.5 w-3.5 -translate-y-px align-middle text-muted transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none"
    >
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

/** 맡은 프로젝트 카드: 프로젝트명(링크 있으면 ↗) → 부연 설명 → 사용 기술 태그 */
function WorkCard({ work }: { work: Work }) {
  const { name, period, description, stack, link } = work;

  return (
    // 테두리 대신 아주 옅은 미색 배경 → 회사 정보보다 한 단계 낮은 위계
    <Reveal as="article" className="rounded-2xl bg-soft/60 p-4 sm:p-6">
      {/* 넓은 화면: 프로젝트명 왼쪽 · 기간 오른쪽 / 좁은 화면: 기간이 프로젝트명 아래로 */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h4 className="font-bold">
          {link ? (
            // 링크가 있으면 프로젝트명 자체가 링크 (새 탭)
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-sm underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {name}
              <ArrowIcon />
              <span className="sr-only">(새 탭에서 열림)</span>
            </a>
          ) : (
            name
          )}
        </h4>
        {period && (
          <p className="shrink-0 text-sm text-muted tabular-nums">{period}</p>
        )}
      </div>

      {typeof description === "string" && (
        <p className="mt-2 leading-relaxed text-muted">{description}</p>
      )}
      {Array.isArray(description) && description.length > 0 && (
        <ul className="mt-2 space-y-1.5 text-muted">
          {description.map((d, i) => (
            // 같은 문장이 두 번 나와도 되도록 순번을 key로
            <li key={i}className="flex gap-2.5 leading-relaxed">
              {/* 첫 줄 가운데에 맞춘 둥근 점 */}
              <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}

      {stack && stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="사용 기술">
          {stack.map((s) => (
            <li
              key={s}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-panel-dark ring-1 ring-line"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

export default function Experience() {
  return (
    <Panel id="experience" tone="light">
      <SectionTitle eyebrow="Experience">경력</SectionTitle>
      {/* 모바일은 들여쓰기를 줄여 카드 폭 확보 */}
      <ol className="relative space-y-16 border-l-2 border-line pl-5 sm:pl-10">
        {(profile.experience as ExperienceItem[]).map((e) => (
          <li key={`${e.company}-${e.period}`} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[29px] h-4 w-4 rounded-full border-4 border-white bg-accent sm:-left-[49px]"
            />
            {/* 회사 정보 */}
            <Reveal>
              {/*
                회사 로고: 가로로 긴 로고라 높이 기준으로 맞추고 폭은 비율대로.
                기본 28px (모바일 24px), 로고마다 logoHeight로 보정 가능.
                회사명이 바로 아래 글자로 있으니 alt=""로 장식 처리 (스크린리더가 두 번 읽지 않게)
              */}
              {e.logo && (
                <img
                  src={e.logo}
                  alt=""
                  decoding="async"
                  className="mb-4 h-[calc(var(--logo-h)*6/7)] w-auto max-w-full object-contain object-left sm:h-(--logo-h)"
                  style={{ "--logo-h": `${e.logoHeight ?? 28}px` } as CSSProperties}
                />
              )}
              <p className="text-sm font-semibold text-accent">{e.period}</p>
              <h3 className="mt-1 text-xl font-bold">
                {e.company} <span className="font-medium text-muted">· {e.role}</span>
              </h3>
              <p className="mt-3 leading-relaxed">{e.summary}</p>
            </Reveal>

            {/* 맡은 프로젝트 */}
            {e.works && e.works.length > 0 && (
              <div className="mt-8 space-y-3">
                {e.works.map((w, i) => (
                  // 프로젝트명이 겹쳐도 되도록 순번을 같이 씀
                  <WorkCard key={`${i}-${w.name}`} work={w} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Panel>
  );
}
