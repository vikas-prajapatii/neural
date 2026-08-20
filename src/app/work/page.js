'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const workVideos = [
  {
    id: 3,
    src: '/work-3.mp4',
    title: 'Luxury Jewelry Campaign',
    shortTitle: 'Luxury Jewelry',
    tagline: 'ELEGANCE IN FOCUS',
    category: 'PRODUCT AD',
    duration: '0:23',
    aspect: 'landscape',
    client: 'Elysian Gemworks',
    agency: 'Neural Creative NYC',
    director: 'Marcus Vance',
    producer: 'Helen Power / Gerri McCarthy',
    postProduction: 'Neural Noir Studios',
    aiGeneration: 'Neural Noir Labs',
    views: '3.1K views',
    time: '2 weeks ago',
    description: 'Ultra-precise macro visual detailing of precious metal textures and luxury gemstone sparkle synthesis.'
  },
  {
    id: 1,
    src: '/work-1.mp4',
    title: 'Vlog Casual Type Video Production',
    shortTitle: 'Vlog & Casual',
    tagline: 'CASUAL STORIES, CINEMATIC GRADE',
    category: 'BRAND REEL',
    duration: '0:26',
    aspect: 'landscape',
    client: 'Vlog Collective',
    agency: 'BarkleyOKRP',
    director: 'Alex Rivers',
    producer: 'Áine O\'Donnell',
    postProduction: 'Neural Noir Studios',
    aiGeneration: 'Generative Diffusion Nets',
    views: '2.4K views',
    time: '3 days ago',
    description: 'High-energy commercial montage blending dynamic AI motion graphics with product aesthetics.'
  },
  {
    id: 2,
    src: '/work-2.mp4',
    title: 'Neural Noir Theme Film',
    shortTitle: 'Neural Noir',
    tagline: 'SHADOWS OF THE FUTURE',
    category: 'CINEMATIC NOIR',
    duration: '0:14',
    aspect: 'landscape',
    client: 'Noir Syndicate',
    agency: 'WebStorm Labs',
    director: 'Marcus Vance',
    producer: 'Helen Power',
    postProduction: 'Neural Noir Studios',
    aiGeneration: 'Neural World-Builder',
    views: '1.8K views',
    time: '1 week ago',
    description: 'Atmospheric brand intro showcasing consistent character workflows and shadow rendering.'
  },
  {
    id: 4,
    src: '/work-4.mp4',
    title: 'Midnight Scent Narrative',
    shortTitle: 'Midnight Scent',
    tagline: 'FLUID REFLECTIONS',
    category: 'COSMETICS',
    duration: '0:10',
    aspect: 'vertical',
    client: 'Midnight Paris',
    agency: 'Aesthetic Alliance',
    director: 'Sasha Chen',
    producer: 'Gerri McCarthy',
    postProduction: 'Neural Noir Studios',
    aiGeneration: 'Temporal Stabilization Core',
    views: '12K views',
    time: '5 days ago',
    description: 'Abstract visual storytelling focusing on fluidity, reflection maps, and upscale product rendering.'
  },
  {
    id: 5,
    src: '/work-5.mp4',
    title: 'Elysian Perfume Commercial',
    shortTitle: 'Elysian Perfume',
    tagline: 'SCENT OF DIFFUSION',
    category: 'FASHION AD',
    duration: '0:09',
    aspect: 'vertical',
    client: 'Elysian Fashion',
    agency: 'BarkleyOKRP',
    director: 'Chris Boyle',
    producer: 'Áine O\'Donnell / Helen Power',
    postProduction: 'Neural Noir Studios',
    aiGeneration: 'Neural Noir Labs',
    views: '8.5K views',
    time: '4 days ago',
    description: 'Dynamic character interaction coupled with premium material textures for high-end beauty brand campaigns.'
  }
];

function PrivateIslandVideoCard({ video, isFeatured }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isHovered) {
      videoEl.muted = true;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Catch standard browser autoplay restrictions
        });
      }
    } else {
      videoEl.pause();
      try {
        videoEl.currentTime = 0;
      } catch (e) {}
    }
  }, [isHovered]);

  return (
    <div 
      className={`relative w-full overflow-hidden bg-neutral-950 cursor-pointer group ${
        isFeatured ? 'aspect-[21/9]' : 'aspect-[16/9]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
        muted
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Centered Overlay Title - minimal Private Island style */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/15 transition-all duration-500 z-20">
        <h3 className="text-white text-sm md:text-lg font-semibold tracking-[0.25em] uppercase group-hover:scale-105 transition-transform duration-500 font-sans pointer-events-none text-center px-4">
          {video.shortTitle || video.title}
        </h3>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <main className="flex-grow bg-[#02040c] pt-32 pb-24 md:pt-40 md:pb-32 relative z-10 min-h-screen flex flex-col justify-center">
      {/* Background ambient radial gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 w-full mb-12">
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        {/* Title Header */}
        <header className="max-w-3xl animate-fade-in-up">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio Vault</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CINEMATIC REELS</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
            Browse our latest ultra-premium visual archives. Each clip features frame-consistent character generation, physical lighting synthesis, and custom environment design.
          </p>
        </header>
      </div>

      {/* Video Portfolio Grid: Private Island Style */}
      <section className="w-full bg-black border-y border-neutral-900/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          {workVideos.map((video, idx) => (
            <Link 
              key={video.id} 
              href={`/work/${video.id}`} 
              className={`block w-full ${idx === 4 ? 'md:col-span-2' : ''}`}
            >
              <PrivateIslandVideoCard 
                video={video} 
                isFeatured={idx === 4} 
              />
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Footer info text */}
        <footer className="mt-16 border-t border-white/5 pt-8 text-center md:text-left animate-fade-in-up">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em]">
            Visual archive active. Fresh cinematic showcases compiled weekly.
          </p>
        </footer>
      </div>
    </main>
  );
}
