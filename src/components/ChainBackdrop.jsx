import React, { useEffect, useRef } from 'react';

// Industrial chain backdrop with subtle motion and depth
const ChainBackdrop = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * -0.08}px)`; // slight parallax up
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div ref={ref} className="absolute inset-0 opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <pattern id="chainLink" width="120" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
              <g fill="none" stroke="url(#steel)" strokeWidth="6" strokeLinecap="round">
                <rect x="10" y="10" width="100" height="40" rx="20" />
                <rect x="70" y="10" width="100" height="40" rx="20" transform="translate(-60,30) rotate(90 120 30)" />
              </g>
            </pattern>
            <filter id="bevel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.75" specularExponent="20" lightingColor="#fff" result="spec">
                <fePointLight x="-200" y="-200" z="100" />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
              <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#chainLink)" filter="url(#bevel)" />
          <rect width="100%" height="100%" fill="url(#chainLink)" opacity="0.12" transform="scale(1.4)" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
};

export default ChainBackdrop;
