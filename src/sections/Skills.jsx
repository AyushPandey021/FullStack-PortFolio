import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { skillGroups } from "../data/portfolio.js";
import SectionHeader from "../components/SectionHeader.jsx";

gsap.registerPlugin(ScrollTrigger);

/* Shared tokens with Hero / Navbar:                                   */
/*  Vellum #F6F2E7 · Cyanotype ink #0B2036 · Signal amber #E2A63B       */
/*  Blueprint line #3D6B94 (light) · Phosphor mint #8FE3C8 (dark)       */

function handleTiltMove(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  gsap.to(card, {
    rotateY: x * 7,
    rotateX: -y * 7,
    duration: 0.5,
    ease: "power3.out",
    transformPerspective: 900,
  });
}

function handleTiltLeave(event) {
  gsap.to(event.currentTarget, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.6,
    ease: "power3.out",
  });
}

/* the signature "flip" interaction the icons do on hover — a full     */
/* 3D spin around the Y axis, like a component chip being turned over  */
function handleIconFlip(event) {
  gsap.fromTo(
    event.currentTarget,
    { rotateY: 0 },
    {
      rotateY: 360,
      duration: 0.7,
      ease: "power2.inOut",
      transformPerspective: 400,
      overwrite: "auto",
    }
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const orbitSkills = skillGroups.flatMap((group) => group.skills.slice(0, 2)).slice(0, 8);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".skill-icon-3d",
        { y: 20, rotateX: -50, rotateY: 26, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          stagger: 0.035,
          duration: 0.75,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.utils.toArray(".skill-bar-fill").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: bar, start: "top 92%" },
          }
        );
      });

      gsap.utils.toArray(".skill-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, rotateX: -8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });

      gsap.fromTo(
        ".orbit-tick",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.02,
          duration: 0.3,
          scrollTrigger: { trigger: ".orbit-panel", start: "top 75%" },
        }
      );

      gsap.to(".skills-orbit-ring", {
        rotate: 360,
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".skills-orbit-chip", {
        y: -8,
        duration: 2.4,
        ease: "sine.inOut",
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#F6F2E7] px-5 py-28 dark:bg-[#0B2036]"
      id="skills"
      ref={sectionRef}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(61,107,148,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(61,107,148,0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:bg-[linear-gradient(to_right,rgba(143,227,200,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(143,227,200,0.05)_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="skills — system.02"
          title="A practical stack for modern product teams."
          copy="Frontend polish, backend reliability, database confidence, cloud delivery, and AI application design in one focused toolkit."
          align="center"
        />

        <div className="orbit-panel mb-8 grid items-center gap-8 overflow-hidden rounded-lg border border-dashed border-[#3D6B94]/30 bg-[#F6F2E7]/60 p-7 backdrop-blur-xl dark:border-[#8FE3C8]/20 dark:bg-[#0B2036]/40 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative grid min-h-[320px] place-items-center [perspective:900px]">
            {/* dial ticks, like an instrument bezel */}
            <div className="absolute aspect-square w-[min(320px,80vw)] rounded-full">
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className="orbit-tick absolute left-1/2 top-1/2 h-2 w-px origin-bottom bg-[#3D6B94]/35 dark:bg-[#8FE3C8]/25"
                  style={{
                    transform: `rotate(${i * 10}deg) translateY(-160px)`,
                  }}
                />
              ))}
            </div>

            <div className="skills-orbit-ring absolute aspect-square w-[min(300px,78vw)] rounded-full border border-dashed border-[#3D6B94]/45 [transform-style:preserve-3d] dark:border-[#8FE3C8]/35">
              {orbitSkills.map(([name, _level, Icon], index) => (
                <div
                  className="skills-orbit-chip absolute left-1/2 top-1/2 grid size-14 place-items-center rounded-md border border-dashed border-[#3D6B94]/50 bg-[#F6F2E7] text-[#3D6B94] shadow-[0_14px_34px_rgba(11,32,54,0.1)] dark:border-[#8FE3C8]/40 dark:bg-[#0B2036] dark:text-[#8FE3C8] [&_svg]:size-7"
                  style={{
                    transform: `rotate(${index * 45}deg) translateX(150px) rotate(${-index * 45}deg)`,
                  }}
                  key={name}
                >
                  <Icon />
                </div>
              ))}
            </div>

            <div className="grid size-40 place-items-center rounded-full border border-dashed border-[#E2A63B]/60 bg-[#F6F2E7] shadow-[0_24px_70px_rgba(226,166,59,0.18)] dark:bg-[#0B2036]">
              <strong
                className="text-lg font-bold uppercase tracking-[0.14em] text-[#0B2036] dark:text-[#F6F2E7]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                core
              </strong>
              <span
                className="text-[10px] uppercase tracking-[0.14em] text-[#0B2036]/50 dark:text-[#F6F2E7]/50"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                stack.rev4
              </span>
            </div>
          </div>

          <div>
            <span
              className="text-[11px] uppercase tracking-[0.14em] text-[#3D6B94] dark:text-[#8FE3C8]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              fig. 02 — component orbit
            </span>
            <h3
              className="mt-2 text-[clamp(1.7rem,4vw,3.4rem)] font-bold leading-none text-[#0B2036] dark:text-[#F6F2E7]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every tool, mapped and measured.
            </h3>
            <p className="mt-5 leading-8 text-[#0B2036]/70 dark:text-[#F6F2E7]/60">
              The instruments rotate around a shared core, each one a component
              in the same build. Hover a card below to flip its icon — a
              small nod to how these tools actually fit together.
            </p>
          </div>
        </div>

        <div className="grid gap-5 [perspective:1200px] lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <article
                className="skill-card skill-tilt rounded-lg border border-dashed border-[#3D6B94]/30 bg-[#F6F2E7]/70 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#E2A63B]/50 dark:border-[#8FE3C8]/20 dark:bg-[#0B2036]/50"
                key={group.title}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="skill-icon-3d relative grid size-14 place-items-center rounded-md border border-dashed border-[#3D6B94]/40 bg-[#F6F2E7] text-[#3D6B94] shadow-[0_14px_30px_rgba(11,32,54,0.08)] dark:border-[#8FE3C8]/30 dark:bg-[#0B2036] dark:text-[#8FE3C8] [&_svg]:size-8"
                      onMouseEnter={handleIconFlip}
                    >
                      <Icon />
                    </span>
                    <h3
                      className="text-2xl font-bold text-[#0B2036] dark:text-[#F6F2E7]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {group.title}
                    </h3>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-[0.14em] text-[#0B2036]/40 dark:text-[#F6F2E7]/35"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    mod.{String(groupIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="grid gap-4">
                  {group.skills.map(([name, level, SkillIcon]) => (
                    <div key={name}>
                      <div className="mb-2 grid grid-cols-[34px_1fr_auto] items-center gap-3 font-semibold text-[#0B2036] dark:text-[#F6F2E7]">
                        <span
                          className="skill-icon-3d grid size-9 place-items-center rounded-md border border-dashed border-[#3D6B94]/35 bg-[#F6F2E7] text-[#3D6B94] dark:border-[#8FE3C8]/25 dark:bg-[#0B2036] dark:text-[#8FE3C8] [&_svg]:size-5"
                          onMouseEnter={handleIconFlip}
                        >
                          <SkillIcon />
                        </span>
                        <span>{name}</span>
                        <small
                          className="text-[#0B2036]/50 dark:text-[#F6F2E7]/45"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          <CountUp end={level} enableScrollSpy scrollSpyOnce duration={1.6} />%
                        </small>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#3D6B94]/12 dark:bg-[#8FE3C8]/12">
                        <i
                          className="skill-bar-fill block h-full origin-left rounded-full bg-[#E2A63B]"
                          style={{ width: `${level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}