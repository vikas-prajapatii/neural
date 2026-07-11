'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Play, Volume2, VolumeX, Sparkles, Layers, Video, 
  Smartphone, BarChart3, Film, Music, Camera, Image as ImageIcon, 
  Settings, Users, Zap, CheckCircle2, X, Send, BookOpen, Calendar, ArrowRight
} from 'lucide-react';
import { blogData } from '@/data/blogData';
import { useRouter } from 'next/navigation';

function ServiceCard({ service, index, activeCard, setActiveCard }) {
  const router = useRouter();
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);

  // High-performance Framer Motion values for GPU-driven cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Elastic spring physics for smooth tracking lag
  const springX = useSpring(mouseX, { damping: 25, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 250 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 128; // Center horizontally on the 256px wide card
    const y = e.clientY - rect.top - 192;  // Center vertically on the 384px tall card
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 128;
    const y = e.clientY - rect.top - 192;
    mouseX.set(x);
    mouseY.set(y);
    setHovered(true);
  };

  const handleCardClick = (e) => {
    // Detect if this is a mobile/touch screen device
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
    
    const targetUrl = service.slug === 'ai-cinematic-video-production' ? `/${service.slug}` : `/services/${service.slug}`;
    
    if (isTouch) {
      if (activeCard === index) {
        // Second tap navigates to service portal
        router.push(targetUrl);
      } else {
        // First tap prevents navigation and displays preview
        e.preventDefault();
        e.stopPropagation();
        setActiveCard(index);
        
        // Place the preview centered over the card
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(rect.width / 2 - 128);
        mouseY.set(rect.height / 2 - 192);
      }
    } else {
      // Desktop cursor hover triggers preview, click navigates instantly
      router.push(targetUrl);
    }
  };

  const showPreview = hovered || (activeCard === index);
  const rotation = index % 2 === 0 ? 6 : -6;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      className={`border bg-neutral-900/30 hover:bg-cyan-950/20 transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between group h-full cursor-pointer hover:scale-[1.01] relative overflow-visible shadow-[0_0_20px_rgba(6,182,212,0.05),inset_0_0_10px_rgba(6,182,212,0.02)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3),inset_0_0_20px_rgba(6,182,212,0.15)] ${
        activeCard === index 
          ? 'border-cyan-500 shadow-[0_0_35px_rgba(6,182,212,0.25),inset_0_0_15px_rgba(6,182,212,0.1)]' 
          : 'border-cyan-500/15 hover:border-cyan-400/50'
      }`}
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 mb-6 group-hover:text-white group-hover:border-neutral-500 transition-all duration-300 notranslate" translate="no">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-neutral-200 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-light">
          {service.description}
        </p>
      </div>
      
      <ul className="list-none space-y-2.5 border-t border-neutral-800 pt-5 relative z-10">
        {service.features.map((feat, i) => {
          const title = typeof feat === 'object' ? feat.title : feat;
          return (
            <li key={i} className="flex items-center text-xs text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mr-2 flex-shrink-0 notranslate" translate="no" />
              {title}
            </li>
          );
        })}
      </ul>

      {/* Floating Image Preview Popup */}
      <AnimatePresence>
        {showPreview && service.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: rotation - 5 }}
            animate={{ opacity: 1, scale: 1, rotate: rotation }}
            exit={{ opacity: 0, scale: 0.8, rotate: rotation + 5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              position: 'absolute',
              x: springX,
              y: springY,
              width: '256px',
              height: '384px',
              pointerEvents: 'none',
              zIndex: 9999,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 0 25px rgba(6, 182, 212, 0.35), 0 20px 50px rgba(0, 0, 0, 0.8)',
              border: '2px solid rgba(6, 182, 212, 0.85)',
              backgroundColor: 'rgba(2, 4, 12, 0.95)'
            }}
          >
            {/* Lens Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-cyan-400/10 z-20 pointer-events-none" />
            
            {/* Image */}
            <Image 
              src={service.image || '/assets/placeholder/default-placeholder.png'} 
              alt={`Neural Noir ${service.title} - AI generated photorealistic 4K cinematic commercial preview`}
              fill
              className="object-cover"
              sizes="256px"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const { isModalOpen, closeModal, openModal } = useModal();
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveCard(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // 3D Hover Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };





  const services = [
    {
      id: 'ai-video',
      slug: 'ai-cinematic-video-production',
      title: 'AI Video Production',
      description: 'Lock-in character consistency, photorealistic lighting synthesis, and custom world-building environments.',
      icon: Video,
      image: '/hover-ai-video.jpg',
      features: ['Character lock-in consistency', 'Photorealistic lighting synthesis', 'Infinite custom world-building']
    },
    {
      id: 'short-form',
      slug: 'short-form-video',
      title: 'Short-Form Video Content',
      description: 'Engineered for viral velocity with 2-second visual hooks, vertical layout optimizations, and high-volume iterations.',
      icon: Smartphone,
      image: '/hover-short-form.jpg',
      features: ['2-second visual hooks', 'Vertical layout optimization', 'High-volume rapid asset variations']
    },
    {
      id: 'video-ads',
      slug: 'video-ads-production',
      title: 'Video Ads Production',
      description: 'Direct-Response psychological marketing layouts blended with premium material texture rendering and persona-targeted color grading.',
      icon: BarChart3,
      image: '/hover-video-ads.jpg',
      features: ['Direct-Response psychological marketing layouts', 'Material texture rendering', 'Persona-targeted color grading']
    },
    {
      id: 'branded-film',
      slug: 'branded-film-production',
      title: 'Branded Film Production',
      description: 'Unified visual bibles, complex emotional storytelling pacing, and deep "noir" cinematic atmospheres.',
      icon: Film,
      image: '/hover-branded-film.jpg',
      features: ['Unified visual bibles', 'Emotional storytelling pacing', 'Deep "noir" cinematic atmospheres']
    },
    {
      id: 'music-video',
      slug: 'music-ai-video',
      title: 'Music AI Video Content',
      description: 'Audio-reactive frequency mapping with rhythmic continuity transitions and surreal digital art direction.',
      icon: Music,
      image: '/hover-music-video.jpg',
      features: ['Audio-reactive frequency mapping', 'Rhythmic continuity transitions', 'Surreal art direction']
    },
    {
      id: 'photoshoots',
      slug: 'product-photoshoots',
      title: 'Product Photoshoots',
      description: 'AI Commercial Photography delivering flawless macro precision with infinite virtual lighting setups and structural integrity masking.',
      icon: Camera,
      image: '/hover-photoshoots.jpg',
      features: ['AI Commercial Photography', 'Flawless macro precision', 'Infinite virtual lighting setups']
    },
    {
      id: 'brand-poster',
      slug: 'brand-poster-creation',
      title: 'Brand Poster Creation',
      description: 'High-resolution print canvas upscaling, impactful graphic composition, and unified campaign styling.',
      icon: ImageIcon,
      image: '/hover-brand-poster.jpg',
      features: ['Print-ready canvas upscaling', 'Impactful graphic composition', 'Unified campaign styling']
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Pre-Production',
      desc: 'Concept generation, AI scriptwriting, visual art direction guidelines, storyboarding, and defining visual hooks.'
    },
    {
      step: '02',
      title: 'Creation',
      desc: 'Custom AI model training (LORA, character weights) for absolute product and persona consistency across scenes.'
    },
    {
      step: '03',
      title: 'Animation',
      desc: 'Injecting physics-based motion, fluid dynamics, camera flythrough synthesis, and physical weight simulation.'
    },
    {
      step: '04',
      title: 'Post-Production & Editing',
      desc: 'Rigorous frame-by-frame editing, upscaling, cinematic color grading, custom sound effects, and musical orchestration.'
    }
  ];

  return (
    <div id="home" className="relative bg-transparent overflow-hidden min-h-screen">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-950/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      
      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-48 md:pb-36 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="relative border-l-4 border-cyan-400 pl-6 py-5 mb-8 bg-slate-950/65 border border-white/5 backdrop-blur-md rounded-r-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] select-none">
            {/* Absolute Background Quote Icon */}
            <span className="absolute -top-3 left-2 text-7xl font-serif text-cyan-400/20 pointer-events-none select-none">&ldquo;</span>
            
            <p className="text-[10px] font-semibold text-cyan-400 uppercase tracking-[0.3em] mb-2 relative z-10">Aesthetic Philosophy</p>
            <h1 className="text-2xl md:text-3xl font-serif italic text-slate-100 font-normal leading-relaxed relative z-10">
              &ldquo;What garlic is to food, <span className="text-cyan-400 font-bold neon-text-cyan">insanity is to art</span>.&rdquo;
            </h1>
            <p className="text-[10px] text-slate-400 mt-2.5 font-mono tracking-widest relative z-10">— Augustus Saint-Gaudens</p>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            We only hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 neon-text-cyan">insanes</span>.
          </h2>

          <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            We are an ultra-premium AI Video Production house. We do not copy realities; we build insane visual dimensions for visionary brands.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={openModal}
              className="relative px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105"
            >
              Launch Project
            </button>
            <a
              href="#services"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-slate-300 border border-slate-700 hover:border-cyan-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              Studio Services
            </a>
          </div>
        </div>

        {/* Right Video Mockup with 3D Hover */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[500px] aspect-[16/10] rounded-2xl p-1 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent shadow-[0_30px_60px_-15px_rgba(3,7,18,0.9)] cursor-pointer animate-fade-in-up"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
              {/* Loop Video in Normal Form */}
              <iframe
                src="https://player.vimeo.com/video/1207651789?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full opacity-90 rounded-2xl"
                style={{ border: 0 }}
                title="Neural Noir Mockup Video"
              />
            </div>
          </motion.div>
        </div>

      </section>

      {/* SECTION 2: SERVICES */}
      <section id="services" className="relative z-10 py-24 md:py-32 border-t border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.25em] mb-4">Core Competencies</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">
              What Neural Noir can do for you?
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light">
              We are not just a studio; we are digital artists. We blend raw creative vision with cutting-edge AI to build immersive worlds for your brand. Most importantly, we guarantee <span className="text-slate-200 font-semibold underline decoration-cyan-400 underline-offset-4">strict product consistency</span> across every frame and pixel, ensuring your brand identity remains flawless.
            </p>
          </div>

          {/* Interactive Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: WORKFLOW */}
      <section className="relative z-10 py-24 md:py-32 border-t border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.25em] mb-4">Our Method</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              The Production Pipeline
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg">
              How we orchestrate thoughts, bytes, and frames from raw conceptualization to blockbusters.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-cyan-500/10 max-w-4xl mx-auto pl-8 md:pl-16 space-y-16 py-4">
            
            {workflowSteps.map((step, idx) => (
              <div
                key={step.step}
                className="relative transition-all duration-500 hover:translate-x-2"
              >
                {/* Flowing Dot Indicator */}
                <div className="absolute left-[-41px] md:left-[-73px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
                </div>

                <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 text-6xl font-extrabold text-white/5 font-mono select-none group-hover:text-cyan-500/5 transition-all">
                    {step.step}
                  </div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">Phase {step.step}</span>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* SECTION 4: STRATEGIC INSIGHTS (Blog) */}
      <section id="blog" className="relative z-10 py-24 md:py-32 border-t border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Intellectual Capital</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Strategic AI Video Insights
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-12 max-w-2xl">
            Analytical breakdowns, operational frameworks, and deep technical guides on deploying generative video pipelines for premium enterprise brands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(blogData).slice(0, 3).map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col justify-between p-8 rounded-2xl border border-neutral-800 bg-neutral-950/40 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 min-h-[320px]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-6 font-light">
                    {post.summary}
                  </p>
                </div>

                <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 group-hover:text-white transition-colors duration-200">
                  Read Article 
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
