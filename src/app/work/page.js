'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Volume2, 
  VolumeX, 
  Clock, 
  MoreVertical, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  ArrowLeft 
} from 'lucide-react';

export const workVideos = [
  {
    id: 3,
    src: '/work-3.mp4',
    title: 'Luxury Jewelry Campaign',
    shortTitle: 'Luxury Jewelry',
    tagline: 'ELEGANCE IN FOCUS',
    category: 'PRODUCT AD',
    filterCategory: 'Commercials',
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
    description: 'Ultra-precise macro visual detailing of precious metal textures and luxury gemstone sparkle synthesis.',
    captions: [
      { start: 0, end: 7, text: 'Exquisite craftsmanship meets timeless luxury.' },
      { start: 7, end: 15, text: 'Pure brilliance, precision-crafted in every facet.' },
      { start: 15, end: 23, text: 'The Elysian Collection — Neural Noir Studios.' }
    ]
  },
  {
    id: 1,
    src: '/work-1.mp4',
    title: 'Vlog Casual Type Video Production',
    shortTitle: 'Vlog & Casual',
    tagline: 'CASUAL STORIES, CINEMATIC GRADE',
    category: 'BRAND REEL',
    filterCategory: 'Commercials',
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
    description: 'High-energy commercial montage blending dynamic AI motion graphics with product aesthetics.',
    captions: [
      { start: 0, end: 8, text: 'Capturing authentic moments in cinematic 4K.' },
      { start: 8, end: 17, text: 'Dynamic motion workflows with real-world energy.' },
      { start: 17, end: 26, text: 'Everyday aesthetics elevated to commercial grade.' }
    ]
  },
  {
    id: 2,
    src: '/work-2.mp4',
    title: 'Neural Noir Theme Film',
    shortTitle: 'Neural Noir',
    tagline: 'SHADOWS OF THE FUTURE',
    category: 'CINEMATIC NOIR',
    filterCategory: 'Noir Films',
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
    description: 'Atmospheric brand intro showcasing consistent character workflows and shadow rendering.',
    captions: [
      { start: 0, end: 5, text: 'Step into the shadows of the future.' },
      { start: 5, end: 10, text: 'Consistent character synthesis and diffusion engines.' },
      { start: 10, end: 14, text: 'Welcome to the new era of generative cinema.' }
    ]
  },
  {
    id: 4,
    src: '/work-4.mp4',
    title: 'Midnight Scent Narrative',
    shortTitle: 'Midnight Scent',
    tagline: 'FLUID REFLECTIONS',
    category: 'COSMETICS',
    filterCategory: 'Shorts',
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
    description: 'Abstract visual storytelling focusing on fluidity, reflection maps, and upscale product rendering.',
    captions: [
      { start: 0, end: 4, text: 'Midnight Paris — A fragrance born in liquid reflection.' },
      { start: 4, end: 8, text: 'Fluid dynamics and upscale product rendering.' },
      { start: 8, end: 10, text: 'Unveil your aura.' }
    ]
  },
  {
    id: 5,
    src: '/work-5.mp4',
    title: 'Elysian Perfume Commercial',
    shortTitle: 'Elysian Perfume',
    tagline: 'SCENT OF DIFFUSION',
    category: 'FASHION AD',
    filterCategory: 'Shorts',
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
    description: 'Dynamic character interaction coupled with premium material textures for high-end beauty brand campaigns.',
    captions: [
      { start: 0, end: 3.5, text: 'Elysian Rose Edition.' },
      { start: 3.5, end: 7, text: 'Diffusion-rendered radiance and natural floral notes.' },
      { start: 7, end: 9, text: 'The essence of modern luxury.' }
    ]
  }
];

const CATEGORIES = ['All', 'Commercials', 'Shorts', 'Noir Films'];

function YoutubeVideoCard({ video }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCaptionsOn, setIsCaptionsOn] = useState(true);
  const [currentCaption, setCurrentCaption] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const currentCaptionRef = useRef('');

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isHovered) {
      videoEl.muted = isMuted;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocks audio, keep muted and play
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        });
      }
    } else {
      videoEl.pause();
      try {
        videoEl.currentTime = 0;
      } catch (e) {}
      if (progressRef.current) {
        progressRef.current.style.width = '0%';
      }
      setCurrentCaption('');
      currentCaptionRef.current = '';
      setShowMenu(false);
    }
  }, [isHovered, isMuted]);

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (!videoEl || !videoEl.duration) return;

    const current = videoEl.currentTime;
    const dur = videoEl.duration;

    // Smooth direct DOM progress update without triggering React re-renders
    if (progressRef.current) {
      progressRef.current.style.width = `${(current / dur) * 100}%`;
    }

    // Only update caption state when subtitle text actually changes
    if (video.captions && video.captions.length > 0) {
      const activeCap = video.captions.find(
        (c) => current >= c.start && current <= c.end
      );
      const text = activeCap ? activeCap.text : '';
      if (text !== currentCaptionRef.current) {
        currentCaptionRef.current = text;
        setCurrentCaption(text);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const toggleCaptions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsCaptionsOn(!isCaptionsOn);
  };

  const handleWatchLater = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSaved(!saved);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/work/${video.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isVertical = video.aspect === 'vertical';

  return (
    <div 
      className="group flex flex-col w-full cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/work/${video.id}`} className="block w-full">
        {/* 1. Video Thumbnail Container */}
        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-950 relative border border-neutral-900/60 group-hover:border-cyan-500/30 transition-all duration-300 shadow-md">
          <video
            ref={videoRef}
            src={video.src}
            className={`w-full h-full bg-black transition-transform duration-500 ${
              isVertical ? 'object-contain' : 'object-cover'
            }`}
            loop
            playsInline
            preload="auto"
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {});
              }
            }}
          />

          {/* YouTube Hover Quick Controls (Top-Right Action Bar) */}
          {isHovered && (
            <div className="absolute top-2.5 right-2.5 z-30 flex items-center space-x-1.5 animate-in fade-in duration-200">
              {/* Mute / Unmute Button */}
              <button
                type="button"
                onClick={toggleMute}
                title={isMuted ? "Unmute (m)" : "Mute (m)"}
                className="p-1.5 rounded-md bg-black/80 hover:bg-neutral-900 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 shadow-md flex items-center justify-center cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-neutral-200" />
                ) : (
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                )}
              </button>

              {/* CC Captions Button */}
              <button
                type="button"
                onClick={toggleCaptions}
                title={isCaptionsOn ? "Subtitles (c) on" : "Subtitles (c) off"}
                className={`px-2 py-1 rounded-md text-[11px] font-bold tracking-wider backdrop-blur-md border transition-all hover:scale-105 shadow-md flex items-center justify-center cursor-pointer ${
                  isCaptionsOn 
                    ? 'bg-white text-black border-white' 
                    : 'bg-black/80 text-neutral-400 border-white/10 hover:text-white'
                }`}
              >
                CC
              </button>

              {/* Watch Later Button */}
              <button
                type="button"
                onClick={handleWatchLater}
                title={saved ? "Saved to Watch Later" : "Watch later"}
                className={`p-1.5 rounded-md backdrop-blur-md border transition-all hover:scale-105 shadow-md hidden sm:flex items-center justify-center cursor-pointer ${
                  saved 
                    ? 'bg-cyan-500 text-black border-cyan-400' 
                    : 'bg-black/80 hover:bg-neutral-900 text-white border-white/10'
                }`}
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* YouTube Closed Captions (Subtitles) Overlay */}
          {isHovered && isCaptionsOn && currentCaption && (
            <div className="absolute bottom-4 inset-x-0 z-30 pointer-events-none text-center px-4 flex justify-center">
              <span className="inline-block bg-black/85 text-white font-medium text-xs sm:text-sm px-2.5 py-1 rounded shadow-lg tracking-normal font-sans leading-snug max-w-[90%] border border-white/5">
                {currentCaption}
              </span>
            </div>
          )}

          {/* YouTube Red Progress Bar (Bottom of video on hover) */}
          <div 
            className={`absolute bottom-0 inset-x-0 h-1 bg-white/20 z-30 overflow-hidden transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div 
              ref={progressRef}
              className="h-full bg-red-600 transition-all duration-100 ease-linear"
              style={{ width: '0%' }}
            />
          </div>

          {/* Static Badges (When NOT Hovered) */}
          {!isHovered && (
            <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none">
              {isVertical ? (
                /* YouTube Shorts Badge */
                <div className="flex items-center space-x-1.5 bg-black/85 text-white px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-md border border-neutral-800">
                  <svg className="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24">
                    <path d="M17.75 3C19.54 3 21 4.46 21 6.25v11.5c0 1.79-1.46 3.25-3.25 3.25H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5m0-1H6.25C3.9 2 2 3.9 2 6.25v11.5C2 20.1 3.9 22 6.25 22h11.5c2.35 0 4.25-1.9 4.25-4.25V6.25C22 3.9 20.1 2 17.75 2zM10 14.5v-5l5 2.5-5 2.5z" />
                  </svg>
                  <span>SHORTS</span>
                </div>
              ) : (
                /* Traditional Duration Badge */
                <div className="bg-black/85 text-white px-1.5 py-0.5 rounded text-[11px] font-semibold tracking-wide font-mono shadow-md border border-white/5">
                  {video.duration}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Metadata Details Row Below Thumbnail */}
        <div className="flex gap-3.5 mt-3.5 px-0.5">
          {/* Circular Channel Profile Icon */}
          <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-neutral-900 border border-neutral-800 shadow-sm mt-0.5">
            <img 
              src="/logo-icon-vibrant.png" 
              alt="Neural Noir Studios" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/favicon-32x32.png';
              }}
            />
          </div>

          {/* Details Column */}
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-neutral-100 group-hover:text-white transition-colors line-clamp-2 leading-snug break-words">
                {video.title}
              </h3>

              {/* Three-Dot Options Button */}
              <div className="relative shrink-0">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowMenu(!showMenu);
                  }}
                  className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                  aria-label="Options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-1 w-44 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-2xl py-1.5 z-40 text-xs text-neutral-200 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <button 
                      type="button"
                      onClick={handleCopyLink}
                      className="w-full px-3.5 py-2 flex items-center space-x-2.5 hover:bg-neutral-800/80 text-left transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{copied ? 'Link copied!' : 'Share / Copy link'}</span>
                    </button>
                    <button 
                      type="button"
                      onClick={handleWatchLater}
                      className="w-full px-3.5 py-2 flex items-center space-x-2.5 hover:bg-neutral-800/80 text-left transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{saved ? 'Saved in vault' : 'Save to vault'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Channel Name & Verified Badge */}
            <div className="text-xs text-neutral-400 mt-1 flex items-center space-x-1.5 font-normal">
              <span>Neural Noir Studios</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            </div>

            {/* Views & Timestamp */}
            <div className="text-xs text-neutral-500 mt-0.5 font-mono">
              <span>{video.views}</span>
              <span className="mx-1">•</span>
              <span>{video.time}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All'
    ? workVideos
    : workVideos.filter((v) => v.filterCategory === selectedCategory);

  return (
    <main className="flex-grow bg-[#02040c] pt-28 pb-24 md:pt-36 md:pb-32 relative z-10 min-h-screen flex flex-col justify-center">
      {/* Background ambient radial gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Navigation Back Button & Header Row */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* YouTube Category Filter Chips */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 scrollbar-none mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-sm font-semibold'
                  : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 border border-neutral-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Portfolio Grid: YouTube Style */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto">
            {filteredVideos.map((video) => (
              <YoutubeVideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Footer info text */}
        <footer className="mt-16 md:mt-24 border-t border-white/5 pt-8 text-center md:text-left">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em]">
            Visual archive active. Fresh cinematic showcases compiled weekly.
          </p>
        </footer>
      </div>
    </main>
  );
}
