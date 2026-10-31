"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ColorSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const swatches = [
    { name: "Indigo", color: "#6366f1" },
    { name: "Gold", color: "#fbbf24" },
    { name: "Mint", color: "#4ade80" },
  ];

  return (
    <div className="relative flex items-center justify-center md:justify-end h-10 min-w-[120px]">
      <div className="flex items-center">
        {swatches.map((item, index) => (
          <motion.button
            key={item.name}
            onClick={(e) => {
              if (isOpen) {
                document.documentElement.style.setProperty("--color-accent", item.color);
              } else {
                setIsOpen(true);
                e.stopPropagation();
              }
            }}
            initial={false}
            animate={{
              marginLeft: index === 0 ? 0 : isOpen ? 12 : -20,
              scale: 1,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            whileHover={{
              scale: 1.15,
              zIndex: 100,
              boxShadow: `0 0 20px ${item.color}60`,
            }}
            whileTap={{ scale: 0.95 }}
            className="h-8 w-8 rounded-full border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.4)] cursor-pointer transition-shadow shrink-0 relative"
            style={{ backgroundColor: item.color, zIndex: 50 + index }}
            title={item.name}
          />
        ))}
        {!isOpen && (
          <div
            className="absolute right-0 h-8 w-8 rounded-full cursor-pointer z-[110]"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsOpen(false)}
          className="ml-2 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/30 hover:text-white transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
