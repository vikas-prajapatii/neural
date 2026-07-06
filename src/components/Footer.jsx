'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="relative bg-transparent border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-950/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo-icon-blue-final.png" 
                alt="Neural Noir Logo" 
                className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-105" 
              />
              <span className="text-xl font-bold tracking-[0.3em] text-white group-hover:text-cyan-400 transition-colors duration-300">
                NEURAL <span className="text-cyan-400">NOIR</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              An ultra-premium Global AI Video Production Studio. We blend raw creative vision with cutting-edge AI to forge cinematic realities for forward-thinking brands.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">Studio Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Blog</Link>
              </li>
              <li>
                <button onClick={openModal} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">Operations</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              Operating Globally. Borderless Production.
            </p>
            <a 
              href="mailto:hello@neuralnoirstudios.com" 
              className="text-sm text-cyan-400/80 hover:text-cyan-300 font-medium transition-colors"
            >
              hello@neuralnoirstudios.com
            </a>
            <p className="text-sm text-slate-500 mt-2">
              By appointment only.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 Neural Noir Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
