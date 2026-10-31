import React from "react";

export interface Project {
  id: string;
  client: string;
  title: string;
  description: string | React.ReactNode;
  image: string;
  tags: string[];
  gradient: string;
  link: string;
}

export const projectsData: Record<"websites" | "uiux", Project[]> = {
  websites: [
    {
      id: "01",
      client: "Evercrown",
      title: "Evercrown",
      description:
        "A highly aesthetic and interactive digital showcase for Evercrown, featuring fluid animations, a premium dark layout, and high-performance visual storytelling designed to showcase the brand's luxurious and modern identity.",
      image: "/evercrown.webp",
      tags: ["React", "GSAP", "Aesthetics", "Animations"],
      gradient: "from-teal-600/20 to-emerald-600/20",
      link: "https://evercrown-rs.vercel.app/",
    },
    {
      id: "02",
      client: "npm Package",
      title: "SWT (secure-web-token)",
      description: "SWT_HIGHLIGHT",
      image: "/swt.webp",
      tags: ["Node.js", "Security", "npm", "Encryption"],
      gradient: "from-indigo-600/20 to-blue-600/20",
      link: "https://www.npmjs.com/package/secure-web-token",
    },
    {
      id: "03",
      client: "Velvet Pour",
      title: "Velvet Pour",
      description:
        "A luxurious and elegant web experience crafted exclusively for premium brands. This project focuses on delivering a sophisticated aesthetic through the use of smooth, performant animations, high-fidelity imagery, and seamless page transitions, ensuring absolute digital elegance.",
      image: "/velvet-pour.webp",
      tags: ["Next.js", "Framer Motion", "Premium"],
      gradient: "from-purple-600/20 to-pink-600/20",
      link: "https://velvetpourpearl.vercel.app/",
    },
    {
      id: "04",
      client: "Retro Building",
      title: "Retro Building",
      description:
        "A nostalgic yet modern architectural showcase that seamlessly blends retro aesthetics with contemporary web technologies. It features an interactive layout, engaging visual effects, and a highly responsive design, perfectly encapsulating the essence of classic architecture within a modern digital frame.",
      image: "/retrobuilding.webp",
      tags: ["React", "Aesthetic", "Architecture"],
      gradient: "from-amber-600/20 to-yellow-700/20",
      link: "https://retrobuilding.vercel.app/",
    },
    {
      id: "05",
      client: "GTA VI",
      title: "GTA VI Website",
      description:
        "A stunning, fan-made immersive experience celebrating the highly anticipated release of GTA VI. The website is characterized by its cinematic transitions, dynamic layout shifts, and bold visual storytelling, mirroring the chaotic yet mesmerizing energy of the game's universe.",
      image: "/gta-vi.webp",
      tags: ["React", "Animations", "Immersive"],
      gradient: "from-rose-600/20 to-purple-700/20",
      link: "https://gta-vi-ms.vercel.app/",
    },
  ],
  uiux: [
    {
      id: "01",
      client: "TR HOST",
      title: "TR HOST (REDESIGN)",
      description:
        "A deep UX exploration and complete visual overhaul of the TP HOST hosting platform. The redesign prioritizes information architecture, streamlined product discovery, and a consistent design system that scales across mobile and desktop environments.",
      image: "/tp-host.webp",
      tags: ["Figma", "Redesign", "UX"],
      gradient: "from-emerald-500/20 to-cyan-600/20",
      link: "https://www.figma.com/design/HpZAg5jSAywh4mMXyzevId/TP-HOST-REDESIGN?node-id=0-1&p=f&t=oBPmQozY0pIHIJLe-0",
    },
    {
      id: "02",
      client: "Tian",
      title: "Tian - Ecommerce webapp",
      description:
        "A premium e-commerce mobile application interface that focuses on visual storytelling and editorial-style product presentation. It features a fluid checkout experience, sophisticated search filtering, and high-impact typography for brand elevation.",
      image: "/tian.webp",
      tags: ["Ecommerce", "UI Design"],
      gradient: "from-rose-500/20 to-orange-600/20",
      link: "https://www.figma.com/design/QXNFdVQo7VbXgZhXaTSzyV/Tian---Ecommerce-webapp?node-id=1-2&p=f&t=I2NPaOmboY53G7od-0",
    },
    {
      id: "03",
      client: "Duevion",
      title: "DUEVION- Due Management",
      description:
        "A streamlined financial management application designed for simplicity and trust. It provides shop owners and individuals with a clean dashboard for tracking payment cycles, automated reminders, and organized financial history in a clutter-free environment.",
      image: "/duevion.webp",
      tags: ["Fintech", "App Design"],
      gradient: "from-purple-500/20 to-blue-600/20",
      link: "https://www.figma.com/design/UnhUfSmBda8GkzbkgtuEQa/Duevion?node-id=0-1&p=f&t=eqGWvJWn7h6quyEY-0",
    },
    {
      id: "04",
      client: "SHOP.CO",
      title: "SHOP.CO - ECOMMERCE",
      description:
        "A robust fashion e-commerce design system that handles complex product variations and dynamic category management. It emphasizes high-fidelity prototyping, user-centric filtering, and a seamless transition from discovery to purchase.",
      image: "/shop_co.webp",
      tags: ["Ecommerce", "Web Design"],
      gradient: "from-amber-400/20 to-orange-500/20",
      link: "https://www.figma.com/design/HnkxdHr7LLiAwPwxR3mXRL/Shop.Co-Ecommerce?node-id=0-1&p=f&t=2MbN28UIoYLqDVmn-0",
    },
    {
      id: "05",
      client: "DExA",
      title: "DExA - Clothing in style",
      description:
        "A minimalist fashion branding and shopping interface that uses whitespace and elegant typography to create a sense of luxury. The UI is architected around high-resolution imagery and a distraction-free navigation system for high-end apparel.",
      image: "/dexa.webp",
      tags: ["Fashion", "minimal"],
      gradient: "from-pink-500/20 to-rose-600/20",
      link: "https://www.figma.com/design/uZXfWwsI87GMz9P4AgVMEf/Shopping-Website--DExA-?node-id=0-1&t=HsG0PUjlPidtS0Kx-0",
    },
  ],
};
