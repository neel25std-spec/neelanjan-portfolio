"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { projectsData } from "@/data/projects";

interface ProjectsProps {
  setIsProjectsActive: (active: boolean) => void;
  capsuleRef: React.RefObject<HTMLDivElement | null>;
}

export default function Projects({ setIsProjectsActive, capsuleRef }: ProjectsProps) {
  const [category, setCategory] = useState<"websites" | "uiux">("websites");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = document.getElementById("projects");
    if (!section) return;

    const cards = section.querySelectorAll(".project-card-wrapper");
    const trigger = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        id: `projects-trigger-${category}`,
        start: "top top",
        end: `+=${(projectsData[category].length + 0.5) * 100}%`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onToggle: (self) => setIsProjectsActive(self.isActive),
      },
    });

    cards.forEach((card, index) => {
      trigger.fromTo(
        card,
        { y: "100vh", opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        index + 0.5
      );
      if (index > 0) {
        trigger.to(
          cards[index - 1],
          { scale: 0.95, opacity: 0.8, duration: 1, ease: "none" },
          index + 0.5
        );
      }
    });

    return () => {
      ScrollTrigger.getById(`projects-trigger-${category}`)?.kill();
    };
  }, [category, setIsProjectsActive]);

  return (
    <section id="projects" className="relative h-screen bg-neutral-950 overflow-hidden">
      {/* Giant Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="font-bebas text-[22vw] md:text-[25vw] leading-none text-white/5 font-normal tracking-tighter text-center">
          PROJECTS
        </h2>
      </div>

      {/* Floating Category Switcher Capsule */}
      <div
        ref={capsuleRef}
        className="absolute top-20 left-0 right-0 z-30 flex justify-center px-6 pt-1"
        style={{ opacity: 0 }}
      >
        <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-xl relative overflow-hidden">
          <motion.div
            className="absolute top-1 bottom-1 left-1 bg-accent rounded-full z-0"
            initial={false}
            animate={{
              x: category === "websites" ? 0 : "100%",
              width: "calc(50% - 4px)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
          />
          {(["websites", "uiux"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCategory(tab)}
              className={`relative w-24 sm:w-28 md:w-32 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 flex items-center justify-center z-10 ${
                category === tab ? "text-black" : "text-white/40 hover:text-white"
              }`}
            >
              <span className="relative z-10">
                {tab === "websites" ? "Websites" : "UI & UX"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stacked Cards Deck */}
      <div className="relative h-full flex items-center justify-center pt-24 md:pt-32 z-10">
        {projectsData[category].map((project, index) => (
          <div
            key={project.id}
            className="project-card-wrapper absolute w-full max-w-7xl px-6"
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
