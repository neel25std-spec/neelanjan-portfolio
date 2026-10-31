"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { personalInfo } from "@/lib/personalInfo";

interface HeaderProps {
  isProjectsActive: boolean;
}

export default function Header({ isProjectsActive }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Derive initial from name (e.g. "N" from "NEELANJAN")
  const initialLetter = personalInfo.name.charAt(0).toUpperCase();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur-xl min-w-[240px] md:min-w-[300px] justify-between">
          {/* Logo / Monogram Initial */}
          <div className="flex items-center gap-1 pl-1">
            <div className="h-8 w-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
              <span className="font-great-vibes text-sm text-white select-none leading-none translate-y-[2px] translate-x-[-1px]">
                {initialLetter}
              </span>
            </div>
          </div>

          {/* Center Content: Status or Nav Links */}
          <div className="flex-1 flex justify-center overflow-hidden h-9">
            <AnimatePresence mode="wait">
              {isProjectsActive ? (
                <motion.div
                  key="available-status"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 px-4"
                >
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white whitespace-nowrap">
                    Available for Work
                  </span>
                </motion.div>
              ) : (
                <React.Fragment key="nav-and-mobile-status">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden items-center gap-1 md:flex"
                  >
                    <a
                      href="#home"
                      className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent cursor-pointer"
                    >
                      Home
                    </a>
                    <a
                      href="#about"
                      className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent cursor-pointer"
                    >
                      About
                    </a>
                    <a
                      href="#projects"
                      className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent cursor-pointer"
                    >
                      Projects
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center md:hidden"
                  >
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/50">
                      Portfolio / 26
                    </span>
                  </motion.div>
                </React.Fragment>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action */}
          {!isProjectsActive && (
            <>
              <button
                onClick={() => scrollTo("contact")}
                className="hidden md:block rounded-full bg-white px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
              >
                Contact
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex md:hidden p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </>
          )}
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
