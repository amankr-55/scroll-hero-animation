import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Zap, Play, RotateCcw, Volume2, VolumeX, Compass, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrackSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);
  const headlineWrapperRef = useRef(null);

  // Audio synthesis ref for supercar engine rumble
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Telemetry HUD state
  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeGear, setActiveGear] = useState('1ST');
  const [activeColor, setActiveColor] = useState('green'); // 'green' | 'cyan' | 'orange' | 'purple'
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const headlineLetters = [
    'W', 'E', 'L', 'C', 'O', 'M', 'E',
    ' ',
    'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'
  ];

  // Color themes for the velocity trail & road illumination
  const colorThemes = {
    green: {
      trailBg: 'linear-gradient(90deg, rgba(69,219,125,0.92) 0%, #45db7d 100%)',
      trailGlow: '0 0 35px rgba(69, 219, 125, 0.75)',
      accentHex: '#45db7d',
      name: 'Emerald Nitro'
    },
    cyan: {
      trailBg: 'linear-gradient(90deg, rgba(56,189,248,0.92) 0%, #06b6d4 100%)',
      trailGlow: '0 0 35px rgba(6, 182, 212, 0.75)',
      accentHex: '#06b6d4',
      name: 'Electric Cyan'
    },
    orange: {
      trailBg: 'linear-gradient(90deg, rgba(251,146,60,0.92) 0%, #fa7328 100%)',
      trailGlow: '0 0 35px rgba(250, 115, 40, 0.75)',
      accentHex: '#fa7328',
      name: 'McLaren Papaya'
    },
    purple: {
      trailBg: 'linear-gradient(90deg, rgba(168,85,247,0.92) 0%, #9333ea 100%)',
      trailGlow: '0 0 35px rgba(168, 85, 247, 0.75)',
      accentHex: '#a855f7',
      name: 'Ultraviolet Drift'
    }
  };

  // Toggle synthesized engine rumble
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(45, ctx.currentTime);

        // Lowpass filter for deep engine purr
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        audioCtxRef.current = ctx;
        oscRef.current = osc;
        gainNodeRef.current = gain;
        setSoundEnabled(true);
      } catch (e) {
        console.warn('AudioContext not allowed without gesture', e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
        oscRef.current = null;
        gainNodeRef.current = null;
      }
      setSoundEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const letters = lettersRef.current.filter(Boolean);

    if (!section || !track || !road || !car || !trail) return;

    let letterPositions = [];

    const calculatePositions = () => {
      const roadRect = road.getBoundingClientRect();
      letterPositions = letters.map((letter) => {
        if (!letter) return 0;
        const rect = letter.getBoundingClientRect();
        return rect.left - roadRect.left + rect.width / 2;
      });
    };

    // Initial position calculation after layout pass
    const timer = setTimeout(calculatePositions, 100);

    const ctx = gsap.context(() => {
      // Main Master Timeline pinned to scroll
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400', // Deep scrub distance for buttery smooth control
          pin: track,
          scrub: 1.2, // Silk-smooth interpolation inertia
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: calculatePositions,
          onUpdate: (self) => {
            const prog = self.progress;
            setProgress(Math.round(prog * 100));

            // Dynamic velocity calculation (0 to 328 km/h)
            const currentSpeed = Math.round(prog * 328);
            setSpeed(currentSpeed);

            // Modulate engine pitch if sound is enabled
            if (oscRef.current && audioCtxRef.current) {
              const targetFreq = 45 + prog * 160;
              oscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.05);
            }

            // Gear shift calculation
            if (prog < 0.15) setActiveGear('1ST');
            else if (prog < 0.35) setActiveGear('2ND');
            else if (prog < 0.55) setActiveGear('3RD');
            else if (prog < 0.75) setActiveGear('4TH');
            else if (prog < 0.90) setActiveGear('5TH');
            else setActiveGear('6TH');

            // Exact Car Head position
            const currentCarX = gsap.getProperty(car, 'x') || 0;
            const currentCarWidth = car.offsetWidth || 150;
            const carTipX = currentCarX + currentCarWidth * 0.7;
            const trailEndX = currentCarX + currentCarWidth * 0.35;

            // Update trail width seamlessly
            gsap.set(trail, { width: Math.max(0, trailEndX) });

            // Reveal letters as car passes them
            letters.forEach((letter, i) => {
              const letterCenter = letterPositions[i];
              if (letterCenter && carTipX >= letterCenter) {
                if (!letter.classList.contains('revealed')) {
                  letter.classList.add('revealed');
                  gsap.to(letter, {
                    opacity: 1,
                    scale: 1,
                    color: '#090a0f',
                    textShadow: '0 0 10px rgba(0,0,0,0.15)',
                    duration: 0.2,
                    overwrite: 'auto'
                  });
                }
              } else {
                if (letter.classList.contains('revealed')) {
                  letter.classList.remove('revealed');
                  gsap.to(letter, {
                    opacity: 0.12,
                    scale: 0.96,
                    color: '#e4e4e7',
                    textShadow: 'none',
                    duration: 0.2,
                    overwrite: 'auto'
                  });
                }
              }
            });
          }
        }
      });

      // 1. Car Translation across Road
      mainTl.fromTo(
        car,
        { x: 0 },
        {
          x: () => {
            const roadWidth = road.offsetWidth;
            const carWidth = car.offsetWidth || 150;
            return roadWidth - carWidth;
          },
          ease: 'none',
          duration: 1
        },
        0
      );

      // 2. Box 1: 58% (Top, ~12% - 30%)
      mainTl.fromTo(
        '#track-box1',
        { opacity: 0, y: -25, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.18 },
        0.12
      );

      // 3. Box 2: 23% (Bottom, ~32% - 50%)
      mainTl.fromTo(
        '#track-box2',
        { opacity: 0, y: 25, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.18 },
        0.32
      );

      // 4. Box 3: 27% (Top, ~54% - 72%)
      mainTl.fromTo(
        '#track-box3',
        { opacity: 0, y: -25, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.18 },
        0.54
      );

      // 5. Box 4: 40% (Bottom, ~74% - 92%)
      mainTl.fromTo(
        '#track-box4',
        { opacity: 0, y: 25, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.18 },
        0.74
      );

    }, sectionRef);

    const handleResize = () => {
      calculatePositions();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  // Hands-free Auto Cruise Mode
  const triggerAutoCruise = () => {
    if (isAutoPlaying) return;
    setIsAutoPlaying(true);

    const startPos = sectionRef.current.offsetTop;
    const targetPos = startPos + 2200;

    gsap.fromTo(
      window,
      { scrollTo: startPos },
      {
        scrollTo: targetPos,
        duration: 4.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsAutoPlaying(false);
        }
      }
    );
  };

  const resetToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="track-section"
      ref={sectionRef}
      className="relative w-full bg-[#090a0f] text-white"
      style={{ height: '330vh' }}
    >
      {/* Sticky Pinned Viewport Container */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0a0b10] via-[#111219] to-[#090a0f] border-y border-white/5"
      >
        {/* Top HUD Telemetry Bar */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 sm:pt-20 pb-2 flex flex-wrap items-center justify-between gap-3 z-30">
          
          {/* Speedometer & Gear */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-zinc-900/90 border border-white/10 px-3.5 py-1.5 sm:py-2 rounded-xl backdrop-blur-md shadow-lg">
              <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 stroke-[2.5]" />
              <div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">Telemetry Speed</div>
                <div className="font-mono font-bold text-lg sm:text-2xl text-white tracking-wider flex items-baseline gap-1">
                  <span>{speed}</span>
                  <span className="text-[10px] sm:text-xs text-zinc-400 font-normal">KM/H</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-white/10 px-3 py-1.5 sm:py-2 rounded-xl backdrop-blur-md shadow-lg">
              <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">Gear</div>
              <div className="font-mono font-black text-lg sm:text-2xl text-emerald-400">
                {activeGear}
              </div>
            </div>
          </div>

          {/* Center Progress HUD */}
          <div className="hidden md:flex flex-col items-center gap-1 flex-1 max-w-xs mx-4">
            <div className="w-full flex justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                TRACK SPRINT SCRUB
              </span>
              <span className="text-emerald-400 font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: `${progress}%`,
                  background: colorThemes[activeColor].trailBg,
                  boxShadow: colorThemes[activeColor].trailGlow
                }}
              />
            </div>
          </div>

          {/* Controls: Sound & Theme Switcher */}
          <div className="flex items-center gap-2">
            {/* Audio Engine Button */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute Supercar Engine" : "Enable Supercar Sound"}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                  : 'bg-zinc-900/90 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Color Palette Switcher */}
            <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-white/10 p-1.5 rounded-xl">
              {Object.keys(colorThemes).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveColor(key)}
                  title={`Switch to ${colorThemes[key].name}`}
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform cursor-pointer ${
                    activeColor === key ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: colorThemes[key].accentHex }}
                />
              ))}
            </div>

            {/* Auto Cruise Button */}
            <button
              onClick={triggerAutoCruise}
              disabled={isAutoPlaying}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-all cursor-pointer"
            >
              <Play className="w-3 h-3 fill-emerald-400" />
              <span className="hidden sm:inline">{isAutoPlaying ? 'Cruising...' : 'Auto-Scrub'}</span>
            </button>
          </div>
        </div>

        {/* Center Arena: Track, Highway, McLaren Supercar, Dynamic Typography & Impact Boxes */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto px-0 overflow-hidden">
          
          {/* Floating Impact Metric Box 1: 58% (Top Lane, Left-Center) */}
          <div
            id="track-box1"
            className="absolute top-[3%] sm:top-[6%] md:top-[8%] right-[24%] sm:right-[30%] z-30 p-3 sm:p-5 rounded-2xl bg-[#def54f] text-zinc-950 shadow-2xl font-sans max-w-[210px] sm:max-w-[280px] border-2 border-white/50 pointer-events-auto"
            style={{
              boxShadow: '0 15px 35px -5px rgba(222, 245, 79, 0.45)'
            }}
          >
            <span className="font-black text-3xl sm:text-5xl tracking-tight block">58%</span>
            <p className="mt-1 font-bold text-xs sm:text-sm text-zinc-900 leading-snug">
              Increase in pick up point use
            </p>
            <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-800 bg-black/10 px-1.5 py-0.5 rounded w-fit">
              Milestone #1
            </div>
          </div>

          {/* Floating Impact Metric Box 3: 27% (Top Lane, Right) */}
          <div
            id="track-box3"
            className="absolute top-[3%] sm:top-[6%] md:top-[8%] right-[4%] sm:right-[8%] z-30 p-3 sm:p-5 rounded-2xl bg-zinc-900/95 text-white shadow-2xl font-sans max-w-[210px] sm:max-w-[280px] border border-white/20 backdrop-blur-xl pointer-events-auto"
            style={{
              boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.6)'
            }}
          >
            <span className="font-black text-3xl sm:text-5xl tracking-tight text-white block">27%</span>
            <p className="mt-1 font-bold text-xs sm:text-sm text-zinc-200 leading-snug">
              Increase in pick up point use
            </p>
            <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded w-fit">
              Milestone #3
            </div>
          </div>

          {/* Floating Impact Metric Box 2: 23% (Bottom Lane, Left-Center) */}
          <div
            id="track-box2"
            className="absolute bottom-[3%] sm:bottom-[6%] md:bottom-[8%] right-[26%] sm:right-[34%] z-30 p-3 sm:p-5 rounded-2xl bg-[#6ac9ff] text-zinc-950 shadow-2xl font-sans max-w-[210px] sm:max-w-[280px] border-2 border-white/50 pointer-events-auto"
            style={{
              boxShadow: '0 15px 35px -5px rgba(106, 201, 255, 0.45)'
            }}
          >
            <span className="font-black text-3xl sm:text-5xl tracking-tight block">23%</span>
            <p className="mt-1 font-bold text-xs sm:text-sm text-zinc-900 leading-snug">
              Decreased in customer phone calls
            </p>
            <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-800 bg-black/10 px-1.5 py-0.5 rounded w-fit">
              Milestone #2
            </div>
          </div>

          {/* Floating Impact Metric Box 4: 40% (Bottom Lane, Right) */}
          <div
            id="track-box4"
            className="absolute bottom-[3%] sm:bottom-[6%] md:bottom-[8%] right-[4%] sm:right-[10%] z-30 p-3 sm:p-5 rounded-2xl bg-[#fa7328] text-zinc-950 shadow-2xl font-sans max-w-[210px] sm:max-w-[280px] border-2 border-white/50 pointer-events-auto"
            style={{
              boxShadow: '0 15px 35px -5px rgba(250, 115, 40, 0.45)'
            }}
          >
            <span className="font-black text-3xl sm:text-5xl tracking-tight block">40%</span>
            <p className="mt-1 font-bold text-xs sm:text-sm text-zinc-900 leading-snug">
              Decreased in customer phone calls
            </p>
            <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-800 bg-black/10 px-1.5 py-0.5 rounded w-fit">
              Milestone #4
            </div>
          </div>

          {/* THE HIGHWAY / TRACK BAND */}
          <div
            ref={roadRef}
            id="road"
            className="relative w-screen h-[190px] sm:h-[210px] md:h-[230px] bg-[#1a1b22] border-y-4 border-zinc-700 shadow-2xl overflow-hidden flex items-center"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 100%),
                repeating-linear-gradient(90deg, #181920, #181920 40px, #1c1d26 40px, #1c1d26 80px)
              `
            }}
          >
            {/* Curbs (Motorsport red-white kerbs on edges) */}
            <div 
              className="absolute top-0 left-0 right-0 h-2 opacity-80"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #ef4444 0, #ef4444 30px, #ffffff 30px, #ffffff 60px)'
              }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0 h-2 opacity-80"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #ef4444 0, #ef4444 30px, #ffffff 30px, #ffffff 60px)'
              }}
            />

            {/* Dashed Center Road Divider Line */}
            <div 
              className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #e4e4e7 0, #e4e4e7 40px, transparent 40px, transparent 80px)'
              }}
            />

            {/* Glowing Velocity Trail behind car */}
            <div
              ref={trailRef}
              id="trail"
              className="absolute top-0 left-0 h-full z-10 transition-colors pointer-events-none"
              style={{
                width: 0,
                background: colorThemes[activeColor].trailBg,
                boxShadow: colorThemes[activeColor].trailGlow
              }}
            />

            {/* Dynamic Typography (W E L C O M E   I T Z F I Z Z) */}
            <div
              ref={headlineWrapperRef}
              id="valueText"
              className="absolute inset-0 flex items-center justify-start pl-6 sm:pl-12 md:pl-16 z-20 pointer-events-none select-none font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.32em] font-sans whitespace-nowrap"
            >
              {headlineLetters.map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className={`value-letter inline-block transition-all duration-150 ${
                    char === ' ' ? 'w-3 sm:w-6 md:w-10' : ''
                  }`}
                  style={{
                    opacity: 0.12,
                    transform: 'scale(0.96)',
                    color: '#e4e4e7'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>

            {/* The McLaren 720S Supercar */}
            <div
              ref={carRef}
              id="car"
              className="absolute top-1/2 -translate-y-1/2 left-0 z-30 h-[180px] sm:h-[200px] md:h-[220px] flex items-center will-change-transform"
              style={{ width: '160px' }}
            >
              {/* Headlight beam projection forward */}
              <div 
                className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[160px] h-[170px] pointer-events-none opacity-50"
                style={{
                  background: 'radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.7) 0%, rgba(222,245,79,0.25) 35%, transparent 75%)',
                  transform: 'perspective(400px) rotateY(-15deg)'
                }}
              />

              {/* The Car Image */}
              <img
                src="./car.png"
                alt="McLaren 720S Supercar top view"
                className="h-full w-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.85)] filter contrast-110"
                draggable={false}
              />
            </div>

          </div>

        </div>

        {/* Bottom Interactive Telemetry & Scroll Hint */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs text-zinc-400 font-mono border-t border-white/5 z-20">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-semibold">SCRUB ENGINE SYNCED</span>
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline">1.2s Easing Inertia</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-[11px] sm:text-xs">
              {progress < 100 ? 'Scroll to continue sprint' : '🏁 Sprint Complete!'}
            </span>
            <button
              onClick={resetToHero}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
