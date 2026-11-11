import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const links = [
  { href: "#about", label: "소개" },
  { href: "#experience", label: "경력" },
  { href: "#projects", label: "프로젝트" },
  { href: "#skills", label: "기술" },
  { href: "#contact", label: "연락" },
];

export default function Nav() {
  // 맨 위에서는 투명, 조금이라도 내려가면 배경이 깔립니다.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-dark/85 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-10">
        <a href="#top" className="text-lg font-bold text-on-dark">
          {profile.name}
        </a>
        <ul className="hidden gap-1 text-sm sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-on-dark-muted transition-colors hover:bg-white/10 hover:text-on-dark"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
