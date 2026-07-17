"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface BackgroundImageProps {
  imageSrc?: string;
  /** Use a lighter left-to-right gradient so more of the image is visible */
  lighter?: boolean;
}

export default function BackgroundImage({
  imageSrc = "/images/brian-ramoroka-seo-web-developer.webp",
  lighter = false,
}: BackgroundImageProps) {
  const imageWrapRef = useRef<HTMLDivElement>(null);

  // Scroll blur written straight to the DOM in a rAF, so scrolling never
  // triggers React re-renders.
  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const maxBlur = 5;
      const scrollRange = 600;
      const blur = Math.min((window.scrollY / scrollRange) * maxBlur, maxBlur);
      if (imageWrapRef.current) {
        imageWrapRef.current.style.filter = `blur(${blur}px)`;
      }
    };
    const handleScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* Desktop left-to-right gradient (different opacity if lighter prop set) */
  const desktopLrGradient = lighter
    ? "linear-gradient(to right, #0a0a0c 0%, rgba(10,10,12,0.7) 20%, rgba(10,10,12,0.3) 40%, transparent 60%)"
    : "linear-gradient(to right, #0a0a0c 0%, rgba(10,10,12,0.75) 15%, rgba(10,10,12,0.4) 35%, rgba(10,10,12,0.1) 55%, transparent 75%)";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">

      {/* ── Portrait image ───────────────────────────────────────────────── */}
      {/* Mobile: full-width, face/upper-body centred at 15% from top       */}
      {/* Desktop: right 55%, anchored top-right                            */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 md:inset-auto md:top-0 md:right-0 md:h-full md:w-[55%]"
        style={{ transition: "filter 0.1s linear" }}
      >
        {/* alt="" — decorative: text overlays it and the wrapper is aria-hidden */}
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
        />
      </div>

      {/* ── Desktop only: left-to-right directional gradient ─────────────── */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{ background: desktopLrGradient }}
      />

      {/* ── Mobile only: vertical dark overlay (image peeks through) ─────── */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.45) 30%, rgba(10,10,12,0.55) 60%, rgba(10,10,12,0.7) 100%)",
        }}
      />

      {/* ── Top-bottom gradient: dark at bottom, slight at top (all sizes) ─ */}
      {/* Desktop version */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.3) 0%, transparent 15%, transparent 60%, rgba(10,10,12,0.85) 95%)",
        }}
      />
      {/* Mobile version — stronger bottom fade */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,12,0.7) 0%, rgba(10,10,12,0.2) 15%, transparent 35%), linear-gradient(to bottom, rgba(10,10,12,0.3) 0%, transparent 20%)",
        }}
      />

      {/* ── Amber glow orb ───────────────────────────────────────────────── */}
      {/* Mobile: smaller (250 px), tighter to edge                          */}
      {/* Desktop: larger (450 px), more breathing room                      */}
      <div
        className="absolute rounded-full
          w-[250px] h-[250px] top-[20%] right-[5%]
          md:w-[450px] md:h-[450px] md:top-[10%] md:right-[12%]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.16) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
