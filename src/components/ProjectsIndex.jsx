import React from 'react';
import { Star } from 'lucide-react';

const Item = ({ idx }) => (
  <div className="relative group rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 overflow-hidden">
    <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-500/10 via-red-500/10 to-slate-200/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
    <div className="relative z-10">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
          <Star className="w-3.5 h-3.5 text-yellow-400" />
          Blank #{idx + 1}
        </div>
        <span className="text-[10px] text-zinc-500">Coming Soon</span>
      </div>
      <div className="mt-4 h-24 rounded-md bg-[conic-gradient(at_20%_20%,_#1f2937,_#111827,_#1f2937)] border border-zinc-800" />
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      <p className="mt-3 text-sm text-zinc-400">
        Reserved space for a personal project. Details will drop here.
      </p>
    </div>
  </div>
);

const ProjectsIndex = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Item key={i} idx={i} />
      ))}
    </div>
  );
};

export default ProjectsIndex;
