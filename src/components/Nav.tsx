import { useEffect, useState } from "react";
import { profile } from "../data/profile";


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
        scrolled ? "bg-dark/60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-10">
        <a href="#top" className="text-lg font-bold text-on-dark">
          프론트엔드 {profile.name}
        </a>
      </nav>
    </header>
  );
}
