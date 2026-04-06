const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const masterDir = path.join(__dirname, 'master-template');

const websites = [
  {
    id: 13,
    folder: '13_altitudes',
    name: 'Altitudes',
    primaryColor: '#FFFFFF',
    secondaryColor: '#000080', // Navy
    accentColor: '#D4AF37', // Champagne Gold
    fontFamily: '"Playfair Display", serif',
    heroDescription: 'Ascend beyond the ordinary. Experience private aviation redefined with unparalleled luxury and safety.',
    fallbackText: 'ALTITUDES - CLOUD LEVEL 9',
    fallbackVisual: 'Drawing floating cloud particles...',
    industry: 'Private Aviation'
  },
  {
    id: 14,
    folder: '14_oceana_bespoke',
    name: 'Oceana Bespoke',
    primaryColor: '#006994', // Ocean Blue
    secondaryColor: '#FDFBF7', // Pearl White
    accentColor: '#003B5C',
    fontFamily: '"GT Sectra", serif',
    heroDescription: 'Master the seas. Custom luxury yachts designed for those who command the deep.',
    fallbackText: 'OCEANA - DEEP SEA',
    fallbackVisual: 'Drawing water caustic shaders...',
    industry: 'Luxury Yachts'
  },
  {
    id: 15,
    folder: '15_volt_rider',
    name: 'Volt Rider',
    primaryColor: '#7F8C8D', // Concrete Grey
    secondaryColor: '#111111', 
    accentColor: '#CCFF00', // Electric Yellow
    fontFamily: '"Outfit", sans-serif',
    heroDescription: 'Kinetic mobility. Advanced electric bicycles built to dominate the modern cityscape.',
    fallbackText: 'VOLT RIDER - KINETIC',
    fallbackVisual: 'Drawing kinetic bike frames...',
    industry: 'Electric Bicycles'
  },
  {
    id: 16,
    folder: '16_abyss_explorations',
    name: 'Abyss Explorations',
    primaryColor: '#000A1F', // Abyss Black
    secondaryColor: '#001A33',
    accentColor: '#00FFCC', // Bioluminescent Aqua
    fontFamily: '"Cabinet Grotesk", sans-serif',
    heroDescription: 'Descend into the unknown. Deep sea submersibles designed for the final frontier.',
    fallbackText: 'ABYSS - CRITICAL DEPTH',
    fallbackVisual: 'Drawing sonar pulses...',
    industry: 'Submersibles & Deep Sea'
  },
  {
    id: 17,
    folder: '17_pulse_grid',
    name: 'Pulse Grid',
    primaryColor: '#0A2F1D', // Dark Forest Green
    secondaryColor: '#051A10',
    accentColor: '#32CD32', // Lime
    fontFamily: '"Basier Circle", sans-serif',
    heroDescription: 'Empowering the EV revolution. Advanced charging infrastructure for a sustainable tomorrow.',
    fallbackText: 'PULSE GRID - ACTIVE',
    fallbackVisual: 'Drawing energy nodes...',
    industry: 'EV Charging Infrastructure'
  },
  {
    id: 18,
    folder: '18_velocity_rail',
    name: 'Velocity Rail',
    primaryColor: '#C0C0C0', // Silver
    secondaryColor: '#222222',
    accentColor: '#0055A4', // Bullet Blue
    fontFamily: '"Formula Condensed", sans-serif',
    heroDescription: 'Zero friction. Infinite speed. The future of high-speed maglev transit is now.',
    fallbackText: 'VELOCITY - MACH 1',
    fallbackVisual: 'Drawing slipstream blurs...',
    industry: 'Maglev Trains'
  }
];

// Helper to replace text in file
function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [key, value] of Object.entries(replacements)) {
        content = content.replace(new RegExp(key, 'g'), value);
    }
    fs.writeFileSync(filePath, content);
}

// 1. Create the Master Template
console.log('--- GENERATING MASTER TEMPLATE ---');
if (!fs.existsSync(masterDir)) {
    console.log('Running create-next-app...');
    execSync('npx -y create-next-app@14 master-template --ts --tailwind --eslint --app --no-src-dir --import-alias="@/*" --use-npm', { stdio: 'inherit', cwd: __dirname });
    
    console.log('Installing Awwwards dependencies...');
    execSync('npm install gsap @studio-freight/lenis framer-motion three @react-three/fiber @react-three/drei lucide-react clsx tailwind-merge', { stdio: 'inherit', cwd: masterDir });
} else {
    console.log('Master template already exists. Proceeding...');
}

// Ensure pages exist in master
const pagesToCreate = ['about', 'explore', 'auth'];
pagesToCreate.forEach(page => {
    const pageDir = path.join(masterDir, 'app', page);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
});

// Boilerplate Layout
const masterLayout = `import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "{{NAME}} | {{INDUSTRY}}",
  description: "{{HERO_DESC}}",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[var(--col-primary)] text-[var(--col-second)]" style={{ fontFamily: '{{FONT}}' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}`;
fs.writeFileSync(path.join(masterDir, 'app', 'layout.tsx'), masterLayout);

// ClientLayout (Handles Lenis & Audio)
const clientLayout = `"use client";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* Global Audio Controller */}
      <div className="fixed bottom-8 right-8 z-50 text-[var(--col-accent)] backdrop-blur-md bg-black/20 p-4 rounded-full cursor-pointer hover:bg-black/40 transition-all border border-[var(--col-accent)]/30" onClick={() => setMuted(!muted)}>
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </div>
      <audio id="theme-audio" src="/assets/audio/theme-ambient.mp3" loop muted={muted} autoPlay={!muted} />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <h1 className="text-xl font-bold tracking-widest uppercase">{{NAME}}</h1>
        <div className="flex gap-8 text-sm uppercase tracking-widest">
            <a href="/" className="hover:text-[var(--col-accent)] transition-colors">Home</a>
            <a href="/about" className="hover:text-[var(--col-accent)] transition-colors">About</a>
            <a href="/explore" className="hover:text-[var(--col-accent)] transition-colors">Explore</a>
            <a href="/auth" className="hover:text-[var(--col-accent)] transition-colors">Portal</a>
        </div>
      </nav>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1, ease: "circOut" }}
      >
        {children}
      </motion.main>
    </>
  );
}`;
fs.writeFileSync(path.join(masterDir, 'app', 'ClientLayout.tsx'), clientLayout);

// Page boilerplate
const pageTemplate = `"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const heroRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(textRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true
                }
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full relative min-h-[300vh]">
            <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[var(--col-primary)]">
                {/* Fallback canvas background */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 select-none pointer-events-none text-9xl text-center break-words uppercase font-black text-[var(--col-accent)] mix-blend-difference">
                   {{FALLBACK_VISUAL}}
                </div>
                
                <h1 ref={textRef} className="text-7xl md:text-[8vw] font-bold z-10 text-center leading-[0.9] text-[var(--col-second)] mix-blend-difference">
                    {{NAME}}
                    <span className="block text-2xl md:text-4xl mt-6 font-normal tracking-wide text-[var(--col-accent)] max-w-2xl mx-auto">{{HERO_DESC}}</span>
                </h1>
            </section>
            
            <section className="h-screen w-full bg-[var(--col-second)] text-[var(--col-primary)] flex items-center justify-center text-4xl">
                SCROLL DEEP
            </section>
        </div>
    );
}`;
fs.writeFileSync(path.join(masterDir, 'app', 'page.tsx'), pageTemplate);

fs.writeFileSync(path.join(masterDir, 'app', 'about', 'page.tsx'), `export default function About() { return <div className="h-screen flex items-center justify-center text-5xl">ABOUT {{NAME}}</div>; }`);
fs.writeFileSync(path.join(masterDir, 'app', 'explore', 'page.tsx'), `export default function Explore() { return <div className="h-screen flex items-center justify-center text-5xl">EXPLORE {{NAME}}</div>; }`);
fs.writeFileSync(path.join(masterDir, 'app', 'auth', 'page.tsx'), `export default function Auth() { return <div className="h-screen flex items-center justify-center text-5xl">PORTAL {{NAME}}</div>; }`);

fs.writeFileSync(path.join(masterDir, 'app', 'globals.css'), `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --col-primary: {{PRIMARY}};
  --col-second: {{SECONDARY}};
  --col-accent: {{ACCENT}};
}

body {
  background-color: var(--col-primary);
  color: var(--col-second);
  overflow-x: hidden;
}

/* Lenis Recommended */
html.lenis {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
`);

const ASSETS_MANIFESTTemplate = `# ASSETS MANIFEST: {{NAME}}

This project requires high-fidelity assets to complete the Awwwards-style experience. Drop your assets in the precise locations listed below.

## Directory Structure Required

\`\`\`text
/public
  /assets
    /audio
      - theme-ambient.mp3  (Global ambient track for layout.tsx)
    /sequences
        /hero
          - 0001.webp to 0150.webp (Hero animation)
        /product
          - 0001.webp to 0090.webp (Showcase animation)
    /svg
      - custom-logo.svg
\`\`\`

## Defensive States
The codebase includes WebGL / generative fallbacks:
- {{FALLBACK_VISUAL}}
- Audio falls back to silent state if missing.
`;

console.log('Master Template prepared. Starting distribution loop...');

websites.forEach(site => {
    const targetDir = path.join(__dirname, site.folder);
    if (!fs.existsSync(targetDir)) {
        console.log(`Cloning to ${site.folder}...`);
        fs.cpSync('master-template', targetDir, { recursive: true });
    }

    console.log(`Injecting ${site.name} styles...`);
    
    replaceInFile(path.join(targetDir, 'app', 'globals.css'), {
        '{{PRIMARY}}': site.primaryColor,
        '{{SECONDARY}}': site.secondaryColor,
        '{{ACCENT}}': site.accentColor
    });

    replaceInFile(path.join(targetDir, 'app', 'layout.tsx'), {
        '{{NAME}}': site.name,
        '{{INDUSTRY}}': site.industry,
        '{{HERO_DESC}}': site.heroDescription,
        '{{FONT}}': site.fontFamily
    });

    replaceInFile(path.join(targetDir, 'app', 'ClientLayout.tsx'), {
        '{{NAME}}': site.name
    });

    replaceInFile(path.join(targetDir, 'app', 'page.tsx'), {
        '{{NAME}}': site.name,
        '{{HERO_DESC}}': site.heroDescription,
        '{{FALLBACK_VISUAL}}': site.fallbackVisual
    });

    ['about', 'explore', 'auth'].forEach(page => {
        replaceInFile(path.join(targetDir, 'app', page, 'page.tsx'), {
            '{{NAME}}': site.name
        });
    });

    replaceInFile(path.join(targetDir, 'package.json'), {
        'master-template': site.folder
    });

    const manifestContent = ASSETS_MANIFESTTemplate
        .replace(/{{NAME}}/g, site.name)
        .replace(/{{FALLBACK_VISUAL}}/g, site.fallbackVisual);
    
    fs.writeFileSync(path.join(targetDir, 'ASSETS_MANIFEST.md'), manifestContent);

    console.log(`✅ ${site.name} (${site.folder}) is ready.\n`);
});

console.log('All 6 sites generated successfully via Factory pipeline.');
