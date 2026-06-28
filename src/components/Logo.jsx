'use client';

import React from 'react';

export default function Logo({ className = "w-10 h-8" }) {
  return (
    <svg 
      viewBox="0 0 100 80" 
      className={`${className} transition-transform duration-300 group-hover:scale-105`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Film Ribbon Dark Metallic Body Gradient */}
        <linearGradient id="filmBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="30%" stopColor="#0f172a" />
          <stop offset="70%" stopColor="#02040a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        
        {/* Specular Highlight Gradient */}
        <linearGradient id="specularHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Ambient Outer Glow/Shadow behind the ribbon */}
      <path 
        d="M 22 62 Q 28 10 44 28 T 60 48 T 76 10 Q 82 62 82 62" 
        stroke="#06b6d4" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.25"
        className="blur-[2px]"
      />

      {/* Film ribbon main body */}
      <path 
        d="M 22 62 Q 28 10 44 28 T 60 48 T 76 10 Q 82 62 82 62" 
        stroke="url(#filmBody)" 
        strokeWidth="10.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Glossy specular chrome stripe down the center */}
      <path 
        d="M 22 62 Q 28 10 44 28 T 60 48 T 76 10 Q 82 62 82 62" 
        stroke="url(#specularHighlight)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Sprocket Holes Left Margin */}
      <path 
        d="M 22 62 Q 28 10 44 28 T 60 48 T 76 10 Q 82 62 82 62" 
        stroke="#22d3ee" 
        strokeWidth="1.2" 
        strokeDasharray="2 3"
        strokeLinecap="round"
        transform="translate(-3.8, 0)"
        opacity="0.85"
      />
      
      {/* Sprocket Holes Right Margin */}
      <path 
        d="M 22 62 Q 28 10 44 28 T 60 48 T 76 10 Q 82 62 82 62" 
        stroke="#22d3ee" 
        strokeWidth="1.2" 
        strokeDasharray="2 3"
        strokeLinecap="round"
        transform="translate(3.8, 0)"
        opacity="0.85"
      />
    </svg>
  );
}
