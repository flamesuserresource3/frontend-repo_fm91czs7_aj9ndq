import React, { useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';

const HeroParallax = () => {
  const containerRef = useRef(null);
  const layer1Ref = useRef(null); // foreground text
  const layer2Ref = useRef(null); // splatter / shapes
  const layer3Ref = useRef(null); // background metal plate

  useEffect(() => {
    const container = containerRef.current;
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (layer1Ref.current) layer1Ref.current.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
      if (layer2Ref.current) layer2Ref.current.style.transform = `translate3d(${x * -20}px, ${y * -15}px, 0) rotate(${x * 2}deg)`;
      if (layer3Ref.current) layer3Ref.current.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
    };

    container.addEventListener('mousemove', onMove);
    return () => container.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <header ref={containerRef} className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <div
        ref={layer3Ref}
        className="absolute inset-[-10%] rounded-[24px] border border-zinc-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black"
      />

      <div
        ref={layer2Ref}
        className="pointer-events-none absolute -top-20 -left-20 w-[140%] h-[140%] opacity-70"
        aria-hidden
      >
        <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="spray" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.3 0.6 0" />
              </feComponentTransfer>
              <feBlend mode="screen" />
            </filter>
          </defs>
          <g opacity="0.45" filter="url(#noise)">
            <circle cx="200" cy="260" r="140" fill="url(#spray)" />
            <circle cx="620" cy="520" r="180" fill="url(#spray)" />
            <rect x="320" y="120" width="180" height="180" fill="url(#spray)" transform="rotate(15 410 210)" />
          </g>
          <g stroke="white" strokeWidth="3" opacity="0.15">
            <path d="M0 400 L800 400" />
            <path d="M400 0 L400 800" />
            <path d="M0 0 L800 800" />
            <path d="M800 0 L0 800" />
          </g>
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 pointer-events-none" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div ref={layer1Ref} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 mb-5">
            <Rocket className="w-4 h-4 text-blue-400" />
            <span className="text-xs tracking-widest uppercase text-zinc-300">Urban Battle Portfolio</span>
          </div>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95]"
            style={{ WebkitTextStroke: '2px #000', textShadow: '0 2px 0 rgba(255,255,255,0.05)' }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-slate-200">
              Grit & Code
            </span>
            <span className="block text-zinc-100">Underground Engineer</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-300">
            Energetic, raw, and industrial. I build powerful digital experiences with an edge. Scroll to flip through the interactive book.
          </p>
          <a
            href="#work"
            className="mt-8 inline-flex items-center gap-3 rounded-md border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:shadow-[0_0_0_2px_rgba(59,130,246,0.7)_inset] transition"
          >
            Enter the Yard
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroParallax;
