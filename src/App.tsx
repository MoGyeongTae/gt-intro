import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { profile } from "./data/profile";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="relative -mt-(--radius-panel) rounded-t-(--radius-panel) bg-footer text-on-dark-muted">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm sm:px-10">
          © {new Date().getFullYear()} {profile.name}
        </div>
      </footer>
    </>
  );
}
