import { profile } from "../data/profile";
import Panel from "../components/Panel";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import ExternalLink from "../components/ExternalLink";
import { GitHubIcon } from "./Projects";

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
          <ExternalLink
            href={github}
            className="inline-flex items-center gap-2 rounded-full border border-line-dark px-6 py-3 text-on-dark hover:bg-white/10"
          >
            <GitHubIcon />
            GitHub
          </ExternalLink>
        )}
        {blog && (
          <ExternalLink
            href={blog}
            className="rounded-full border border-line-dark px-6 py-3 text-on-dark hover:bg-white/10"
          >
            Blog
          </ExternalLink>
        )}
      </Reveal>
    </Panel>
  );
}
