import React from 'react';
import HeroParallax from './components/HeroParallax';
import ChainBackdrop from './components/ChainBackdrop';
import Book from './components/Book';
import ProjectsIndex from './components/ProjectsIndex';

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-x-hidden">
      <ChainBackdrop />
      <HeroParallax />

      <main id="work" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Interactive Book
          </h2>
          <p className="text-zinc-300 mb-8 max-w-2xl">
            Flip through the pages to explore my work. Pages are intentionally left blank for now — the structure is ready to showcase projects soon.
          </p>
          <Book />
        </section>

        <section>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Project Index
          </h2>
          <p className="text-zinc-300 mb-8 max-w-2xl">
            A quick at-a-glance list. Details will be filled in as pieces drop.
          </p>
          <ProjectsIndex />
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-800/70 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-zinc-400">
          Built with an Urban/Industrial vibe — distressed textures, bold contrast, and gritty energy.
        </div>
      </footer>
    </div>
  );
}

export default App;
