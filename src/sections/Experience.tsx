import { profile } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

export default function Experience() {
  return (
    <Panel id="experience" tone="light">
      <SectionTitle eyebrow="Experience">경력</SectionTitle>
      <ol className="relative space-y-12 border-l-2 border-line pl-8 sm:pl-10">
        {profile.experience.map((e) => (
          <Reveal as="li" key={`${e.company}-${e.period}`} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-4 border-white bg-accent sm:-left-[49px]"
            />
            <p className="text-sm font-semibold text-accent">{e.period}</p>
            <h3 className="mt-1 text-xl font-bold">
              {e.company} <span className="font-medium text-muted">· {e.role}</span>
            </h3>
            <p className="mt-3 leading-relaxed">{e.summary}</p>
            {e.highlights && (
              <ul className="mt-3 space-y-1.5 text-muted">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="text-accent">
                      ·
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>
    </Panel>
  );
}
