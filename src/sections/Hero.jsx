import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiArrowDownTray, HiArrowRight } from "react-icons/hi2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profileStats, titles } from "../data/portfolio.js";
import { splitChars } from "../utils/splitText.jsx";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Palette (scoped to this hero only, via arbitrary Tailwind values):   */
/*  Vellum        #F6F2E7  – light background                          */
/*  Cyanotype ink #0B2036  – dark background                           */
/*  Signal amber  #E2A63B  – single accent / primary CTA                */
/*  Blueprint line#3D6B94  – schematic strokes (light mode)             */
/*  Phosphor mint #8FE3C8  – schematic strokes/glow (dark mode)         */
/* ------------------------------------------------------------------ */

function MagneticCTA({ href, download, variant = "primary", children }) {
  const ref = useRef(null);

  const move = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    gsap.to(ref.current, {
      x: x * 0.28,
      y: y * 0.32,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const leave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1,0.4)",
    });
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-[#E2A63B] text-[#0B2036] hover:bg-[#eab654]"
      : "border border-dashed border-[#3D6B94]/50 text-[#0B2036] hover:bg-[#3D6B94]/10 dark:border-[#8FE3C8]/40 dark:text-[#F6F2E7] dark:hover:bg-[#8FE3C8]/10";

  return (
    <a
      href={href}
      download={download}
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}

function RulerStat({ value, suffix, label }) {
  const numRef = useRef(null);

  useEffect(() => {
    const proxy = { val: 0 };
    const anim = gsap.to(proxy, {
      val: value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numRef.current,
        start: "top 90%",
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = `${Math.round(proxy.val)}${suffix}`;
        }
      },
    });
    return () => anim.kill();
  }, [value, suffix]);

  return (
    <div className="dimension-ruler flex-1 pt-3 text-[#3D6B94] dark:text-[#8FE3C8]">
      <strong
        ref={numRef}
        className="block text-3xl font-bold text-[#0B2036] dark:text-[#F6F2E7]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        0{suffix}
      </strong>
      <span
        className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-[#0B2036]/60 dark:text-[#F6F2E7]/60"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
    </div>
  );
}

function SystemMap() {
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: "top 75%" },
      });

      tl.to(path, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" })
        .fromTo(
          ".map-node",
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=1.4",
        )
        .fromTo(
          ".map-label",
          { opacity: 0 },
          { opacity: 1, stagger: 0.08, duration: 0.4 },
          "-=0.6",
        )
        .add(() => {
          const proxy = { t: 0 };
          gsap.to(proxy, {
            t: 1,
            duration: 6,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
              const point = path.getPointAtLength(proxy.t * length);
              dot.setAttribute("cx", point.x);
              dot.setAttribute("cy", point.y);
            },
          });
        });
    }, wrapRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[440px]">
      <svg
        viewBox="0 0 440 260"
        className="w-full overflow-visible text-[#3D6B94] dark:text-[#8FE3C8]"
        fill="none"
      >
        {/* faint frame, like a drawing sheet border */}
        <rect
          x="4"
          y="4"
          width="432"
          height="252"
          rx="6"
          className="stroke-current opacity-20"
          strokeWidth="1"
        />

        {/* connecting loop */}
        <path
          ref={pathRef}
          d="M75,55 L365,55 L365,205 L75,205 Z"
          className="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* edge labels */}
        <text
          x="220"
          y="45"
          textAnchor="middle"
          className="map-label fill-current text-[9px] uppercase tracking-widest opacity-70"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          fetch()
        </text>
        <text
          x="220"
          y="222"
          textAnchor="middle"
          className="map-label fill-current text-[9px] uppercase tracking-widest opacity-70"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          200 response
        </text>
        <text
          x="382"
          y="133"
          textAnchor="middle"
          className="map-label fill-current text-[9px] uppercase tracking-widest opacity-70"
          transform="rotate(90 382 133)"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          infer()
        </text>
        <text
          x="58"
          y="133"
          textAnchor="middle"
          className="map-label fill-current text-[9px] uppercase tracking-widest opacity-70"
          transform="rotate(-90 58 133)"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          query
        </text>

        {/* traveling packet */}
        <circle
          ref={dotRef}
          r="4.5"
          className="fill-[#E2A63B]"
          cx="75"
          cy="55"
        />

        {/* nodes */}
        {[
          { x: 40, y: 32, title: "CLIENT", sub: "React · Vite" },
          { x: 330, y: 32, title: "API", sub: "Node · FastAPI" },
          { x: 330, y: 182, title: "AI LAYER", sub: "RAG · LLM" },
          { x: 40, y: 182, title: "DATABASE", sub: "MongoDB" },
        ].map((node) => (
          <g
            className="map-node"
            key={node.title}
            transform={`translate(${node.x}, ${node.y})`}
          >
            <rect
              width="70"
              height="46"
              rx="6"
              className="fill-[#F6F2E7] stroke-current dark:fill-[#0B2036]"
              strokeWidth="1.5"
            />
            <text
              x="35"
              y="20"
              textAnchor="middle"
              className="fill-current text-[10px] font-bold tracking-wide"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {node.title}
            </text>
            <text
              x="35"
              y="33"
              textAnchor="middle"
              className="fill-current text-[8px] opacity-60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {node.sub}
            </text>
          </g>
        ))}
      </svg>

      <span
        className="absolute -bottom-7 right-0 text-[10px] uppercase tracking-[0.2em] text-[#0B2036]/50 dark:text-[#F6F2E7]/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        rev. 4.2 — system map
      </span>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTitleIndex((index) => (index + 1) % titles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-pill",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      )
        .fromTo(
          ".hero-char",
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.025 },
          "-=0.2",
        )
        .fromTo(
          ".hero-role",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.3",
        )
        .fromTo(
          ".hero-pitch",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2",
        )
        .fromTo(
          ".hero-cta > *",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          ".hero-map",
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.9 },
          "-=0.7",
        );

      gsap.to(".hero-grid", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#F6F2E7] px-5 pb-20 pt-36 text-[#0B2036] dark:bg-[#0B2036] dark:text-[#F6F2E7]"
      id="home"
      ref={heroRef}
    >
      {/* quiet graph-paper backdrop, single subtle color, no gradients */}
      <div className="hero-grid pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(61,107,148,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(61,107,148,0.08)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:bg-[linear-gradient(to_right,rgba(143,227,200,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(143,227,200,0.06)_1px,transparent_1px)]" />

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span
            className="hero-pill inline-flex items-center gap-2 rounded-full border border-dashed border-[#3D6B94]/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#0B2036]/80 dark:border-[#8FE3C8]/40 dark:text-[#F6F2E7]/80"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="size-1.5 animate-pulse rounded-full bg-[#E2A63B]" />
            status — available for new builds
          </span>

          <h1
            className="mt-6 overflow-hidden text-[clamp(3rem,8.5vw,6.8rem)] font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {splitChars("Ayush Pandey").map(({ key, value }) => (
              <span className="hero-char inline-block" key={key}>
                {value}
              </span>
            ))}
          </h1>

          <div
            className="hero-role mt-5 flex items-center gap-2 text-lg font-medium text-[#3D6B94] dark:text-[#8FE3C8]"
            style={{ fontFamily: "var(--font-mono)" }}
            aria-live="polite"
          >
            <span aria-hidden>&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={titles[titleIndex]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="caret" aria-hidden>
              _
            </span>
          </div>

          <p className="hero-pitch mt-6 max-w-xl text-base leading-8 text-[#0B2036]/75 dark:text-[#F6F2E7]/70">
            I design and ship full-stack systems — React interfaces, Node and
            FastAPI services, and the AI layers that connect them — built to
            hold up long after launch, not just at the demo.
          </p>

          <div className="hero-cta mt-9 flex flex-wrap gap-3">
            <MagneticCTA href="/projects" variant="primary">
              View projects
              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticCTA>
            <MagneticCTA href="/resume.pdf" download variant="secondary">
              <HiArrowDownTray />
              Résumé
            </MagneticCTA>
            <MagneticCTA href="/contact" variant="secondary">
              Get in touch
            </MagneticCTA>
          </div>
        </div>

        <div className="hero-map flex justify-center lg:justify-end">
          <SystemMap />
        </div>
      </div>

      <div className="relative mx-auto mt-20 flex w-full max-w-[1180px] flex-wrap gap-8 border-t border-[#3D6B94]/20 pt-6 dark:border-[#8FE3C8]/15">
        {profileStats.map((stat) => (
          <RulerStat
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#0B2036]/50 dark:text-[#F6F2E7]/40"
        style={{ fontFamily: "var(--font-mono)" }}
        aria-label="Scroll to about"
      >
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiArrowDown />
        </motion.span>
      </a>
    </section>
  );
}
