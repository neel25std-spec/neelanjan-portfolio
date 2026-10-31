"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ColorSwitcher from "./ColorSwitcher";
import { personalInfo } from "@/lib/personalInfo";

interface HeroProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function Hero({ cardRef }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !containerRef.current || window.scrollY > 400) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!cardRef.current || !containerRef.current) {
            ticking = false;
            return;
          }
          const { clientX, clientY } = e;
          const { left, top, width, height } = containerRef.current.getBoundingClientRect();

          gsap.to(cardRef.current, {
            rotateY: 20 * ((clientX - left) / width - 0.5),
            rotateX: -20 * ((clientY - top) / height - 0.5),
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cardRef]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background pt-20"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)] [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Subtitle */}
          <p className="mb-8 text-xs font-medium tracking-widest uppercase text-neutral-400">
            {personalInfo.name} · Creative Portfolio
          </p>

          {/* Responsive Hero Showcase: 3-column grid on md+, graceful stack on mobile */}
          <div className="relative flex w-full max-w-[1700px] flex-col items-center justify-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 lg:gap-8 xl:gap-12">
            {/* Left Big Heading: WEBDEV */}
            <div className="flex w-full justify-center md:justify-end z-10">
              <h1 className="font-bebas hero-headline-webdev hero-animate-left tracking-tight text-white whitespace-nowrap text-center md:text-right select-none">
                WEBDEV
              </h1>
            </div>

            {/* Center 3D Card */}
            <div className="relative my-8 md:my-0 shrink-0 [perspective:5000px] [transform-style:preserve-3d] z-20 flex justify-center">
              <div
                ref={cardRef}
                className="hero-card-entrance relative h-[360px] w-[240px] sm:h-[420px] sm:w-[280px] md:h-[380px] md:w-[240px] lg:h-[460px] lg:w-[300px] xl:h-[530px] xl:w-[350px] rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] [transform-style:preserve-3d]"
              >
                {/* 3D Depth Extrusion Layers */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-[2.5rem] border border-white/5 bg-neutral-900/80"
                    style={{ transform: `translateZ(-${(i + 1) * 0.8}px)` }}
                  />
                ))}

                {/* FRONT FACE: Profile Photo */}
                <div className="absolute inset-0 [backface-visibility:hidden] z-10 [transform-style:preserve-3d]">
                  <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/10">
                    <div className="absolute inset-0 bg-neutral-800">
                      {!isLoaded && (
                        <div className="absolute inset-0 w-full h-full bg-neutral-700 animate-pulse" />
                      )}
                      <picture>
                        <source
                          type="image/avif"
                          media="(max-width: 640px)"
                          srcSet={personalInfo.photoMobileAvif}
                        />
                        <source
                          type="image/webp"
                          media="(max-width: 640px)"
                          srcSet={personalInfo.photoMobile}
                        />
                        <source
                          type="image/avif"
                          srcSet={personalInfo.photoAvif}
                        />
                        <source
                          type="image/webp"
                          srcSet={personalInfo.photo}
                        />
                        <img
                          ref={imgRef}
                          src={personalInfo.photo}
                          alt={`${personalInfo.name} Portrait`}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          width={350}
                          height={530}
                          onLoad={() => setIsLoaded(true)}
                          className="h-full w-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 opacity-100"
                        />
                      </picture>
                    </div>
                    {/* Front Glare Sweep */}
                    <div className="front-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>

                {/* BACK FACE: Vision */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(6px)] z-0 [transform-style:preserve-3d]">
                  <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-accent/20 bg-neutral-900 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                    <div className="back-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full" />
                    <div className="flex flex-col items-center mb-4 sm:mb-6 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent/20 blur-md animate-pulse" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(74,222,128,0.8)]" />
                      </div>
                      <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-[0.1em] leading-none">
                        VISION
                      </h3>
                    </div>
                    <div className="w-full text-center px-1 sm:px-2 relative z-10 space-y-4 sm:space-y-6">
                      <p className="text-white/90 text-[14px] sm:text-[15px] leading-relaxed font-light italic">
                        &quot;The web should be{" "}
                        <span className="text-white font-bold not-italic">felt</span>, not just
                        seen.&quot;
                      </p>
                      <div className="h-px w-12 bg-white/10 mx-auto" />
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        By fusing high-end design with merciless performance, I craft digital
                        experiences that refuse to be ignored. Every pixel has a purpose.
                      </p>
                      <div className="pt-2 sm:pt-4">
                        <p className="text-accent text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-bold uppercase inline-block border border-accent/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/5">
                          Stay Inspired
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Interactive Badge (Hi / Wave) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ opacity: { delay: 1.8, duration: 0.4 } }}
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-20 flex h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 items-center justify-center overflow-hidden rounded-full bg-accent text-black shadow-xl [transform:translateZ(50px)]"
                >
                  <div className="relative h-full w-full">
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: "-100%" }}
                      transition={{ delay: 3.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold"
                    >
                      Hi
                    </motion.div>
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 3.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center p-3 sm:p-4"
                    >
                      <motion.img
                        src="/bye.webp"
                        alt="Waving hand"
                        loading="lazy"
                        width={70}
                        height={70}
                        className="h-full w-full object-contain origin-bottom"
                        animate={{
                          rotate: [0, 5, -5, 12, -12, 18, -18, 18, -18, 12, -12, 5, -5, 0],
                        }}
                        transition={{
                          delay: 4.4,
                          duration: 1.8,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 2,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Big Heading & Subtitle */}
            <div className="flex w-full flex-col items-center md:items-start text-center md:text-left z-10">
              <h1 className="font-bebas hero-headline-designer hero-animate-right tracking-tight text-white whitespace-nowrap text-center md:text-left select-none">
                DESIGNER
              </h1>
              <div className="mt-4 sm:mt-6 max-w-[280px]">
                <p className="text-xs sm:text-sm font-light leading-relaxed text-neutral-400">
                  Full-stack Web Developer &amp; UI/UX Designer crafting digital experiences.
                </p>
              </div>
              {/* Mobile Color Switcher */}
              <div className="mt-8 md:hidden">
                <ColorSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Color Switcher */}
      <div className="hidden md:block absolute md:bottom-12 md:right-12 z-50">
        <ColorSwitcher />
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-white/20" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</p>
        </div>
      </motion.div>
    </section>
  );
}
