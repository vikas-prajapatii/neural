'use client';

import React from 'react';

export default function Logo({ className = "w-10 h-8" }) {
  return (
    <svg 
      viewBox="0 0 100 80" 
      className={`${className} transition-transform duration-300 group-hover:scale-[1.04]`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dark chrome gradient for ribbon front faces */}
        <linearGradient id="chromeLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" /> {/* Light slate/chrome */}
          <stop offset="35%" stopColor="#1e293b" /> {/* Dark slate */}
          <stop offset="70%" stopColor="#090d16" /> {/* Charcoal/black */}
          <stop offset="100%" stopColor="#334155" /> {/* Slate reflection */}
        </linearGradient>
        
        {/* Darker gradient for ribbon back folds (adds depth shadow) */}
        <linearGradient id="chromeDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#070a10" />
          <stop offset="60%" stopColor="#111827" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Specular highlight overlay for 3D metallic sheen */}
        <linearGradient id="specularGlint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
        </linearGradient>

        {/* Neon Glow Filter */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 3D Ribbon segment layers */}
      
      {/* 1. Left ascending pillar & loop (background layer) */}
      <g className="relative">
        {/* Back glow shadow */}
        <path 
          d="M 22 68 Q 23 20 40 20 Q 48 20 46 36" 
          stroke="#06b6d4" 
          strokeWidth="12" 
          strokeLinecap="round" 
          opacity="0.18"
          className="blur-[2px]"
        />
        {/* Metal Body */}
        <path 
          d="M 22 68 Q 23 20 40 20 Q 48 20 46 36" 
          stroke="url(#chromeLight)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        {/* Specular Glint */}
        <path 
          d="M 22 68 Q 23 20 40 20 Q 48 20 46 36" 
          stroke="url(#specularGlint)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        {/* Sprocket left border */}
        <path 
          d="M 22 68 Q 23 20 40 20 Q 48 20 46 36" 
          stroke="#22d3ee" 
          strokeWidth="1.2" 
          strokeDasharray="2.5 3" 
          strokeLinecap="round"
          transform="translate(-3.6, 0)"
          className="stroke-cyan-400/80 group-hover:stroke-cyan-300 group-hover:opacity-100 transition-all duration-300"
          filter="url(#neonGlow)"
        />
        {/* Sprocket right border */}
        <path 
          d="M 22 68 Q 23 20 40 20 Q 48 20 46 36" 
          stroke="#22d3ee" 
          strokeWidth="1.2" 
          strokeDasharray="2.5 3" 
          strokeLinecap="round"
          transform="translate(3.6, 0)"
          className="stroke-cyan-400/80 group-hover:stroke-cyan-300 group-hover:opacity-100 transition-all duration-300"
          filter="url(#neonGlow)"
        />
      </g>

      {/* 2. Middle descending diagonal (back shadow twist) */}
      <g>
        {/* Metal Body */}
        <path 
          d="M 46 36 L 56 60 C 60 68 66 68 68 60" 
          stroke="url(#chromeDark)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        {/* Specular Glint */}
        <path 
          d="M 46 36 L 56 60 C 60 68 66 68 68 60" 
          stroke="url(#specularGlint)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        {/* Sprocket left border */}
        <path 
          d="M 46 36 L 56 60 C 60 68 66 68 68 60" 
          stroke="#22d3ee" 
          strokeWidth="1.2" 
          strokeDasharray="2.5 3" 
          strokeLinecap="round"
          transform="translate(-3.6, 0)"
          className="stroke-cyan-400/80 group-hover:stroke-cyan-300 group-hover:opacity-100 transition-all duration-300"
          filter="url(#neonGlow)"
        />
        {/* Sprocket right border */}
        <path 
          d="M 46 36 L 56 60 C 60 68 66 68 68 60" 
          stroke="#22d3ee" 
          strokeWidth="1.2" 
          strokeDasharray="2.5 3" 
          strokeLinecap="round"
          transform="translate(3.6, 0)"
          className="stroke-cyan-400/80 group-hover:stroke-cyan-300 group-hover:opacity-100 transition-all duration-300"
          filter="url(#neonGlow)"
        />
      </g>

      {/* 3. Right ascending loop & descent (foreground layer) */}
      <g>
        {/* Back glow shadow */}
        <path 
          d="M 68 60 Q 72 20 80 20 Q 86 20 86 68" 
          stroke="#06b6d4" 
          strokeWidth="12" 
          strokeLinecap="round" 
          opacity="0.18"
          className="blur-[2px]"
        />
        {/* Metal Body */}
        <path 
          d="M 68 60 Q 72 20 80 20 Q 86 20 86 68" 
          stroke="url(#chromeLight)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        {/* Specular Glint */}
        <path 
          d="M 68 60 Q 72 20 80 20 Q 86 20 86 68" 
          stroke="url(#specularGlint)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        {/* Sprocket left border */}
        <path 
          d="M 68 60 Q 72 20 80 20 Q 86 20 86 68" 
          stroke="#22d3ee" 
          strokeWidth="1.2" 
          strokeDasharray="2.5 3" 
          strokeLinecap="round"
          transform="translate(-3.6, 0)"
          className="stroke-cyan-400/80 group-hover:stroke-cyan-300 group-hover:opacity-100 transition-all duration-300"
          filter="url(#neonGlow)"
        />
        {/* Sprocket right border */}
        <path 
          d="M 68 60 Q 72 20 80 20 Q 86 20 86 68" 
          stroke="#22d3ee" 
          strokeWidth="1.2" 
          strokeDasharray="2.5 3" 
          strokeLinecap="round"
          transform="translate(3.6, 0)"
          className="stroke-cyan-400/80 group-hover:stroke-cyan-300 group-hover:opacity-100 transition-all duration-300"
          filter="url(#neonGlow)"
        />
      </g>
    </svg>
  );
}
