import { profile } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

export default function Skills() {
  return (
    <Panel id="skills" tone="light">
      <SectionTitle eyebrow="Skills">다루는 기술</SectionTitle>
      <dl className="divide-y divide-line border-y border-line">
        {Object.entries(profile.skills).map(([group, items]) => (
          <Reveal key={group} className="py-6 sm:flex sm:items-center sm:gap-8">
            <dt className="w-32 shrink-0 font-bold">{group}</dt>
            <dd className="mt-3 flex flex-wrap gap-2 sm:mt-0">
              {items.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-soft px-4 py-1.5 text-sm font-medium text-panel-dark"
                >
                  {s}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Panel>
  );
}
