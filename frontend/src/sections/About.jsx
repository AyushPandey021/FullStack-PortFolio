import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { aboutFacts, profileStats } from "../data/portfolio.js";
import SectionHeader from "../components/SectionHeader.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".about-card",
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-card",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".about-fact",
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-card",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".about-stat",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-stats",
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-transparent via-soft to-transparent px-5 py-28 dark:via-zinc-950"
      id="about"
      ref={sectionRef}
    >
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="About"
          title="A developer who thinks in systems, interfaces, and outcomes."
          copy="Ayush combines product taste with full-stack execution: crisp interfaces, reliable APIs, database design, AI integrations, and deployment workflows that hold up after launch."
        />

        <div className="about-card gradient-border rounded-lg border border-black/10 bg-white/70 p-7 shadow-premium backdrop-blur-xl dark:border-white/10 dark:bg-panel/70">
          <div className="mb-7 grid gap-3">
            {aboutFacts.map(([label, value]) => (
              <div
                className="about-fact flex justify-between gap-5 rounded-lg border border-black/10 bg-white/70 p-4 transition-colors duration-300 hover:border-ember/30 dark:border-white/10 dark:bg-white/5"
                key={label}
              >
                <span className="text-muted dark:text-zinc-400">{label}</span>
                <strong className="text-right text-ink dark:text-white">
                  {value}
                </strong>
              </div>
            ))}
          </div>
          <div className="about-stats grid overflow-hidden rounded-lg border border-black/10 sm:grid-cols-2 dark:border-white/10">
            {profileStats.map((stat) => (
              <article
                className="about-stat border-b border-black/10 p-6 transition-colors duration-300 hover:bg-ember/5 sm:border-r odd:sm:border-r dark:border-white/10"
                key={stat.label}
              >
                <strong className="block text-4xl font-black text-ink dark:text-white">
                  <CountUp
                    end={stat.value}
                    enableScrollSpy
                    scrollSpyOnce
                    duration={2.4}
                  />
                  {stat.suffix}
                </strong>
                <span className="font-bold text-muted dark:text-zinc-400">
                  {stat.label}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
