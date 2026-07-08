"use client";

import React, { useRef, useState } from 'react';

export default function SpotlightHeading({ title }) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative select-none cursor-default py-2"
    >
      {/* Base Title Layer (Slightly dimmed grey text) */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-500 leading-tight transition-colors duration-300">
        {title}
      </h1>

      {/* Spotlight revealed text overlay (Pure white text, revealed only inside circle mask) */}
      <h1 
        className="absolute inset-0 text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight pointer-events-none transition-opacity duration-300 py-2"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 80px at ${coords.x}px ${coords.y}px, black 100%, transparent 100%)`,
          maskImage: `radial-gradient(circle 80px at ${coords.x}px ${coords.y}px, black 100%, transparent 100%)`,
        }}
      >
        {title}
      </h1>

      {/* Visual Translucent Lens Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-lg overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 80px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 70%, transparent 100%)`,
        }}
      />
    </div>
  );
}
