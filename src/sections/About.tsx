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
      <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-on-dark-muted">
        {profile.about.map((p, i) => (
          <Reveal as="p" key={i}>
            {p}
          </Reveal>
        ))}
      </div>
    </Panel>
  );
}
