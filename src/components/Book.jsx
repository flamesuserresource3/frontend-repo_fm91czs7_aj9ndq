import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Page = ({ index, flipped, onClick, children }) => {
  return (
    <div
      className={`absolute inset-0 origin-left transition-transform duration-700 [transform-style:preserve-3d] ${
        flipped ? '[transform:rotateY(-180deg)] z-0' : 'z-10'
      }`}
      onClick={onClick}
      role="button"
      aria-label={`Page ${index + 1}`}
    >
      <div className="absolute inset-0 bg-zinc-50 text-zinc-900 [backface-visibility:hidden] p-6">
        {children}
      </div>
      <div className="absolute inset-0 bg-zinc-100 [backface-visibility:hidden] [transform:rotateY(180deg)] border-l border-zinc-200" />
    </div>
  );
};

const Book = () => {
  const [page, setPage] = useState(0);
  const totalPages = 6;

  const pages = useMemo(() => new Array(totalPages).fill(0).map((_, i) => i), [totalPages]);
  const clamp = useCallback((n) => Math.max(0, Math.min(totalPages, n)), [totalPages]);

  const containerRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);

  const onPointerDown = (e) => {
    isPointerDown.current = true;
    rotationRef.current.startX = e.clientX;
    rotationRef.current.startY = e.clientY;
    rotationRef.current.baseY = rotationRef.current.y;
    rotationRef.current.baseX = rotationRef.current.x;
  };
  const onPointerMove = (e) => {
    if (!isPointerDown.current) return;
    const dx = e.clientX - rotationRef.current.startX;
    const dy = e.clientY - rotationRef.current.startY;
    rotationRef.current.x = rotationRef.current.baseX + dx * 0.04;
    rotationRef.current.y = rotationRef.current.baseY + dy * -0.04;
    containerRef.current.style.transform = `rotateX(${rotationRef.current.y}deg) rotateY(${rotationRef.current.x}deg)`;
  };
  const onPointerUp = () => {
    isPointerDown.current = false;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.7)]" />
          <span className="inline-block w-2 h-2 rounded-full bg-slate-200/90" />
          <span className="ml-3 text-xs uppercase tracking-widest">Industrial Edition</span>
        </div>
        <div className="text-sm text-zinc-400">Page {page}/{totalPages}</div>
      </div>

      <div className="relative mx-auto w-full max-w-4xl">
        <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-red-500/10 to-slate-200/10 rounded-3xl blur-2xl pointer-events-none" />

        <div className="relative grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <button
            onClick={() => setPage((p) => clamp(p - 1))}
            className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 hover:border-blue-500/60 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          <div
            className="relative w-[720px] max-w-full h-[460px] sm:h-[520px] md:h-[560px] bg-zinc-800/60 rounded-lg border border-zinc-700/60 shadow-2xl overflow-visible"
          >
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-14 w-2 bg-gradient-to-b from-slate-300 to-zinc-400 rounded" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-14 w-2 bg-gradient-to-b from-slate-300 to-zinc-400 rounded" />

            <div className="absolute inset-0 grid grid-cols-2 gap-0 p-0" style={{ perspective: '1600px' }}>
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-l-md border-r border-zinc-700" />
                <div
                  ref={containerRef}
                  className="absolute inset-4 bg-zinc-200 rounded-l-md shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] [transform-style:preserve-3d] transition-transform"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-l-md" />
                  <div className="absolute left-2 top-0 bottom-0 w-1 bg-zinc-300/70" />

                  {pages.map((i) => (
                    <Page key={i} index={i} flipped={i < page} onClick={() => setPage((p) => (i >= p ? clamp(i + 1) : p))}>
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs uppercase tracking-widest text-zinc-500">Project</div>
                          <div className="text-2xl font-extrabold text-zinc-800">Blank Page {i + 1}</div>
                          <div className="mt-2 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
                          <div className="mt-6 text-sm text-zinc-500">Content coming soon</div>
                        </div>
                      </div>
                    </Page>
                  ))}
                </div>
              </div>

              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-r-md border-l border-zinc-700" />
                <div className="absolute inset-4 bg-zinc-50 rounded-r-md shadow-[inset_0_0_20px_rgba(0,0,0,0.25)]">
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-r-md" />
                  <div className="absolute right-2 top-0 bottom-0 w-1 bg-zinc-200/80" />

                  <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-widest text-zinc-500">About</div>
                      <div className="text-2xl font-extrabold text-zinc-800">Cover</div>
                      <div className="mt-2 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
                      <p className="mt-6 text-sm text-zinc-600 max-w-sm">
                        Drag to tilt. Click pages to flip. Built with sharp edges, metal vibes, and bold contrasts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPage((p) => clamp(p + 1))}
            className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 hover:border-red-500/60 hover:text-white transition"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
