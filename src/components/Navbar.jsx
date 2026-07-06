'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    { name: 'Blog', href: '/blog' },
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
          <Image 
            src="/logo-icon-blue-final.png" 
            alt="Neural Noir Logo" 
            width={32}
            height={32}
            className="object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="text-xl font-bold tracking-[0.3em] text-white group-hover:text-cyan-400 transition-colors duration-300">
            NEURAL <span className="text-cyan-400">NOIR</span>
          </span>
        </a>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-10">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group"
          >
            Home
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            href="/work"
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group"
          >
            Work
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Services Hover Dropdown */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 hover:w-full"></span>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-950/95 backdrop-blur-md rounded-xl shadow-[0_10px_30px_rgba(6,182,212,0.15)] py-2 transition-all duration-300 transform border border-white/10 z-50 ${
              isDropdownOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 pointer-events-none'
            }`}>
              <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950/95 rotate-45 border-t border-l border-white/10"></div>
              
              <Link 
                href="/#services" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-bold text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wider border-b border-white/5"
              >
                All Services
              </Link>
              <Link 
                href="/ai-cinematic-video-production" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wide"
              >
                AI Video Production
              </Link>
              <Link 
                href="/services/short-form-video" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wide"
              >
                Short-Form Video Content
              </Link>
              <Link 
                href="/services/video-ads-production" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wide"
              >
                Video Ads Production
              </Link>
              <Link 
                href="/services/branded-film-production" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wide"
              >
                Branded Film Production
              </Link>
              <Link 
                href="/services/music-ai-video" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wide"
              >
                Music AI Video Content
              </Link>
              <Link 
                href="/services/product-photoshoots" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wide"
              >
                Product Photoshoots
              </Link>
              <Link 
                href="/services/brand-poster-creation" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 uppercase tracking-wide"
              >
                Brand Poster Creation
              </Link>
            </div>
          </div>

          <Link
            href="/blog"
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group"
          >
            Blog
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

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
        <div className="md:hidden absolute top-full left-0 right-0 glass-card border-b border-white/5 py-6 px-6 flex flex-col space-y-4 bg-slate-950/95 shadow-[0_15px_30px_rgba(0,0,0,0.8)] max-h-[85vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Work
          </Link>

          {/* Collapsible Mobile Services */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-base font-medium text-left text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between"
            >
              <span>Services</span>
              <span className={`text-[10px] transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isDropdownOpen && (
              <div className="pl-4 flex flex-col space-y-3.5 border-l border-white/10 mt-1">
                <Link
                  href="/#services"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-xs font-bold text-slate-400 hover:text-cyan-400 uppercase tracking-wider"
                >
                  All Services
                </Link>
                <Link
                  href="/ai-cinematic-video-production"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  AI Video Production
                </Link>
                <Link
                  href="/services/short-form-video"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Short-Form Video Content
                </Link>
                <Link
                  href="/services/video-ads-production"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Video Ads Production
                </Link>
                <Link
                  href="/services/branded-film-production"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Branded Film Production
                </Link>
                <Link
                  href="/services/music-ai-video"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Music AI Video Content
                </Link>
                <Link
                  href="/services/product-photoshoots"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Product Photoshoots
                </Link>
                <Link
                  href="/services/brand-poster-creation"
                  onClick={() => { setMobileMenuOpen(false); setIsDropdownOpen(false); }}
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Brand Poster Creation
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Blog
          </Link>
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
