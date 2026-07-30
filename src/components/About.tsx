import { AnimatedSection } from "./AnimatedSection";

export function About() {
  return (
    <section
      id="about"
      className="section-padded bg-[#111111] py-28 px-5"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center about-grid">
        {/* Image column */}
        <AnimatedSection variant="left">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Professional repair technician working on property"
              className="w-full object-cover block"
              style={{ height: "clamp(320px, 45vw, 520px)" }}
            />
            {/* Stats badge */}
            <div
              className="about-stats-badge absolute -bottom-8 -right-8 bg-[#E8A020] p-8 w-40 text-center"
            >
              <div className="font-barlow font-black text-[52px] text-[#111111] leading-none">
                25+
              </div>
              <div className="font-dm text-[12px] text-[#111111] font-semibold tracking-[0.05em] mt-1">
                YEARS OF EXCELLENCE
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Text column */}
        <AnimatedSection variant="right" delay={150}>
          <div>
            <div className="flex items-center gap-[10px] mb-5">
              <div className="w-8 h-[2px] bg-[#E8A020]" />
              <span className="font-dm text-[12px] tracking-[0.18em] text-[#E8A020] font-medium">
                WHO WE ARE
              </span>
            </div>

            <h2 className="font-barlow font-extrabold text-[clamp(30px,4vw,54px)] leading-[1.05] text-white uppercase mb-5">
              CEBU&apos;S GO-TO
              <br />
              <span className="text-[#E8A020]">REPAIR</span> SPECIALISTS
            </h2>

            <p className="font-dm text-[clamp(14px,1.8vw,16px)] leading-[1.75] text-white/70 mb-5 font-light">
              Founded in 1999, MBDC FIX ALL has grown into Cebu&apos;s most trusted
              property repair and facility services company. We handle all types of home
              and commercial repairs — from minor fixes to major renovations — serving
              Cebu City and the surrounding municipalities.
            </p>

            <p className="font-dm text-[clamp(14px,1.8vw,16px)] leading-[1.75] text-white/70 mb-8 font-light">
              Our team of licensed engineers, skilled tradespeople, and responsive
              service teams bring speed, precision, and Filipino craftsmanship to every
              repair job — so you can get back to normal, fast.
            </p>

            {/* Key service pillars */}
            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Property Repair",
                  desc: "Structural, plumbing, electrical, flooring, roofing — all handled.",
                },
                {
                  label: "Maintenance",
                  desc: "Scheduled and preventive programs to keep your property in top shape.",
                },
                {
                  label: "Facility Services",
                  desc: "End-to-end facility management for homes and commercial properties.",
                },
              ].map((v) => (
                <div key={v.label} className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-[#E8A020] mt-[9px] shrink-0" />
                  <div>
                    <span className="font-barlow font-bold text-[16px] text-white tracking-[0.05em]">
                      {v.label}
                    </span>
                    <span className="font-dm text-[14px] text-white/55 ml-2">
                      — {v.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
