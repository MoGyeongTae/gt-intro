import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionTitle({
  eyebrow,
  children,
  dark = false,
}: {
  eyebrow: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-12">
      <Reveal
        as="p"
        className={`text-sm font-semibold tracking-wide ${dark ? "text-accent-light" : "text-accent"}`}
      >
        {eyebrow}
      </Reveal>
      <Reveal as="h2" delay={80} className="mt-2 text-3xl font-bold sm:text-4xl">
        {children}
      </Reveal>
    </div>
  );
}
