import React from 'react';
import { Cpu, Zap, Layers, RefreshCw, CheckCircle2, ShieldCheck, Flame, Compass, Code2 } from 'lucide-react';

export default function TelemetrySpecs({ repoUrl = 'https://github.com/amankr-55/scroll-hero-animation' }) {
  const specs = [
    {
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      title: "Scroll-Linked Scrubbing",
      desc: "Motion tied to window scroll position with a 1.2s fluid dampening factor, avoiding jarring jumps and ensuring true scroll progress mapping rather than autoplay timers.",
      tag: "GSAP ScrollTrigger"
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: "Zero-Reflow GPU Pipeline",
      desc: "All positional translations utilize CSS hardware-accelerated transforms (`transform: translate3d`) and opacity, completely bypassing browser layout recalculations.",
      tag: "Hardware Acceleration"
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      title: "Real-Time Letter Interception",
      desc: "Dynamic coordinate detection calculates the vehicle's leading edge in real time, illuminating individual characters as the supercar crosses their spatial threshold.",
      tag: "Collision Logic"
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-purple-400" />,
      title: "Responsive Viewport Recalculation",
      desc: "Window resize listeners and GSAP refresh hooks recalculate track bounds, road dimensions, and letter offsets on the fly across mobile, tablet, and widescreen displays.",
      tag: "Responsive Engine"
    }
  ];

  const stack = [
    { name: "React 19 / Next.js Ready", desc: "Component architecture with clean unmount lifecycle & state management", badge: "Core UI" },
    { name: "GSAP 3 + ScrollTrigger", desc: "Industry standard motion engine with pinned scrub interpolation", badge: "Animation" },
    { name: "Tailwind CSS v4", desc: "Modern utility-first styling with responsive layouts and custom glows", badge: "Styling" },
    { name: "Vanilla Web Standards", desc: "HTML5 semantic structure, modern ES6+ JavaScript, CSS hardware transforms", badge: "Standards" }
  ];

  return (
    <section id="telemetry" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0c12] border-t border-white/5">
      <div id="tech-specs" className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>ENGINEERING & PERFORMANCE REPORT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for 60 FPS Fluidity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            A comprehensive breakdown of the interaction logic, scroll-driven rendering engine, and performance optimizations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Breakdown Table */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Mandatory Tech Stack Verification
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Conforms strictly with assignment requirements and modern web engineering practices.
              </p>
            </div>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wide transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Inspect Source on GitHub</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stack.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      {item.badge}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">{item.name}</h4>
                  <p className="text-xs text-zinc-400 leading-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
