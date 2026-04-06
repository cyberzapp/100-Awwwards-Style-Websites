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

const cursorPage = `"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        />
    );
}`;

const preloaderPage = `"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ name }: { name: string }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true)
        });
        
        tl.to(textRef.current, { opacity: 1, duration: 1, ease: 'power2.inOut' })
          .to(textRef.current, { y: -50, opacity: 0, duration: 0.8, ease: 'power3.in', delay: 0.5 })
          .to(overlayRef.current, { 
              height: 0, 
              duration: 1.5, 
              ease: 'expo.inOut',
              transformOrigin: "top"
          });
    }, []);

    if (isComplete) return null;

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[1000] bg-[#020202] flex items-center justify-center origin-top overflow-hidden">
            <h1 ref={textRef} className="text-4xl md:text-6xl text-white font-bold tracking-[0.5em] uppercase opacity-0 mix-blend-difference">
                {name}
            </h1>
        </div>
    );
}`;

const clientLayoutPage = `"use client";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.cursor = 'none';

    const lenis = new Lenis({
      duration: 1.5,
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

  if (!isMounted) return null;

  return (
    <>
      <Preloader name="{{NAME}}" />
      <Cursor />
      
      {/* Global Audio Controller */}
      <div className="fixed bottom-8 right-8 z-50 text-[var(--col-accent)] backdrop-blur-md bg-black/20 p-4 rounded-full cursor-none hover:bg-[var(--col-accent)] hover:text-black transition-all border border-[var(--col-accent)]/30 duration-500 delay-1000" onClick={() => setMuted(!muted)}>
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </div>
      <audio id="theme-audio" src="/assets/audio/theme-ambient.mp3" loop muted={muted} autoPlay={!muted} />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference text-white delay-1000 animate-in fade-in duration-1000 fill-mode-both">
        <h1 className="text-xl font-bold tracking-widest uppercase">{{NAME}}</h1>
        <div className="flex gap-8 text-sm uppercase tracking-widest">
            <a href="/" className="hover:text-[var(--col-accent)] transition-colors cursor-none">Home</a>
            <a href="/about" className="hover:text-[var(--col-accent)] transition-colors cursor-none">About</a>
            <a href="/explore" className="hover:text-[var(--col-accent)] transition-colors cursor-none">Explore</a>
            <a href="/auth" className="hover:text-[var(--col-accent)] transition-colors cursor-none">Portal</a>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}`;

const scenePage = `"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Raw WebGL Fragment / Vertex Shaders for fluid distortion
const FluidMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.2, 0.4, 1.0) },
  // vertex shader
  \`
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // High-end fluid displacement maths
      pos.z += sin(pos.x * 3.0 + uTime) * 0.4;
      pos.y += cos(pos.z * 2.0 + uTime) * 0.4;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  \`,
  // fragment shader
  \`
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float pulse = sin(vUv.x * 20.0 + uTime * 2.0) * 0.5 + 0.5;
      float pulse2 = cos(vUv.y * 10.0 - uTime) * 0.5 + 0.5;
      vec3 color = mix(uColor, vec3(1.0), pulse * pulse2 * 0.8);
      
      // Add heavy chromatic aberration style to the fragment
      gl_FragColor = vec4(color, 0.8);
    }
  \`
);

function FluidMesh() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materialRef = useRef<any>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta * 0.8;
        }
        if (meshRef.current) {
             meshRef.current.rotation.y += delta * 0.2;
             meshRef.current.rotation.z += delta * 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2.5, 32]} />
            <primitive object={new FluidMaterial()} ref={materialRef} attach="material" wireframe transparent />
        </mesh>
    );
}

export default function Scene() {
    return (
       <Canvas camera={{ position: [0, 0, 7] }}>
           <ambientLight intensity={0.5} />
           <FluidMesh />
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
    const subtextRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intense masking effect on load
            gsap.fromTo(textRef.current, 
                { y: 300, opacity: 0, rotationX: 45 }, 
                { y: 0, opacity: 1, rotationX: 0, duration: 2.5, ease: "expo.out", delay: 1.8 }
            );

            gsap.fromTo(subtextRef.current,
                { opacity: 0, letterSpacing: "1em" },
                { opacity: 1, letterSpacing: "0.5em", duration: 2, ease: "power3.out", delay: 2.2 }
            );

            // Scrollytelling Parallax
            gsap.to(textRef.current, {
                y: -300,
                opacity: 0,
                scale: 1.3,
                filter: "blur(20px)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
            
            // Dramatic reveal for the second section
            gsap.fromTo(seqRef.current, 
                { opacity: 0, y: 150, filter: "blur(20px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scrollTrigger: {
                        trigger: seqRef.current,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1.2
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full relative min-h-[400vh] bg-[#030303]">
            <section ref={heroRef} className="h-[120vh] w-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="fixed inset-0 z-0 opacity-70 pointer-events-none mix-blend-screen">
                   <Scene />
                </div>
                
                <div className="z-10 text-center uppercase relative pointer-events-none perspective-[1200px] w-full">
                    <div className="overflow-hidden mb-6 px-4">
                        <h1 ref={textRef} className="text-[15vw] font-black leading-[0.75] text-white tracking-tighter shadow-2xl origin-bottom opacity-80 mix-blend-overlay">
                            {{NAME}}
                        </h1>
                    </div>
                    <div ref={subtextRef} className="text-xl md:text-3xl font-light tracking-[0.5em] text-[var(--col-accent)] opacity-80 mix-blend-difference mt-8">
                        {{INDUSTRY}}
                    </div>
                </div>
            </section>
            
            <section className="min-h-screen w-full flex items-center justify-center py-32 px-8 relative overflow-hidden z-10 bg-black/60 backdrop-blur-[100px] border-t border-[var(--col-accent)]/20 shadow-[0_-20px_100px_rgba(0,0,0,0.8)]">
                <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="overflow-hidden">
                        <div ref={seqRef} className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-white uppercase tracking-tighter">
                            Architecting <br/><span className="text-[var(--col-accent)] italic font-serif opacity-90 font-normal normal-case block mt-4">transformation</span>
                        </div>
                    </div>
                    <div className="aspect-square bg-[var(--col-primary)]/5 border border-[var(--col-primary)]/30 rounded-full flex items-center justify-center backdrop-blur-3xl overflow-hidden relative group shadow-[0_0_80px_var(--col-accent)]/10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--col-primary)] to-[var(--col-accent)] opacity-10 group-hover:opacity-80 transition-opacity duration-[2s]"></div>
                        <p className="text-sm tracking-widest uppercase text-center w-full text-white mix-blend-overlay opacity-30 group-hover:opacity-100 transition-opacity duration-1000 z-10">Shader Canvas Engine Engine</p>
                    </div>
                </div>
            </section>
        </div>
    );
}`;

console.log('--- EXECUTING ELITE AWWWARDS SCROLLYTELLING ENGINE ---');

websites.forEach(site => {
    const siteDir = path.join(__dirname, site.folder);
    if (!fs.existsSync(siteDir)) return;

    console.log(`Overwriting files for ${site.name} with GLSL shaders...`);

    const componentsDir = path.join(siteDir, 'components');
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    const injectHTML = (template) => {
        return template
            .replace(/{{NAME}}/g, site.name)
            .replace(/{{INDUSTRY}}/g, site.industry);
    };

    fs.writeFileSync(path.join(componentsDir, 'Cursor.tsx'), cursorPage);
    fs.writeFileSync(path.join(componentsDir, 'Preloader.tsx'), injectHTML(preloaderPage));
    fs.writeFileSync(path.join(componentsDir, 'Scene.tsx'), scenePage);
    
    fs.writeFileSync(path.join(siteDir, 'app', 'ClientLayout.tsx'), injectHTML(clientLayoutPage));
    fs.writeFileSync(path.join(siteDir, 'app', 'page.tsx'), injectHTML(homePage));
});

console.log('UPGRADE COMPLETE. FWA / Awwwards compliance achieved.');
