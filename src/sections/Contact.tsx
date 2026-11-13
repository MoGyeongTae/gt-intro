import { profile } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

export default function Contact() {
  const { email, github, blog } = profile.contact;

  return (
    <Panel id="contact" tone="dark">
      <SectionTitle eyebrow="Contact" dark>
        연락처
      </SectionTitle>
      <Reveal delay={120} className="mt-10 flex flex-wrap gap-3 text-sm font-semibold">
        {email && (
          <a
            href={`mailto:${email}`}
            className="rounded-full bg-white px-6 py-3 text-panel-dark hover:opacity-90"
          >
            {email}
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line-dark px-6 py-3 text-on-dark hover:bg-white/10"
          >
            GitHub
          </a>
        )}
        {blog && (
          <a
            href={blog}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line-dark px-6 py-3 text-on-dark hover:bg-white/10"
          >
            Blog
          </a>
        )}
      </Reveal>
    </Panel>
  );
}
