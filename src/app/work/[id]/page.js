'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { workVideos } from '../page';

export default function WorkDetail({ params }) {
  const id = parseInt(params.id);
  const videoIndex = workVideos.findIndex((v) => v.id === id);

  if (videoIndex === -1) {
    notFound();
  }

  const video = workVideos[videoIndex];

  // Calculate next and previous indexes for navigation loop
  const prevIndex = (videoIndex - 1 + workVideos.length) % workVideos.length;
  const nextIndex = (videoIndex + 1) % workVideos.length;
  const prevVideo = workVideos[prevIndex];
  const nextVideo = workVideos[nextIndex];

  const videoRef = useRef(null);

  // Play video with audio enabled on load
  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.muted = false; // Enable audio
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocking fallback: play muted to avoid video freezing
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        });
      }
    }
  }, [id]);

  return (
    <main className="flex-grow bg-[#02040c] text-white min-h-screen pt-28 pb-24 relative z-10 flex flex-col justify-between overflow-x-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 w-full flex-grow flex flex-col justify-center">
        
        {/* Navigation Back button */}
        <div className="w-full mb-10">
          <Link 
            href="/work" 
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Vault
          </Link>
        </div>

        {/* Dynamic 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Video Player (Original Aspect Support) */}
          <div className="lg:col-span-7 w-full flex justify-center">
            {video.aspect === 'vertical' ? (
              /* Vertical Phone Mockup */
              <div className="w-full max-w-[320px] aspect-[9/16] rounded-[2.5rem] border-8 border-neutral-800 bg-neutral-950 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/10 relative">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-800 rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
                </div>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover relative z-10"
                  controls
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              /* Widescreen Landscape Player */
              <div className="w-full aspect-[16/9] rounded-2xl border border-neutral-800/80 bg-neutral-950 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/10">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Right Column: Private Island Style Details Card */}
          <div className="lg:col-span-5 space-y-8 font-sans">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-yellow-500 leading-none">
                {video.shortTitle}
              </h1>
              <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase mt-2">
                {video.tagline || video.title}
              </p>
            </div>

            <p className="text-sm text-neutral-300 font-light leading-relaxed font-sans">
              {video.description}
            </p>
          </div>

        </div>

        {/* Next/Prev Navigation Row at Bottom */}
        <div className="border-t border-neutral-900/60 mt-16 pt-8 flex items-center justify-between w-full text-xs font-mono uppercase tracking-widest">
          {/* Previous Project Navigator */}
          <Link 
            href={`/work/${prevVideo.id}`} 
            className="flex items-center space-x-2 text-neutral-500 hover:text-yellow-500 transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-yellow-500 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline text-neutral-500">Previous Project</span>
            <span className="text-neutral-300 font-bold block sm:inline sm:before:content-[':\00a0']">
              {prevVideo.shortTitle}
            </span>
          </Link>

          {/* Next Project Navigator */}
          <Link 
            href={`/work/${nextVideo.id}`} 
            className="flex items-center space-x-2 text-neutral-500 hover:text-yellow-500 transition-colors group cursor-pointer"
          >
            <span className="hidden sm:inline text-neutral-500">Next Project</span>
            <span className="text-neutral-300 font-bold block sm:inline sm:after:content-['\00a0:']">
              {nextVideo.shortTitle}
            </span>
            <ChevronRight className="w-4 h-4 text-yellow-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </main>
  );
}
