'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { blogData } from '@/data/blogData';

// Dynamic image cycling map helper
const getPostImage = (slug, index) => {
  const post = blogData[slug];
  if (post && post.image) {
    return post.image;
  }
  const images = [
    '/hover-ai-video.jpg',
    '/hover-short-form.jpg',
    '/hover-video-ads.jpg',
    '/hover-branded-film.jpg',
    '/hover-music-video.jpg',
    '/hover-photoshoots.jpg',
    '/hover-brand-poster.jpg',
    '/ai-video-hover.jpg',
    '/ai-video-preview.jpg',
    '/branded-film-hover.jpg',
    '/short-form-hover.jpg',
    '/video-ads-hover.jpg'
  ];
  return images[index % images.length];
};

// Category slug helper
const getCategorySlug = (cat) => {
  return cat.toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^a-z0-9]+/g, '-');
};

function BlogCard({ post, postIndex, postImg }) {
  const [lens, setLens] = React.useState({
    show: false,
    x: 0,
    y: 0,
    bgX: 0,
    bgY: 0
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    setLens({
      show: true,
      x: x - 60,
      y: y - 60,
      bgX,
      bgY
    });
  };

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-neutral-800 bg-neutral-950/40 backdrop-blur-md hover:border-cyan-500 hover:shadow-[0_0_35px_rgba(6,182,212,0.3),inset_0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
    >
      {/* Left Side: Image Container */}
      <div 
        className="w-full md:w-2/5 aspect-[4/3] rounded-xl overflow-hidden relative flex-shrink-0 border border-neutral-800/80 bg-slate-950 cursor-zoom-in"
        onMouseEnter={() => setLens(prev => ({ ...prev, show: true }))}
        onMouseLeave={() => setLens(prev => ({ ...prev, show: false }))}
        onMouseMove={handleMouseMove}
      >
        <Image 
          src={postImg} 
          alt={`Neural Noir - ${post.title} - AI cinematic artwork`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        
        {/* LENS EFFECT */}
        {lens.show && (
          <div
            style={{
              position: 'absolute',
              left: `${lens.x}px`,
              top: `${lens.y}px`,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '2px solid #06b6d4',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              backgroundImage: `url(${postImg})`,
              backgroundPosition: `${lens.bgX}% ${lens.bgY}%`,
              backgroundSize: '200% 200%',
              backgroundRepeat: 'no-repeat',
              zIndex: 20
            }}
          />
        )}
      </div>
      
      {/* Right Side: Text Content */}
      <div className="w-full md:w-3/5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-3 font-mono">
            <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] uppercase font-semibold text-cyan-400 tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2 leading-snug mb-3">
            {post.title}
          </h3>
          
          <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3 font-light">
            {post.summary}
          </p>
        </div>

        <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 group-hover:text-white transition-colors duration-200">
          Read Article 
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogFeedPage() {
  const allPosts = Object.values(blogData);

  // 3 static posts shown forever
  const staticSlugs = [
    'shift-to-genai-video',
    'data-isolation-copyright-safety-enterprise-ai',
    'enterprise-ai-solutions-decoupling-costs'
  ];
  const staticPosts = staticSlugs.map(slug => blogData[slug]).filter(Boolean);

  // Categories list
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));

  // Recent posts
  const recentPosts = allPosts.slice(0, 4);

  // Tags
  const tags = [
    '2026',
    '3D Studio',
    'Brand Building',
    'Neural Architecture',
    'Cinematic Synthesis',
    'Content Marketing',
    'Algorithmic Scaling',
    'Cross-Platform Content',
    'Digital Marketing',
    'Multi-Platform Strategy'
  ];

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-24 md:pt-40 md:pb-32 relative z-10 flex flex-col justify-center select-none">
      {/* Background radial effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Title Header */}
        <header className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>[ 🎥 CINEMATIC INTELLIGENCE ]</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase mb-6 leading-none text-white">
            THE NOIR <span className="text-neutral-500">{"//"}</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">INTELLIGENCE</span>
            <br />
            FUTURE OF CINEMA.
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
            Inside the machine. Deep technical breakdowns, raw creative manifestos, and operational playbooks on deploying next-gen generative video pipelines for global brands.
          </p>
        </header>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: 3 Static Articles */}
          <div className="lg:col-span-8 space-y-8">
            {staticPosts.map((post) => {
              const postIndex = allPosts.findIndex((p) => p.slug === post.slug);
              const postImg = getPostImage(post.slug, postIndex);
              return (
                <BlogCard 
                  key={post.slug}
                  post={post}
                  postIndex={postIndex}
                  postImg={postImg}
                />
              );
            })}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-32 h-fit">
            
            {/* Categories widget */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-3 mb-4">
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/blog/category/${getCategorySlug(cat)}`}
                      className="group flex items-center gap-3 text-sm font-medium py-2.5 w-full text-left text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-sm bg-neutral-850 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-300"></span>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts widget */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-3 mb-6">
                Recent Posts
              </h4>
              <div className="space-y-6">
                {recentPosts.map((post, index) => {
                  const postIndex = allPosts.findIndex((p) => p.slug === post.slug);
                  const postImg = getPostImage(post.slug, postIndex);
                  return (
                    <Link 
                      key={post.slug}
                      href={`/blog/${post.slug}`} 
                      className="flex gap-4 items-center group/recent"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 relative flex-shrink-0">
                        <Image 
                          src={postImg} 
                          alt={`Recent - ${post.title}`} 
                          fill
                          className="object-cover group-hover/recent:scale-105 transition-transform duration-300"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h5 className="text-xs font-bold text-neutral-300 group-hover/recent:text-cyan-400 line-clamp-2 transition-colors leading-snug">
                          {post.title}
                        </h5>
                        <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                          {post.date}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Tags widget */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-3 mb-4">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-cyan-500/30 text-[10px] uppercase font-semibold text-neutral-400 hover:text-white transition-all cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}
