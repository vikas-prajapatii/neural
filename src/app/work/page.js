'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const workVideos = [
  {
    id: 1,
    src: '/work-1.mp4',
    title: 'Vlog Casual Type Video Production',
    category: 'BRAND REEL',
    duration: '0:26',
    aspect: 'landscape',
    description: 'High-energy commercial montage blending dynamic AI motion graphics with product aesthetics.'
  },
  {
    id: 2,
    src: '/work-2.mp4',
    title: 'Neural Noir Theme Film',
    category: 'CINEMATIC NOIR',
    duration: '0:14',
    aspect: 'landscape',
    description: 'Atmospheric brand intro showcasing consistent character workflows and shadow rendering.'
  },
  {
    id: 3,
    src: '/work-3.mp4',
    title: 'Luxury Jewelry Campaign',
    category: 'PRODUCT AD',
    duration: '0:23',
    aspect: 'landscape',
    description: 'Ultra-precise macro visual detailing of precious metal textures and luxury gemstone sparkle synthesis.'
  },
  {
    id: 4,
    src: '/work-4.mp4',
    title: 'Midnight Scent Narrative',
    category: 'COSMETICS',
    duration: '0:10',
    aspect: 'vertical',
    description: 'Abstract visual storytelling focusing on fluidity, reflection maps, and upscale product rendering.'
  },
  {
    id: 5,
    src: '/work-5.mp4',
    title: 'Elysian Perfume Commercial',
    category: 'FASHION AD',
    duration: '0:09',
    aspect: 'vertical',
    description: 'Dynamic character interaction coupled with premium material textures for high-end beauty brand campaigns.'
  }
];

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Monitor scroll positioning to update active slide index dynamically
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const children = Array.from(container.children).filter(
      (child) => child.dataset.type === 'video'
    );
    let closestIndex = 0;
    let closestDistance = Infinity;
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childCenter = child.getBoundingClientRect().left + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Run once on load to establish active center
      setTimeout(handleScroll, 150);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToVideo = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const children = Array.from(container.children).filter(
      (child) => child.dataset.type === 'video'
    );
    const child = children[index];
    if (child) {
      const leftOffset = child.offsetLeft - (container.offsetWidth - child.offsetWidth) / 2;
      container.scrollTo({
        left: leftOffset,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToVideo(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(workVideos.length - 1, activeIndex + 1);
    scrollToVideo(newIndex);
  };

  return (
    <main className="flex-grow bg-[#02040c] pt-28 pb-24 relative z-10 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-950/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full flex flex-col items-center">
        
        {/* Navigation Back button & Branding Header */}
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-neutral-900/60 pb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinematic Showcase</span>
          </div>
        </div>

        {/* Carousel Slider Panel */}
        <div className="w-full relative py-8 flex items-center justify-center">
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-4 md:left-12 z-30 p-4 rounded-full border border-neutral-800 bg-neutral-950/80 text-white hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:border-neutral-800 disabled:hover:text-white transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleNext}
            disabled={activeIndex === workVideos.length - 1}
            className="absolute right-4 md:right-12 z-30 p-4 rounded-full border border-neutral-800 bg-neutral-950/80 text-white hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:border-neutral-800 disabled:hover:text-white transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Filmstrip Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto flex items-center gap-12 sm:gap-16 px-0 py-10 scrollbar-none scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Start spacer for perfect centering */}
            <div className="shrink-0 w-[calc(50vw-170px)] sm:w-[calc(50vw-320px)] lg:w-[calc(50vw-400px)] h-1" />

            {workVideos.map((video, idx) => {
              const isActive = activeIndex === idx;
              const isVertical = video.aspect === 'vertical';

              return (
                <div
                  key={video.id}
                  data-type="video"
                  className={`snap-center shrink-0 transition-all duration-700 ease-out origin-center ${
                    isActive 
                      ? 'scale-105 opacity-100 blur-none' 
                      : 'scale-[0.88] opacity-35 blur-[1px]'
                  } ${
                    isVertical 
                      ? 'w-[250px] sm:w-[320px] lg:w-[380px] aspect-[9/16]' 
                      : 'w-[340px] sm:w-[640px] lg:w-[800px] aspect-[16/9]'
                  }`}
                  style={{
                    scrollSnapAlign: 'center'
                  }}
                >
                  {isVertical ? (
                    /* Phone mockup layout */
                    <div className={`w-full h-full relative rounded-[2.5rem] border-8 bg-neutral-950 overflow-hidden transition-all duration-500 ${
                      isActive 
                        ? 'border-cyan-400 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(6,182,212,0.3)]' 
                        : 'border-neutral-800'
                    }`}>
                      {/* Phone notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-800 rounded-b-2xl z-30 flex items-center justify-center">
                        <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
                      </div>
                      
                      <video
                        className="w-full h-full object-cover relative z-10"
                        controls={isActive}
                        autoPlay={isActive}
                        muted={true}
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    /* Widescreen landscape mockup */
                    <div className={`w-full h-full relative rounded-2xl border overflow-hidden bg-neutral-950 transition-all duration-500 ${
                      isActive 
                        ? 'border-cyan-400 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(6,182,212,0.3)]' 
                        : 'border-neutral-800'
                    }`}>
                      <video
                        className="w-full h-full object-cover"
                        controls={isActive}
                        autoPlay={isActive}
                        muted={true}
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </div>
              );
            })}

            {/* End spacer for perfect centering */}
            <div className="shrink-0 w-[calc(50vw-125px)] sm:w-[calc(50vw-160px)] lg:w-[calc(50vw-190px)] h-1" />
          </div>

        </div>

        {/* Dynamic details card of the active centered video */}
        <div className="mt-6 text-center max-w-xl min-h-[140px] px-6 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2.5"
            >
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-800/35 inline-block">
                {workVideos[activeIndex].category} • {workVideos[activeIndex].duration}
              </span>
              <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
                {workVideos[activeIndex].title}
              </h2>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-lg animate-fade-in">
                {workVideos[activeIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Dots Indicator */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {workVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToVideo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'w-8 bg-cyan-400' 
                  : 'w-2 bg-neutral-800 hover:bg-neutral-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </main>
  );
}
