"use client";

import { Sparkle } from "./Icons";

export function BeautifulBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
    >
      {/* Background video, clearly visible but calm. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-bg absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/laundry-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Soft veil keeps the video visible while preserving text contrast. */}
      <div className="video-veil absolute inset-0" />
      <div className="video-tint absolute inset-0 bg-gradient-to-tr from-sage/25 via-transparent to-gold/10" />

      {/* Decorative glow blobs */}
      <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full bg-coral/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] rounded-full bg-gold/15 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/3 w-[30rem] h-[30rem] rounded-full bg-sage/30 blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/4 right-1/4 w-[25rem] h-[25rem] rounded-full bg-coral/15 blur-[80px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Rising soap bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
            style={{
              left: `${10 + i * 10}%`,
              bottom: "-10%",
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              animation: `rise-bubble ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 6}%`,
              top: `${20 + i * 5}%`,
              animation: `sparkle-float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.7,
            }}
          >
            <Sparkle className="h-3 w-3 text-coral/40" />
          </div>
        ))}
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
    </div>
  );
}
