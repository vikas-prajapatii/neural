'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Play, Volume2, VolumeX, Sparkles, Layers, Video, 
  Smartphone, BarChart3, Film, Music, Camera, Image as ImageIcon, 
  Settings, Users, Zap, CheckCircle2, X, Send
} from 'lucide-react';

function ServiceCard({ service, index }) {
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
    const x = e.clientX - rect.left - 96; // Center horizontally (w-48 / 2)
    const y = e.clientY - rect.top - 56;  // Center vertically (h-28 / 2)
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 96;
    const y = e.clientY - rect.top - 56;
    mouseX.set(x);
    mouseY.set(y);
    setHovered(true);
  };

  const rotation = index % 2 === 0 ? 'rotate-6' : '-rotate-6';

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between group h-full transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/30 relative overflow-visible cursor-pointer"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {service.description}
        </p>
      </div>
      
      <ul className="space-y-2.5 border-t border-white/5 pt-5 relative z-10">
        {service.features.map((feat, i) => (
          <li key={i} className="flex items-center text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500/70 mr-2 flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>

      {/* Floating Image Preview Popup */}
      <AnimatePresence>
        {hovered && service.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute',
              x: springX,
              y: springY,
            }}
            className={`absolute z-50 pointer-events-none w-64 h-96 rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/90 shadow-[0_20px_50px_rgba(6,182,212,0.35)] ${rotation}`}
          >
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const { isModalOpen, closeModal, openModal } = useModal();
  const [isMuted, setIsMuted] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    types: [],
    philosophy: ''
  });
  
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      
      const playVideo = () => {
        video.play().catch((err) => {
          console.log("Mockup video autoplay blocked:", err);
        });
      };

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo);
        return () => {
          video.removeEventListener('canplay', playVideo);
        };
      }
    }
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleCheckboxChange = (type) => {
    if (formState.types.includes(type)) {
      setFormState({
        ...formState,
        types: formState.types.filter((t) => t !== type)
      });
    } else {
      setFormState({
        ...formState,
        types: [...formState.types, type]
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          projectTypes: formState.types.join(', '),
          philosophy: formState.philosophy,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setFormState({ name: '', email: '', phone: '', types: [], philosophy: '' });
          setSubmitted(false);
          closeModal();
        }, 3000);
      } else {
        console.error('Failed to submit brief:', response.statusText);
        alert('Failed to deposit brief. Please check if the Spring Boot backend server is running.');
      }
    } catch (error) {
      console.error('Error submitting brief:', error);
      alert('Connection error. Please make sure the Spring Boot backend server is active at localhost:8080.');
    }
  };

  const services = [
    {
      id: 'ai-video',
      title: 'AI Video Production',
      description: 'Lock-in character consistency, multi-angle lighting synthesis, and custom world-building environments.',
      icon: Video,
      image: '/hover-ai-video.jpg',
      features: ['Character lock-in consistency', 'Multi-angle lighting synthesis', 'Infinite custom world-building']
    },
    {
      id: 'short-form',
      title: 'Short-Form Video Content',
      description: 'Engineered for viral velocity with 2-second visual hooks, vertical layout optimizations, and high-volume iterations.',
      icon: Smartphone,
      image: '/hover-short-form.jpg',
      features: ['2-second visual hooks', 'Vertical layout optimization', 'High-volume rapid asset variations']
    },
    {
      id: 'video-ads',
      title: 'Video Ads Production',
      description: 'Psychological marketing layout blended with premium material texture rendering and persona-targeted color grading.',
      icon: BarChart3,
      image: '/hover-video-ads.jpg',
      features: ['Psychological marketing layout', 'Material texture rendering', 'Persona-targeted color grading']
    },
    {
      id: 'branded-film',
      title: 'Branded Film Production',
      description: 'Unified visual bibles, complex emotional storytelling pacing, and deep "noir" cinematic atmospheres.',
      icon: Film,
      image: '/hover-branded-film.jpg',
      features: ['Unified visual bibles', 'Emotional storytelling pacing', 'Deep "noir" cinematic atmospheres']
    },
    {
      id: 'music-video',
      title: 'Music AI Video Content',
      description: 'Audio-reactive frequency mapping with rhythmic continuity transitions and surreal digital art direction.',
      icon: Music,
      image: '/hover-music-video.jpg',
      features: ['Audio-reactive frequency mapping', 'Rhythmic continuity transitions', 'Surreal art direction']
    },
    {
      id: 'photoshoots',
      title: 'Product Photoshoots',
      description: 'Flawless macro precision with infinite virtual lighting setups and structural integrity masking.',
      icon: Camera,
      image: '/hover-photoshoots.jpg',
      features: ['Flawless macro precision', 'Infinite virtual lighting setups', 'Structural integrity masking']
    },
    {
      id: 'brand-poster',
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
              <video
                ref={videoRef}
                className="w-full h-full object-cover opacity-90 rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
                controls
                src="/bg-cinematic.mp4"
                poster="/ai-video-preview.jpg"
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
              <ServiceCard key={service.id} service={service} index={index} />
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

      {/* SECTION 4: WHY CHOOSE US (About) */}
      <section id="about" className="relative z-10 py-24 md:py-32 border-t border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.25em] mb-4">Strategic Advantages</p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                Why Choose Us?
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                Traditional video agencies rely on huge sets, hundreds of crew members, and massive overhead. We operate on a completely different model—coupling human directors with specialized AI.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-200">Production speed: Days instead of months</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-200">100% frame-by-frame asset consistency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-200">Endless creative sandbox boundaries</span>
                </div>
              </div>
            </div>

            {/* Right Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Pillar 1 */}
              <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-64 border-t border-l border-white/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/40 flex items-center justify-center text-cyan-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">The Experts</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A collective of dedicated film directors, visual effects animators, and senior AI researchers.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-64 border-t border-l border-white/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/40 flex items-center justify-center text-cyan-400">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">Deep Teamwork</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Collaborative approach driven by daily iterations, instant rendering, and transparent loops.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-64 border-cyan-500/20 border">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/40 flex items-center justify-center text-cyan-400 animate-pulse">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-cyan-400 mb-1">80%</div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">Budget Cut</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Blockbuster visual scale and render fidelity without traditional film production overhead.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* INQUIRY FORM MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto bg-slate-950/80 backdrop-blur-lg"
          >
            {/* Modal Box */}
            <div
              className="relative w-full max-w-4xl mx-auto md:w-[90vw] max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-3xl p-4 sm:p-8 shadow-[0_20px_50px_-10px_rgba(6,182,212,0.3)] my-8 animate-fade-in-up"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Form Content */}
              {!submitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-3xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                      Let&apos;s Create the Insane Together
                    </h3>
                    <p className="text-xs text-slate-400">
                      Submit your project details. We&apos;ll deploy custom AI weights specifically aligned to your brand.
                    </p>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Name / Company</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe / Acme Corp"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Creation Types Checkboxes */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest block">Project Types Needed</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((srv) => (
                        <label 
                          key={srv.id} 
                          className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                            formState.types.includes(srv.id)
                              ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-400'
                              : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/10'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formState.types.includes(srv.id)}
                            onChange={() => handleCheckboxChange(srv.id)}
                          />
                          <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                            formState.types.includes(srv.id) ? 'bg-cyan-500 border-cyan-400' : 'border-slate-700'
                          }`}>
                            {formState.types.includes(srv.id) && <CheckCircle2 className="w-3 h-3 text-black stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium">{srv.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Philosophy & Scope */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Brand Philosophy & Project Scope</label>
                    <textarea
                      required
                      value={formState.philosophy}
                      onChange={(e) => setFormState({ ...formState, philosophy: e.target.value })}
                      placeholder="Outline your target visual themes, pacing requirements, custom assets to preserve, and conceptual targets..."
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none h-24 md:h-32"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full relative px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-[1.01] flex items-center justify-center space-x-2"
                  >
                    <span>Submit Project Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div
                    className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400 mb-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 uppercase tracking-wider">Brief Deposited Successfully</h3>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Your insanity has been registered. Our directors are matching concept spaces. We will reach back within 24 hours.
                  </p>
                </div>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
