import type { Metadata } from "next";
import { Bebas_Neue, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/personalInfo";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} | Web Developer & UI/UX Designer Portfolio`,
  description:
    `Creative portfolio of ${personalInfo.name}, a Full-stack Web Developer and UI/UX Designer specializing in building premium, high-performance digital experiences with Next.js, Framer Motion, and GSAP.`,
  keywords: [
    "Web Developer",
    "UI/UX Designer",
    "Front-end Engineer",
    "Next.js Portfolio",
    "Creative Developer",
    `${personalInfo.name} Portfolio`,
    "React Developer",
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} | Web Developer & UI/UX Designer Portfolio`,
    description:
      `Creative portfolio of ${personalInfo.name}, a Full-stack Web Developer and UI/UX Designer crafting premium digital experiences.`,
    siteName: `${personalInfo.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/neelanjan-profile-mobile.avif"
          type="image/avif"
          media="(max-width: 640px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/neelanjan-profile.avif"
          type="image/avif"
          media="(min-width: 641px)"
          fetchPriority="high"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
