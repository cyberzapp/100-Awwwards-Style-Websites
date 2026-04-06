const fs = require('fs');
const path = require('path');

const websites = [
  { folder: '13_altitudes', name: 'Altitudes', industry: 'Private Aviation' },
  { folder: '14_oceana_bespoke', name: 'Oceana Bespoke', industry: 'Luxury Yachts' },
  { folder: '15_volt_rider', name: 'Volt Rider', industry: 'Electric Bicycles' },
  { folder: '16_abyss_explorations', name: 'Abyss Explorations', industry: 'Submersibles & Deep Sea' },
  { folder: '17_pulse_grid', name: 'Pulse Grid', industry: 'EV Charging Infrastructure' },
  { folder: '18_velocity_rail', name: 'Velocity Rail', industry: 'Maglev Trains' }
];

const scenePage = `"use client";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Float } from '@react-three/drei';

function GenerativeMesh() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="var(--col-accent)" wireframe emissive="var(--col-accent)" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
    return (
       <Canvas camera={{ position: [0, 0, 10] }}>
           <ambientLight intensity={0.5} />
           <pointLight position={[10, 10, 10]} />
           <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
           <GenerativeMesh />
           <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
       </Canvas>
    );
}`;

const homePage = `"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const seqRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(textRef.current, {
                y: -150,
                opacity: 0,
                scale: 0.9,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true
                }
            });
            
            gsap.fromTo(seqRef.current, 
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: seqRef.current,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1
                    }
                }
            );

        }, [heroRef, seqRef]);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full relative min-h-[400vh]">
            <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[var(--col-primary)]">
                <div className="absolute inset-0 z-0 opacity-40">
                   <Scene />
                </div>
                
                <h1 ref={textRef} className="text-[12vw] font-bold z-10 text-center leading-[0.8] text-[var(--col-second)] mix-blend-difference tracking-tighter uppercase relative select-none cursor-default">
                    {{NAME}}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-lg md:text-2xl mt-6 font-normal tracking-[0.5em] text-[var(--col-accent)] whitespace-nowrap uppercase">{{INDUSTRY}}</span>
                </h1>
            </section>
            
            <section className="min-h-screen w-full bg-[var(--col-second)] text-[var(--col-primary)] flex items-center justify-center py-32 px-8 relative overflow-hidden">
                <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
                    <div ref={seqRef} className="text-4xl md:text-6xl font-light leading-tight">
                        Experience the ultimate <br/><span className="text-[var(--col-accent)] italic font-serif">transformation</span> in <br className="hidden md:block"/>{{INDUSTRY}}.
                    </div>
                    <div className="aspect-square bg-[var(--col-primary)]/10 border border-[var(--col-primary)]/20 rounded-full flex items-center justify-center backdrop-blur-md overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--col-primary)] to-[var(--col-accent)] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                        <p className="text-sm tracking-widest uppercase text-center w-full">Asset Sequence Here</p>
                    </div>
                </div>
            </section>
        </div>
    );
}`;

const aboutPage = `"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <div ref={containerRef} className="h-[200vh] w-full bg-[var(--col-second)] text-[var(--col-primary)] relative overflow-hidden pt-32">
        <motion.div style={{ y: y1, opacity }} className="sticky top-1/4 px-8 md:px-32 max-w-5xl z-10">
            <h2 className="text-5xl md:text-8xl font-black uppercase mb-8 mix-blend-difference">Our Philosophy</h2>
            <p className="text-xl md:text-3xl font-light leading-relaxed">
              We operate at the bleeding edge of {{INDUSTRY}}. Forging the gap between physics and imagination. Our process relies entirely on absolute precision, ensuring {{NAME}} sets the standard for tomorrow.
            </p>
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-10 md:right-32 text-[20vw] font-serif italic text-[var(--col-primary)] opacity-[0.03] pointer-events-none select-none tracking-tighter whitespace-nowrap">
            {{NAME}}
        </motion.div>
    </div>
  );
}`;

const explorePage = `"use client";
import { motion } from "framer-motion";

const items = [
  { id: 1, title: "Synthesis", type: "Core Module" },
  { id: 2, title: "Kinetic", type: "Dynamics" },
  { id: 3, title: "Aesthetics", type: "Design Language" },
  { id: 4, title: "Quantum", type: "Processing" },
];

export default function Explore() {
  return (
    <div className="min-h-screen w-full bg-[var(--col-primary)] pt-40 px-8 pb-32">
      <div className="max-w-7xl mx-auto z-10 relative">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-[var(--col-second)] uppercase tracking-tighter mix-blend-difference">Explore Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 0.98, backgroundColor: "var(--col-second)", color: "var(--col-primary)" }}
              className="aspect-video border border-[var(--col-second)]/30 p-8 flex flex-col justify-between cursor-pointer group transition-colors duration-500 rounded-lg relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--col-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="text-sm font-mono tracking-widest uppercase opacity-50 group-hover:opacity-100 mix-blend-difference">{item.type}</div>
                <h3 className="text-4xl md:text-5xl font-light italic mix-blend-difference">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const authPage = `"use client";
import { motion } from "framer-motion";

export default function Auth() {
  return (
    <div className="h-screen w-full bg-[#050505] relative flex items-center justify-center overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[var(--col-accent)] rounded-full blur-[120px] opacity-20 animate-pulse"></div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-16 rounded-3xl w-full max-w-xl text-white shadow-2xl relative"
        >
            <h2 className="text-4xl font-bold mb-2 uppercase tracking-widest text-shadow">Portal Access</h2>
            <p className="text-white/50 mb-10 text-sm tracking-wide">Enter your authorized credentials for {{NAME}}.</p>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-mono text-shadow">Authentication ID</label>
                    <input type="text" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-[var(--col-accent)] transition-colors text-xl font-light rounded-none text-white placeholder:text-white/20" placeholder="A-773" />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-mono text-shadow">Passcode</label>
                    <input type="password" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-[var(--col-accent)] transition-colors text-xl font-light rounded-none text-white placeholder:text-white/20" placeholder="••••••••" />
                </div>

                <button className="mt-8 bg-[var(--col-accent)] text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-xl shadow-[var(--col-accent)]/20 text-sm">
                    Initialize Link
                </button>
            </form>
        </motion.div>
    </div>
  );
}`;


console.log('--- EXECUTING COMPLETION ENGINE ---');

websites.forEach(site => {
    const siteDir = path.join(__dirname, site.folder);
    if (!fs.existsSync(siteDir)) return;

    console.log(`Overwriting placeholders for ${site.name}...`);

    const componentsDir = path.join(siteDir, 'components');
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    const injectHTML = (template) => {
        return template
            .replace(/{{NAME}}/g, site.name)
            .replace(/{{INDUSTRY}}/g, site.industry);
    };

    fs.writeFileSync(path.join(componentsDir, 'Scene.tsx'), scenePage);
    fs.writeFileSync(path.join(siteDir, 'app', 'page.tsx'), injectHTML(homePage));
    fs.writeFileSync(path.join(siteDir, 'app', 'about', 'page.tsx'), injectHTML(aboutPage));
    fs.writeFileSync(path.join(siteDir, 'app', 'explore', 'page.tsx'), injectHTML(explorePage));
    fs.writeFileSync(path.join(siteDir, 'app', 'auth', 'page.tsx'), injectHTML(authPage));
});

console.log('COMPLETION ENGINE SUCCESS. All sites have been upgraded.');
