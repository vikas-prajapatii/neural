'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Film, Compass, Rocket } from 'lucide-react';

export default function AboutPage() {
  const leadership = [
    {
      name: "Vikas Prajapati",
      role: "Founder & Creative Director",
      bio: "Visionary filmmaker and digital artist dedicated to bending the boundaries of traditional cinema. Spearheads creative direction, world-building conceptual layouts, and direct human-guided narrative pacing.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Alex Thorne",
      role: "Co-Founder & Chief AI Officer",
      bio: "Senior AI researcher specialized in neural rendering architectures and diffusion model consistency weights. Orchestrates custom model training pipeline stacks to lock-in character and environment fidelity.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black/60 text-neutral-200 pt-32 pb-24 md:pt-44 md:pb-36 font-sans overflow-hidden">
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 mb-20 md:mb-28">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.3em] mb-4">
              Aesthetic Manifesto
            </p>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8">
              Merging Human Cinema with Artificial Intelligence.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
              We are an ultra-premium visual house forging digital dimensions. We do not mimic realities; we synthesize high-fidelity visual bibles for visionary brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. VISION & VALUES */}
      <section className="relative max-w-7xl mx-auto px-6 mb-24 md:mb-32 border-t border-neutral-900 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em] mb-4">
              The Mission
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Visual Scalability Without Compromise.
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed mb-6 font-light">
              Traditional cinematic setups require hundreds of crew members, expensive physical infrastructure, and months of post-production. We dismantle this model by coupling award-winning directors with specialized generative neural networks.
            </p>
            <div className="p-6 border border-neutral-900 bg-neutral-950/45 rounded-2xl">
              <div className="text-4xl font-extrabold text-white mb-1">80%</div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Budget Reduction</p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Scale visuals to blockbuster proportions while cutting traditional logistics budgets significantly.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl border border-neutral-900 bg-neutral-900/30 flex flex-col justify-between min-h-[260px]">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Perfect Consistency</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Lock characters, visual textures, lighting configurations, and key props across all frames dynamically.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-neutral-900 bg-neutral-900/30 flex flex-col justify-between min-h-[260px]">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-300">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Cinematic Atmosphere</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Deep, high-contrast &ldquo;noir&rdquo; visual setups built from meticulously trained custom model weights.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-neutral-900 bg-neutral-900/30 flex flex-col justify-between min-h-[260px]">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Custom Environments</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Construct infinite visual spaces from conceptual mood boards without location limits or weather constraints.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-neutral-900 bg-neutral-900/30 flex flex-col justify-between min-h-[260px]">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-300">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Rapid Iteration</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Generate multiple narrative variations and formats, allowing for precise A/B testing and marketing velocity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUNDERS & LEADERSHIP */}
      <section className="relative max-w-7xl mx-auto px-6 border-t border-neutral-900 pt-20">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em] mb-4">
          Leadership
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-12">
          The Insanes Behind the Screens.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {leadership.map((founder, idx) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group p-6 rounded-3xl border border-neutral-900 bg-neutral-900/20 hover:bg-neutral-900/30 transition-all duration-300"
            >
              {/* Leader Photo */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-neutral-900 relative">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>

              {/* Info Details */}
              <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
                {founder.role}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                {founder.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
