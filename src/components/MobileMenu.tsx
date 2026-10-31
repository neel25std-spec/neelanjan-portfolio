"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl md:hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {["home", "about", "projects", "contact"].map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bebas text-5xl text-white hover:text-accent transition-colors uppercase tracking-widest"
              >
                {section}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
