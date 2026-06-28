'use client';

import React from 'react';
import { Sparkles, Film, Play, Lock } from 'lucide-react';

export default function Work() {
  return (
    <main className="flex-grow bg-transparent pt-32 pb-24 md:pt-40 md:pb-32 relative z-10 min-h-screen flex flex-col justify-center select-none">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Title Header */}
        <header className="max-w-3xl mb-16 md:mb-24 animate-fade-in-up">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio Vault</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
            OUR WORK <span className="text-slate-500">{"//"}</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CINEMATIC REELS</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
            We are curating our visual archives. Our upcoming reel features frame-consistent characters, lighting synthesis, and custom environments built for visionary brands.
          </p>
        </header>

        {/* Minimalist Grid Placeholder */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="group relative aspect-[16/10] rounded-2xl p-1 bg-gradient-to-tr from-white/5 via-transparent to-transparent border border-white/5 bg-slate-950/20 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-cyan-500/20 flex flex-col justify-between cursor-pointer"
              >
                {/* Decorative Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Top Details */}
                <div className="p-6 flex justify-between items-start z-10">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">ARCHIVE_REEL_0{item}</span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-300">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom details */}
                <div className="p-6 z-10 transition-transform duration-500 group-hover:translate-x-1">
                  <div className="flex items-center space-x-2 text-cyan-400/80 text-[10px] font-semibold uppercase tracking-widest mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 animate-pulse"></div>
                    <span>Restricted Access</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                    Cinematic Vault 0{item}
                  </h3>
                </div>

                {/* Hover Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-5 py-2.5 rounded-full bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider scale-90 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center space-x-1.5">
                    <Play className="w-3 h-3 fill-black" />
                    <span>Decrypting...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Vault Placeholder Footer text */}
        <footer className="mt-16 md:mt-24 border-t border-white/5 pt-8 text-center md:text-left animate-fade-in-up">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em]">
            The vault is being structured. Premium cinematic showcases launching soon.
          </p>
        </footer>

      </div>
    </main>
  );
}
