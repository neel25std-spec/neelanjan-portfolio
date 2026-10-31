"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";

const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: true,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const [isProjectsActive, setIsProjectsActive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!cardRef.current) return;
    const card = cardRef.current;
    const isMobile = window.innerWidth < 1024;

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        endTrigger: "#about",
        end: "center center",
        scrub: 1.5,
        invalidateOnRefresh: true,
        id: "hero-trigger",
      },
    });

    heroTimeline
      .to(card, {
        y: () => {
          const landing = document.getElementById("card-landing-zone");
          if (!landing || !card) return isMobile ? 1.4 * window.innerHeight : window.innerHeight;
          const landingRect = landing.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const scrollY = window.scrollY;
          return (
            landingRect.top +
            scrollY +
            landingRect.height / 2 -
            (cardRect.top + scrollY + cardRect.height / 2)
          );
        },
        x: () => {
          if (!isMobile) return 0.25 * window.innerWidth;
          const landing = document.getElementById("card-landing-zone");
          if (!landing || !card) return 0;
          const landingRect = landing.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          return landingRect.left + landingRect.width / 2 - (cardRect.left + cardRect.width / 2);
        },
        rotateY: 180,
        z: 100,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        card,
        {
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

    const frontGlare = card.querySelector(".front-glare");
    const backGlare = card.querySelector(".back-glare");

    if (frontGlare) {
      heroTimeline.to(frontGlare, { xPercent: 200, opacity: 0, duration: 0.5, ease: "none" }, 0);
    }
    if (backGlare) {
      heroTimeline.fromTo(
        backGlare,
        { xPercent: -200, opacity: 0 },
        { xPercent: 100, opacity: 0.5, duration: 0.5, ease: "none" },
        0.5
      );
    }

    if (capsuleRef.current) {
      gsap.fromTo(
        capsuleRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top top",
            end: "top top",
            toggleActions: "play none none none",
            id: "capsule-entrance",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getById("hero-trigger")?.kill();
      ScrollTrigger.getById("capsule-entrance")?.kill();
    };
  }, []);

  return (
    <SmoothScroll>
      <main ref={mainRef} className="min-h-screen bg-background">
        <Header isProjectsActive={isProjectsActive} />
        <Hero cardRef={cardRef} />
        <About ref={aboutRef} />
        <Projects
          setIsProjectsActive={setIsProjectsActive}
          capsuleRef={capsuleRef}
        />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
