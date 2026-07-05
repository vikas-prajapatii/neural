'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';

export default function BlogCTA({ text }) {
  const { openModal } = useModal();

  return (
    <div className="mt-12 p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-tr from-cyan-950/10 to-transparent backdrop-blur-sm text-center space-y-4">
      <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">Ready to Lead the Neural Revolution?</h3>
      <p className="text-neutral-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
        {text}
      </p>
      <button 
        onClick={openModal} 
        className="mt-4 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
      >
        Brief Your Project
      </button>
    </div>
  );
}
