"use client";

import React from "react";
import { personalInfo } from "@/lib/personalInfo";

export default function Footer() {
  const socialLinks = [
    { name: "LinkedIn", url: personalInfo.linkedin },
    { name: "GitHub", url: personalInfo.github },
  ];

  return (
    <footer className="bg-neutral-950 py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-bebas text-2xl text-white tracking-widest">
          {personalInfo.name}
          <span className="text-accent">.</span>
        </div>
        <p
          suppressHydrationWarning
          className="text-neutral-500 text-xs tracking-widest uppercase"
        >
          © {new Date().getFullYear()} All Rights Reserved
        </p>
        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
