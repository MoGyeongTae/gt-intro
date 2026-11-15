import { profile, type Project } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

/** "진행중" 배지: 점이 은은하게 퍼지는 애니메이션 (움직임 줄이기 설정이면 멈춤) */
function OngoingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      진행중
    </span>
  );
}

/** 진행 중이면 기간 끝을 "현재"로 채워서 보여줌 ("2026.10" → "2026.10 - 현재") */
function formatPeriod(period: string, ongoing?: boolean) {
  return ongoing && !period.includes("-") ? `${period} - 현재` : period;
}

export default function Projects() {
  // 진행 중인 프로젝트를 앞으로 (나머지는 profile.ts에 적은 순서 그대로)
  // Project[]로 명시: ongoing·link·repo를 아무 프로젝트에도 안 적어도 타입 에러가 안 나게
  const projects = [...(profile.projects as Project[])].sort(
    (a, b) => Number(!!b.ongoing) - Number(!!a.ongoing),
  );

  return (
    <Panel id="projects" tone="soft">
      <SectionTitle eyebrow="Projects">그 외 프로젝트</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            as="article"
            key={p.title}
            delay={(i % 2) * 120}
            className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-line"
          >
            {/* 카드 폭이 좁아서 기간·진행중 배지는 제목 위에 작게 */}
            {(p.period || p.ongoing) && (
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {p.ongoing && <OngoingBadge />}
                {p.period && (
                  <p className="text-sm font-medium text-muted tabular-nums">
                    {formatPeriod(p.period, p.ongoing)}
                  </p>
                )}
              </div>
            )}
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-panel-dark"
                >
                  {s}
                </li>
              ))}
            </ul>
            {(p.link || p.repo) && (
              <div className="mt-auto flex gap-2 pt-6 text-sm font-semibold">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-panel-dark px-4 py-2 text-on-dark hover:opacity-90"
                  >
                    사이트
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full px-4 py-2 ring-1 ring-line hover:bg-soft"
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </Panel>
  );
}
