import { profile, type Project, type ProjectLink } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import ExternalLink from "../components/ExternalLink";

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

/** GitHub 로고 (글자 색을 따라감) — 연락처(Contact)에서도 같이 씀 */
export function GitHubIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 shrink-0">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/** 바깥으로 나가는 화살표 ↗ — 마우스를 올리면 오른쪽 위로 살짝 튀어나감 */
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
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
    >
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

/** 링크 버튼: 글자·주소는 profile.ts의 links에서. github.com 주소면 GitHub 아이콘 */
function LinkButton({ link, primary }: { link: ProjectLink; primary: boolean }) {
  const isGitHub = link.href.includes("github.com");
  return (
    <ExternalLink
      href={link.href}
      className={`group inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        primary
          ? "bg-panel-dark text-on-dark hover:bg-dark"
          : "text-panel-dark ring-1 ring-line hover:bg-soft hover:ring-accent/40"
      }`}
    >
      {isGitHub && <GitHubIcon />}
      {link.label}
      {!isGitHub && <ArrowIcon />}
    </ExternalLink>
  );
}

export default function Projects() {
  // profile.ts에 적은 순서 그대로 보여줌 (정렬 없음)
  // Project[]로 명시: ongoing·link·repo를 아무 프로젝트에도 안 적어도 타입 에러가 안 나게
  const projects = profile.projects as Project[];

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
            {/* 설명: 문자열이면 문단, 배열이면 경력 카드와 같은 점 목록 */}
            {Array.isArray(p.description) ? (
              <ul className="mt-3 space-y-1.5 text-muted">
                {p.description.map((d, i) => (
                  <li key={i} className="flex gap-2.5 leading-relaxed">
                    <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
            )}
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
            {/* 링크 버튼: 카드 맨 아래에 붙음 (mt-auto), 첫 번째만 진한 버튼 */}
            {p.links && p.links.length > 0 && (
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {p.links.map((l, i) => (
                  <li key={`${i}-${l.href}`}>
                    <LinkButton link={l} primary={i === 0} />
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>
    </Panel>
  );
}
