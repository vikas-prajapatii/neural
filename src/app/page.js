'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Play, Volume2, VolumeX, Sparkles, Layers, Video, 
  Smartphone, BarChart3, Film, Music, Camera, Image as ImageIcon, 
  Settings, Users, Zap, CheckCircle2, X, Send
} from 'lucide-react';

function ServiceCard({ service, index, onClick }) {
  const Icon = service.icon;

  return (
    <div
      onClick={onClick}
      className="border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60 hover:border-neutral-600 transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between group h-full cursor-pointer hover:scale-[1.01]"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 mb-6 group-hover:text-white group-hover:border-neutral-500 transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-neutral-200 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-light">
          {service.description}
        </p>
      </div>
      
      <ul className="space-y-2.5 border-t border-neutral-800 pt-5 relative z-10">
        {service.features.map((feat, i) => (
          <li key={i} className="flex items-center text-xs text-neutral-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 mr-2 flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
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

  // Service details modal state
  const [activeModal, setActiveModal] = useState(null);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    phone: '',
    philosophy: ''
  });

  const handleModalFormSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError(null);
    try {
      const response = await fetch('http://localhost:8080/api/inquiries/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: modalForm.name,
          email: modalForm.email,
          phone: modalForm.phone,
          philosophy: modalForm.philosophy,
          projectTypes: activeModal.title, // aggregates selection with service title
        }),
      });

      if (response.ok) {
        setModalSubmitted(true);
        setModalForm({ name: '', email: '', phone: '', philosophy: '' });
      } else {
        setModalError('Server responded with an error. Please try again.');
      }
    } catch (err) {
      setModalError('Connection failed. Please check if backend server is active.');
    } finally {
      setModalLoading(false);
    }
  };
  
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
      features: ['Character lock-in consistency', 'Multi-angle lighting synthesis', 'Infinite custom world-building'],
      targetAudience: 'Hollywood Indies, UK/US Creative Agencies, Enterprise Brand Directors.',
      header: 'Next-Gen AI Cinematic Video Production Studio',
      valueProp: 'Eliminate $50,000+ logistics overhead. No location scouting, no massive crew management, no scheduling bottlenecks. We leverage generative diffusion networks to engineer multi-angle lighting synthesis and custom world-building environments within hours—not months.',
      metrics: ['85% | Cost Reduction', '10x | Production Velocity', 'Frame-by-Frame | Asset Consistency']
    },
    {
      id: 'short-form',
      title: 'Short-Form Video Content',
      description: 'Engineered for viral velocity with 2-second visual hooks, vertical layout optimizations, and high-volume iterations.',
      icon: Smartphone,
      features: ['2-second visual hooks', 'Vertical layout optimization', 'High-volume rapid asset variations'],
      targetAudience: 'Premium Direct-to-Consumer (DTC) Brands, FinTech Startups, Global Content Creators.',
      header: 'High-Volume Viral Short-Form Engine (TikTok, Reels, Shorts)',
      valueProp: 'Scaling social presence across US/UK markets requires insane volume. Traditional editing teams take days per video. Our AI framework automates asset variations, engineers data-backed 2-second psychological hooks, and optimizes vertical layout tracking. We deploy hyper-targeted content pipelines that bypass creative fatigue.',
      metrics: ['300% | Engagement Surge', 'Zero | Editing Retainers', '24-Hour | Deployment']
    },
    {
      id: 'video-ads',
      title: 'Video Ads Production',
      description: 'Psychological marketing layout blended with premium material texture rendering and persona-targeted color grading.',
      icon: BarChart3,
      features: ['Psychological marketing layout', 'Material texture rendering', 'Persona-targeted color grading'],
      targetAudience: 'High-Growth E-Commerce Brands, Performance Marketers in London/New York.',
      header: 'Psychological Performance-Driven AI Video Ads',
      valueProp: 'Stop losing ROAS to ad fatigue. Our AI workflows allow rapid material texture rendering and persona-targeted color grading variants to A/B test hooks continuously. We combine psychological marketing frameworks with scalable AI asset manipulation to trigger direct-response actions from western buyers.',
      metrics: ['+45% | Click-Through Rate', 'Infinite | Creative Variations', 'Maximized | ROAS']
    },
    {
      id: 'branded-film',
      title: 'Branded Film Production',
      description: 'Unified visual bibles, complex emotional storytelling pacing, and deep "noir" cinematic atmospheres.',
      icon: Film,
      features: ['Unified visual bibles', 'Emotional storytelling pacing', 'Deep "noir" cinematic atmospheres'],
      targetAudience: 'Fortune 500 Corporate Communications, Luxury Brands in Europe/US.',
      header: 'High-Fidelity Branded AI Cinematic Films',
      valueProp: 'Brand storytelling requires premium visual bibles and a deep "noir" cinematic atmosphere. We blend raw human directorial vision with custom trained AI hyper-realism models. This ensures absolute character lock-in consistency and complex emotional pacing without the multi-million dollar traditional studio budget constraints.',
      metrics: ['Blockbuster | Scale Fidelity', 'Custom | Model Property', 'Global | Distribution Ready']
    },
    {
      id: 'music-video',
      title: 'Music AI Video Content',
      description: 'Audio-reactive frequency mapping with rhythmic continuity transitions and surreal digital art direction.',
      icon: Music,
      features: ['Audio-reactive frequency mapping', 'Rhythmic continuity transitions', 'Surreal art direction'],
      targetAudience: 'Record Labels, Independent Artists in Los Angeles/London/Berlin.',
      header: 'Audio-Reactive Frequency-Mapped AI Music Videos',
      valueProp: 'Turn sonic frequencies into high-art visuals. Our infrastructure utilizes advanced audio-reactive frequency mapping to generate rhythmic continuity transitions, dreamscape sequences, and surreal digital art assets that move perfectly to the beat. High-end visuals for international charts at zero production overhead.',
      metrics: ['Seamless | Audio-Visual Sync', 'Immersive | Surreal Aesthetics', 'Independent | Budget Friendly']
    },
    {
      id: 'photoshoots',
      title: 'Product Photoshoots',
      description: 'Flawless macro precision with infinite virtual lighting setups and structural integrity masking.',
      icon: Camera,
      features: ['Flawless macro precision', 'Infinite virtual lighting setups', 'Structural integrity masking'],
      targetAudience: 'Luxury Apparel, Premium Cosmetics, Hardware Tech Brands.',
      header: 'Virtual Infinite-Environment Product Photoshoots',
      valueProp: 'Shipping inventory to physical studios for commercial photography is an archaic bottleneck. Send us 3 clean images or a 3D asset model of your product. Our AI engine generates flawless macro precision styling, structural integrity masking, and maps it across infinite virtual lighting setups and global backgrounds effortlessly.',
      metrics: ['Zero | Shipping/Studio Fees', '100% | Commercial Imagery', 'Retake | in 1-Click']
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
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                onClick={() => {
                  setActiveModal(service);
                  setModalSubmitted(false);
                  setModalError(null);
                  setModalForm({ name: '', email: '', phone: '', philosophy: '' });
                }}
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

      {/* Interactive Service-Specific Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-neutral-950/90 backdrop-blur-md"
            onClick={() => {
              setActiveModal(null);
              setModalSubmitted(false);
              setModalError(null);
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveModal(null);
                  setModalSubmitted(false);
                  setModalError(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Asymmetrical Split Screen Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                
                {/* Left Panel: SEO High-converting Copy */}
                <div className="lg:col-span-6 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between">
                  <div>
                    {/* Target Audience Label */}
                    <div className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-6">
                      Target: {activeModal.targetAudience}
                    </div>
                    
                    {/* Header */}
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {activeModal.header}
                    </h3>
                    
                    {/* Value Prop */}
                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light mt-6">
                      {activeModal.valueProp}
                    </p>
                  </div>

                  {/* Metrics & Features Grid */}
                  <div className="mt-8 pt-8 border-t border-neutral-900">
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Key Metrics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {activeModal.metrics.map((metric, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-neutral-900 bg-neutral-900/30">
                          <p className="text-sm font-extrabold text-white leading-snug">{metric.split(' | ')[0]}</p>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">{metric.split(' | ')[1] || 'Metric'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel: Lead Intake Form */}
                <div className="lg:col-span-6 p-8 md:p-12 bg-neutral-950 flex flex-col justify-center">
                  {!modalSubmitted ? (
                    <form onSubmit={handleModalFormSubmit} className="space-y-5">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">Brief Your Project</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                          Select scope details below. We will deploy custom AI model weights tuned for {activeModal.title}.
                        </p>
                      </div>

                      {modalError && (
                        <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 text-xs text-red-400">
                          {modalError}
                        </div>
                      )}

                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Name / Company</label>
                        <input
                          type="text"
                          required
                          value={modalForm.name}
                          onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                          placeholder="John Doe / Acme Corp"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={modalForm.email}
                          onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={modalForm.phone}
                          onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Philosophy/Brief */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Project Philosophy / Brief</label>
                        <textarea
                          required
                          value={modalForm.philosophy}
                          onChange={(e) => setModalForm({ ...modalForm, philosophy: e.target.value })}
                          placeholder="Outline visual themes, pacing parameters, and brand assets to preserve..."
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-800 focus:border-neutral-500 focus:outline-none transition-colors h-24 resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={modalLoading}
                        className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-neutral-200 disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        {modalLoading ? (
                          <span>Deploying Weights...</span>
                        ) : (
                          <>
                            <span>Submit Project Brief</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shadow-lg">
                        <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                      </div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-wider">Brief Deposited</h4>
                      <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
                        Your brand request has been mapped to our {activeModal.title} pipeline. Our AI directors will match concept spaces and contact you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setActiveModal(null);
                          setModalSubmitted(false);
                          setModalError(null);
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors"
                      >
                        Close Portal
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
