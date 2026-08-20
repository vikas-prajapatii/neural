'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

const workVideos = [
  {
    id: 3,
    src: '/work-3.mp4',
    title: 'Luxury Jewelry Campaign',
    category: 'PRODUCT AD',
    duration: '0:23',
    aspect: 'landscape',
    views: '3.1K views',
    time: '2 weeks ago',
    description: 'Ultra-precise macro visual detailing of precious metal textures and luxury gemstone sparkle synthesis.'
  },
  {
    id: 1,
    src: '/work-1.mp4',
    title: 'Vlog Casual Type Video Production',
    category: 'BRAND REEL',
    duration: '0:26',
    aspect: 'landscape',
    views: '2.4K views',
    time: '3 days ago',
    description: 'High-energy commercial montage blending dynamic AI motion graphics with product aesthetics.'
  },
  {
    id: 2,
    src: '/work-2.mp4',
    title: 'Neural Noir Theme Film',
    category: 'CINEMATIC NOIR',
    duration: '0:14',
    aspect: 'landscape',
    views: '1.8K views',
    time: '1 week ago',
    description: 'Atmospheric brand intro showcasing consistent character workflows and shadow rendering.'
  },
  {
    id: 4,
    src: '/work-4.mp4',
    title: 'Midnight Scent Narrative',
    category: 'COSMETICS',
    duration: '0:10',
    aspect: 'vertical',
    views: '12K views',
    time: '5 days ago',
    description: 'Abstract visual storytelling focusing on fluidity, reflection maps, and upscale product rendering.'
  },
  {
    id: 5,
    src: '/work-5.mp4',
    title: 'Elysian Perfume Commercial',
    category: 'FASHION AD',
    duration: '0:09',
    aspect: 'vertical',
    views: '8.5K views',
    time: '4 days ago',
    description: 'Dynamic character interaction coupled with premium material textures for high-end beauty brand campaigns.'
  }
];

function YoutubeVideoCard({ video }) {
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
          // Catch standard browser autoplay restriction warnings
        });
      }
    } else {
      videoEl.pause();
      try {
        videoEl.currentTime = 0;
      } catch (e) {}
    }
  }, [isHovered]);

  const isVertical = video.aspect === 'vertical';

  return (
    <div 
      className="group flex flex-col w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Video Thumbnail Container */}
      <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-950 relative border border-neutral-900/60 group-hover:border-cyan-500/30 transition-all duration-300 shadow-md">
        <video
          ref={videoRef}
          className={`w-full h-full bg-black ${
            isVertical ? 'object-contain' : 'object-cover'
          }`}
          controls={isHovered}
          preload="metadata"
          playsInline
        >
          <source src={video.src} type="video/mp4" />
        </video>

        {/* Duration/Shorts Badge Overlay */}
        {!isHovered && (
          <div className="absolute bottom-2 right-2 z-20">
            {isVertical ? (
              /* Shorts Label Badge */
              <div className="flex items-center space-x-1 bg-black/85 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm border border-neutral-800">
                <svg className="w-2.5 h-2.5 text-red-500 fill-current" viewBox="0 0 24 24">
                  <path d="M17.75 3C19.54 3 21 4.46 21 6.25v11.5c0 1.79-1.46 3.25-3.25 3.25H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5m0-1H6.25C3.9 2 2 3.9 2 6.25v11.5C2 20.1 3.9 22 6.25 22h11.5c2.35 0 4.25-1.9 4.25-4.25V6.25C22 3.9 20.1 2 17.75 2zM10 14.5v-5l5 2.5-5 2.5z" />
                </svg>
                <span>Shorts</span>
              </div>
            ) : (
              /* Traditional Video Duration */
              <div className="bg-black/75 text-white px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide font-mono shadow-sm">
                {video.duration}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Metadata details row */}
      <div className="flex gap-3 mt-3 px-1">
        {/* Channel Profile Icon */}
        <div className="shrink-0 w-9 h-9 rounded-full overflow-hidden bg-neutral-900 border border-neutral-800/80">
          <img 
            src="/logo-icon-vibrant.png" 
            alt="Channel icon" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/favicon-32x32.png';
            }}
          />
        </div>

        {/* Description metadata content */}
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-semibold text-neutral-100 group-hover:text-white transition-colors line-clamp-2 leading-snug break-words">
              {video.title}
            </h3>
            
            {/* Options button */}
            <button className="shrink-0 text-neutral-500 hover:text-white p-0.5 rounded-full hover:bg-neutral-800/60 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>

          <div className="text-xs text-neutral-400 mt-1 font-light flex flex-col">
            <span>Neural Noir Studios</span>
            <span className="text-neutral-500 font-normal mt-0.5 font-mono">
              {video.views} • {video.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <main className="flex-grow bg-[#02040c] pt-32 pb-24 md:pt-40 md:pb-32 relative z-10 min-h-screen flex flex-col justify-center">
      {/* Background ambient radial glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        {/* Title Header */}
        <header className="max-w-3xl mb-16 md:mb-24 animate-fade-in-up">
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

        {/* Video Portfolio Grid: YouTube Style */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto">
            {workVideos.map((video) => (
              <YoutubeVideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Footer info text */}
        <footer className="mt-16 md:mt-24 border-t border-white/5 pt-8 text-center md:text-left animate-fade-in-up">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em]">
            Visual archive active. Fresh cinematic showcases compiled weekly.
          </p>
        </footer>

      </div>
    </main>
  );
}
