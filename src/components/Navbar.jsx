'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-md bg-slate-950/60 border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center space-x-3 group"
        >
          <img 
            src="/logo-icon.png" 
            alt="Neural Noir Logo" 
            className="w-9 h-8 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="text-xl font-bold tracking-[0.3em] text-white group-hover:text-cyan-400 transition-colors duration-300">
            NEURAL <span className="text-cyan-400">NOIR</span>
          </span>
        </a>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <button
            onClick={openModal}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group"
          >
            Contact
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={openModal}
            className="relative px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white overflow-hidden group transition-all duration-300 border border-cyan-500/30 bg-slate-950 neon-button-cyan"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative flex items-center gap-1.5">
              Get In Touch <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card border-b border-white/5 py-6 px-6 flex flex-col space-y-4 animate-float">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openModal();
            }}
            className="text-base font-medium text-left text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openModal();
            }}
            className="w-full text-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-500/20 transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
      )}
    </header>
  );
}
