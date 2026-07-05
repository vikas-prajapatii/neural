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
            <div className="flex space-x-5 mt-6">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200" aria-label="YouTube">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200" aria-label="Discord">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </a>
            </div>
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
