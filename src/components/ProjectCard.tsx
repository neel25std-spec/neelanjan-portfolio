"use client";

import React, { useState, useRef, useEffect } from "react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function FigmaIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 38 57"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <path d="M19 28.5C19 25.0192 21.8192 22.2 25.3 22.2C28.7808 22.2 31.6 25.0192 31.6 28.5C31.6 31.9808 28.7808 34.8 25.3 34.8C21.8192 34.8 19 31.9808 19 28.5Z" />
      <path d="M0 47.5C0 44.0192 2.81924 41.2 6.3 41.2H12.7V53.8C12.7 53.8 12.7 53.8 12.7 53.8C12.7 55.5673 11.2673 57 9.5 57C7.73269 57 6.3 55.5673 6.3 53.8C6.3 53.8 6.3 53.8 6.3 53.8V47.5H0Z" />
      <path d="M19 0H25.3C28.7808 0 31.6 2.81924 31.6 6.3C31.6 9.78076 28.7808 12.6 25.3 12.6H19V0Z" />
      <path d="M0 28.5C0 25.0192 2.81924 22.2 6.3 22.2H12.7V34.8H6.3C2.81924 34.8 0 31.9808 0 28.5Z" />
      <path d="M0 6.3C0 2.81924 2.81924 0 6.3 0H12.7V12.6H6.3C2.81924 12.6 0 9.78076 0 6.3Z" />
    </svg>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(index === 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (shouldLoad) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [project.image, shouldLoad]);

  const isFigma = project.link?.includes("figma.com");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] sm:h-[80vh] md:h-[85vh] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col md:flex-row"
    >
      <div className="flex flex-col md:flex-row w-full h-full relative overflow-y-auto md:overflow-hidden">
        {/* Subtle radial glare */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

        {/* Left Info Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-between w-full md:w-1/2 relative z-10">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-bebas text-5xl md:text-7xl text-white/5 select-none text-left">
                {project.id}
              </span>
              <button
                onClick={() => window.open(project.link, "_blank")}
                className="group relative overflow-hidden rounded-full border border-white/20 px-4 md:px-6 py-2 md:py-2 text-[9px] md:text-[10px] tracking-widest uppercase font-bold text-white transition-all hover:border-accent"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                  {isFigma && <FigmaIcon />}
                  {isFigma ? "View in Figma" : "Live Project"}
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold text-left">
                  CLIENT: {project.client}
                </p>
              </div>

              <h3 className="font-bebas text-4xl md:text-7xl text-white leading-none text-left">
                {project.title}
              </h3>

              <div className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-lg text-left line-clamp-5">
                {project.description === "SWT_HIGHLIGHT" ? (
                  <>
                    <span className="text-accent font-bold">50,000+ TOTAL DOWNLOADS</span> |{" "}
                    <span className="text-accent font-bold">7,000–8,000 WEEKLY ORGANIC INSTALLS</span> —
                    Engineered a next-gen device-bound auth library for Node.js using AES-256-GCM encryption;
                    independently maintained with zero external contributors.
                  </>
                ) : (
                  project.description
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 sm:gap-3 flex-wrap mt-6 md:mt-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[9px] uppercase tracking-[0.1em] font-semibold text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Media Preview Panel */}
        <div
          onClick={() => window.open(project.link, "_blank")}
          className="w-full md:w-1/2 h-[40%] sm:h-[45%] md:h-full bg-neutral-800/50 relative group overflow-hidden border-t md:border-t-0 md:border-l border-white/10 shrink-0 cursor-pointer"
        >
          <div className="w-full h-full relative">
            <div
              className={`absolute inset-0 w-full h-full opacity-40 animate-pulse bg-gradient-to-br z-0 ${project.gradient}`}
            />
            {shouldLoad ? (
              <img
                ref={imgRef}
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                width={800}
                height={500}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 relative z-10 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <div className="w-full h-full bg-neutral-800/20" />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Hover Floating Launch Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
