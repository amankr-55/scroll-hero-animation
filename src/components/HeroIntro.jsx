import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, TrendingUp, PhoneCall, Sparkles, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function HeroIntro({ onScrollDown }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const badgeRef = useRef(null);
  const subtextRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const headlineText = "W E L C O M E   I T Z F I Z Z";

  const metrics = [
    {
      percentage: 58,
      suffix: "%",
      title: "Increase in pick up point use",
      desc: "Optimized driver dispatch & smart hub routing",
      accent: "from-lime-400 to-emerald-400",
      border: "border-lime-400/40",
      bgGlow: "rgba(222, 245, 79, 0.15)",
      badge: "Peak Surge",
      textColor: "text-[#def54f]"
    },
    {
      percentage: 23,
      suffix: "%",
      title: "Decreased in customer phone calls",
      desc: "Automated real-time tracking transparency",
      accent: "from-sky-400 to-blue-500",
      border: "border-sky-400/40",
      bgGlow: "rgba(106, 201, 255, 0.15)",
      badge: "Friction Drop",
      textColor: "text-[#6ac9ff]"
    },
    {
      percentage: 27,
      suffix: "%",
      title: "Increase in pick up point use",
      desc: "Dynamic multi-modal route synchronization",
      accent: "from-purple-400 to-indigo-500",
      border: "border-purple-400/40",
      bgGlow: "rgba(168, 85, 247, 0.15)",
      badge: "Efficiency",
      textColor: "text-purple-300"
    },
    {
      percentage: 40,
      suffix: "%",
      title: "Decreased in customer phone calls",
      desc: "Instant live telemetry updates & ETA precision",
      accent: "from-amber-400 to-orange-500",
      border: "border-orange-400/40",
      bgGlow: "rgba(250, 115, 40, 0.15)",
      badge: "Support Drop",
      textColor: "text-[#fa7328]"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Initial State Setups
      gsap.set(badgeRef.current, { opacity: 0, y: -20 });
      gsap.set('.hero-letter', { opacity: 0, y: 35, rotateX: -30, filter: 'blur(8px)' });
      gsap.set(subtextRef.current, { opacity: 0, y: 20 });
      gsap.set('.stat-card', { opacity: 0, y: 40, scale: 0.95 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 });

      // 2. Staggered Intro Sequence
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      })
      .to('.hero-letter', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.035,
        ease: 'back.out(1.5)',
      }, '-=0.4')
      .to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.4')
      .to('.stat-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.3')
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.2');

      // 3. Counter Animation for Metrics
      metrics.forEach((metric, index) => {
        const counterEl = document.getElementById(`metric-number-${index}`);
        if (counterEl) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: metric.percentage,
            duration: 1.8,
            delay: 0.6 + index * 0.12,
            ease: 'power2.out',
            onUpdate: () => {
              counterEl.textContent = Math.round(obj.val) + metric.suffix;
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Top Tag & Hero Title Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-2 sm:mt-6">
        {/* Category Pill */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider shadow-lg shadow-emerald-500/10 mb-6"
        >
          <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 animate-pulse" />
          <span>PRECISION SCROLL-DRIVEN HERO ANIMATION</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-400">GSAP + REACT 19</span>
        </div>

        {/* The Letter-Spaced Headline */}
        <h1
          ref={headlineRef}
          className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.35em] text-white uppercase select-none leading-none py-2 drop-shadow-2xl"
          style={{ perspective: 1000 }}
        >
          {headlineText.split('').map((char, index) => (
            <span
              key={index}
              className={`hero-letter inline-block transition-transform hover:text-emerald-400 hover:scale-110 duration-200 ${
                char === ' ' ? 'w-4 sm:w-6 md:w-8' : ''
              }`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle Description */}
        <p
          ref={subtextRef}
          className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-400 font-normal leading-relaxed tracking-wide px-4"
        >
          An interactive, scroll-synchronized motorsport experience. Smoothly scrub the page to drive the McLaren supercar, unveil real-time dynamic typography, and trigger impact data telemetry.
        </p>
      </div>

      {/* Impact Metrics / Statistics Row (occupying the first screen above the fold) */}
      <div
        ref={statsRef}
        className="w-full max-w-6xl mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2"
      >
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`stat-card group relative p-5 rounded-2xl bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 border ${metric.border} backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between`}
            style={{
              boxShadow: `0 8px 24px -6px ${metric.bgGlow}`
            }}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white transition-colors">
                {metric.badge}
              </span>
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${metric.accent}`} />
            </div>

            {/* Percentage Number */}
            <div className="flex items-baseline gap-1 my-1">
              <span
                id={`metric-number-${i}`}
                className={`font-black text-4xl sm:text-5xl tracking-tight ${metric.textColor} drop-shadow-md`}
              >
                0{metric.suffix}
              </span>
            </div>

            {/* Title & Description */}
            <div className="mt-2 pt-2 border-t border-white/5">
              <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-emerald-300 transition-colors">
                {metric.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {metric.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Down Prompter */}
      <div
        ref={scrollIndicatorRef}
        onClick={onScrollDown}
        className="cursor-pointer group flex flex-col items-center gap-2 pt-2 pb-2 text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-400 group-hover:text-emerald-300">
          Scroll Down To Engage Supercar
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-zinc-600 group-hover:border-emerald-400 flex items-start justify-center p-1.5 transition-colors">
          <div className="w-1.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
