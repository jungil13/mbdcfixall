import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Stats } from "./components/stats";
import { Projects } from "./components/projects";
import { WhyUs } from "./components/why-us";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
        scrollbarWidth: "none",
      }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; }
        ::placeholder { color: rgba(255,255,255,0.25) !important; opacity: 1; }
      `}</style>

      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Projects />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}
