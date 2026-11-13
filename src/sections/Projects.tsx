import { profile } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

export default function Projects() {
  return (
    <Panel id="projects" tone="soft">
      <SectionTitle eyebrow="Projects">그 외 프로젝트</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.projects.map((p, i) => (
          <Reveal
            as="article"
            key={p.title}
            delay={(i % 2) * 120}
            className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-line transition-shadow hover:shadow-lg hover:shadow-panel-dark/5"
          >
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
