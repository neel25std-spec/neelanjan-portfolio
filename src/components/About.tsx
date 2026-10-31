"use client";

import React, { forwardRef } from "react";

const About = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-[120vh] lg:min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 bg-neutral-950 overflow-hidden py-24 lg:py-0"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
        <div className="z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="font-bebas text-7xl md:text-9xl text-white mb-8">About Me</h2>
          <div className="space-y-6 max-w-xl">
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              I am a passionate Full-stack Developer and UI/UX Designer who loves to
              bridge the gap between complex logic and beautiful aesthetics.
            </p>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              With years of experience in the digital space, I specialize in building
              high-performance, interactive websites that tell a story.
            </p>
          </div>
        </div>

        {/* Target landing zone for the 3D card flight animation */}
        <div
          className="h-[350px] sm:h-[450px] lg:h-[600px] w-full relative"
          id="card-landing-zone"
        />
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
