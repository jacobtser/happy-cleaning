"use client";

import { Sparkle, Leaf, Truck, Heart, WhatsApp } from "./Icons";

export function BeautifulBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Background video - your laundry video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/laundry-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay - forest theme */}
      <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/80 via-forest/60 to-forest-deep/90" />

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

      {/* Floating laundry items - towels and shirts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-white/30 backdrop-blur rounded-xl rotate-12 animate-float-slow"
          style={{ animationDelay: "0s" }}
        >
          <Heart className="h-8 w-8 text-coral/60" />
        </div>
        <div
          className="absolute top-30 right-10 w-20 h-16 bg-white/40 backdrop-blur rounded-xl rotate-6 animate-float-slow"
          style={{ animationDelay: "2s" }}
        >
          <Truck className="h-8 w-8 text-gold/60" />
        </div>
        <div
          className="absolute bottom-40 left-20 w-14 h-14 bg-white/30 backdrop-blur rounded-full animate-float-slow"
          style={{ animationDelay: "4s" }}
        >
          <Leaf className="h-6 w-6 text-sage/60" />
        </div>
        <div
          className="absolute bottom-20 right-20 w-18 h-14 bg-white/50 backdrop-blur rounded-xl rotate-3 animate-float-slow"
          style={{ animationDelay: "1s" }}
        >
          <WhatsApp className="h-7 w-7 text-[#1faa59]/70" />
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
    </div>
  );
}
