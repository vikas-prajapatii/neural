'use client';

import React, { useState } from 'react';
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
    '/assets/services/hover-ai-video.jpg',
    '/assets/services/hover-short-form.jpg',
    '/assets/services/hover-video-ads.jpg',
    '/assets/services/hover-branded-film.jpg',
    '/assets/services/hover-music-video.jpg',
    '/assets/services/hover-photoshoots.jpg',
    '/assets/services/hover-brand-poster.jpg',
    '/assets/blog/ai-video-hover.jpg',
    '/assets/blog/ai-video-preview.jpg',
    '/assets/blog/branded-film-hover.jpg',
    '/assets/blog/short-form-hover.jpg',
    '/assets/blog/video-ads-hover.jpg'
  ];
  return images[index % images.length] || '/assets/placeholder/default-placeholder.png';
};

// Category slug helper
const getCategorySlug = (cat) => {
  return cat.toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^a-z0-9]+/g, '-');
};

function BlogCard({ post, postIndex, postImg }) {
  const [lens, setLens] = useState({
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
    
    // Scale lens mapping relative to the 256x384 image dimensions
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    
    setLens({
      show: true,
      x: x - 64, // Center offset
      y: y - 64,
      bgX,
      bgY
    });
  };

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/40 backdrop-blur-md hover:border-cyan-500/20 transition-all duration-300 min-h-[220px]"
    >
      {/* Article Image Frame */}
      <div 
        className="w-full md:w-56 h-48 md:h-auto rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 relative flex-shrink-0 cursor-crosshair select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setLens(prev => ({ ...prev, show: false }))}
      >
        <Image 
          src={postImg} 
          alt={post.title} 
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 224px"
        />

        {/* Magnifying Glass Lens */}
        {lens.show && (
          <div 
            className="absolute hidden md:block border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.4)] pointer-events-none rounded-full"
            style={{
              width: '128px',
              height: '128px',
              left: `${lens.x}px`,
              top: `${lens.y}px`,
              backgroundImage: `url(${postImg})`,
              backgroundPosition: `${lens.bgX}% ${lens.bgY}%`,
              backgroundSize: '200% 200%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
      </div>

      {/* Article Copy Details */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-3 text-neutral-500 text-[10px] font-mono mb-4">
            <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug mb-3">
            {post.title}
          </h3>
          
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light line-clamp-2">
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

export default function RecentBlogFeedPage() {
  // Sort posts by date (newest first)
  const allPosts = Object.values(blogData).sort((a, b) => new Date(b.date) - new Date(a.date));
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Retrieve unique categories
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));

  // Pagination logic
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Recent posts list (first 3 posts)
  const recentPosts = allPosts.slice(0, 3);

  // Tags list
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
          href="/blog" 
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog Home
        </Link>

        {/* Title Header */}
        <header className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>[ 🕒 TIMELINE OF INTEL ]</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase mb-6 leading-none text-white">
            RECENT <span className="text-neutral-500">{"//"}</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">POSTS</span>
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
            All publications sorted by newest first. Operational breakdowns, technical guides, and cinematic strategies.
          </p>
        </header>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: List of paginated recent posts */}
          <div className="lg:col-span-8 space-y-8">
            {currentPosts.map((post, index) => {
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-10">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:text-white hover:border-neutral-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Previous
                </button>
                <span className="text-xs font-mono text-neutral-500">
                  Page <span className="text-cyan-400 font-bold">{currentPage}</span> of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:text-white hover:border-neutral-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Next
                </button>
              </div>
            )}
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
                      <span className="w-2 h-2 rounded-sm bg-neutral-855 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-300"></span>
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
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-900 text-neutral-450 hover:text-white hover:border-neutral-800 transition-colors"
                  >
                    #{tag}
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
