const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
// SITE CONFIGURATIONS — Each has a unique story
// ─────────────────────────────────────────────
const sites = [
  {
    folder: '13_altitudes',
    name: 'ALTITUDES',
    tagline: 'Above the world. Beyond expectation.',
    story: [
      { heading: 'Departure', body: 'Every journey begins in stillness. A breath before the engine roars. You step beyond the terminal — into a different gravity.' },
      { heading: 'Ascent', body: 'Forty-three thousand feet. The city dissolves into geometry. From here, borders are invisible. Only clarity remains.' },
      { heading: 'Arrival', body: 'We do not just fly you to destinations. We make the journey the destination. Welcome aboard.' },
    ],
    colors: { bg: '#05090F', text: '#F0EDE8', accent: '#C9A84C', muted: '#8B7D6B' },
    fontHeader: 'Playfair Display',
    fontBody: 'Inter',
    shaderColor1: '0.78, 0.66, 0.30',
    shaderColor2: '0.31, 0.44, 0.65',
    glowColor: 'rgba(201, 168, 76, 0.15)',
    industry: 'Private Aviation',
  },
  {
    folder: '14_oceana_bespoke',
    name: 'OCEANA',
    tagline: 'The ocean is not conquered. It is understood.',
    story: [
      { heading: 'The Horizon', body: 'They say the ocean covers most of the world. We say it is the world. The rest is just waiting.' },
      { heading: 'The Deep', body: 'Below the surface, time moves differently. The hull parts the water — silently, effortlessly, inevitably.' },
      { heading: 'The Vessel', body: 'A yacht is not a purchase. It is a philosophy made manifest in teak and carbon fibre and open sea.' },
    ],
    colors: { bg: '#03080F', text: '#E8F4F8', accent: '#1B8CA6', muted: '#4A7A8A' },
    fontHeader: 'Cormorant Garamond',
    fontBody: 'Inter',
    shaderColor1: '0.10, 0.55, 0.65',
    shaderColor2: '0.03, 0.18, 0.30',
    glowColor: 'rgba(27, 140, 166, 0.15)',
    industry: 'Luxury Yachts',
  },
  {
    folder: '15_volt_rider',
    name: 'VOLT',
    tagline: 'Urban velocity. Zero compromise.',
    story: [
      { heading: 'The City Grid', body: 'The city was never made for cars. It was made for motion — for the narrow streets, the sudden turns, the human scale.' },
      { heading: 'The Current', body: 'Forty volts of intent. No gear changes. No hesitation. Just the electric surge of forward momentum.' },
      { heading: 'The Rider', body: 'You are the machine. The machine is an extension of intent. Together, there are no more barriers.' },
    ],
    colors: { bg: '#0A0A0A', text: '#F5F5F0', accent: '#E8D422', muted: '#6B6B6B' },
    fontHeader: 'Outfit',
    fontBody: 'Inter',
    shaderColor1: '0.91, 0.83, 0.13',
    shaderColor2: '0.20, 0.20, 0.20',
    glowColor: 'rgba(232, 212, 34, 0.12)',
    industry: 'Electric Bicycles',
  },
  {
    folder: '16_abyss_explorations',
    name: 'ABYSS',
    tagline: 'Descend further than anyone has dared.',
    story: [
      { heading: 'The Surface', body: 'Light fades at ten meters. Memory fades with it. All that remains is pressure, and silence, and the unknown weight of what lies deeper.' },
      { heading: 'The Dark Zone', body: 'At four hundred meters, the ocean holds no colour. Only bioluminescence flickers — a language older than language.' },
      { heading: 'The Frontier', body: 'The last unexplored wilderness is not on any map. It is beneath every ocean. We go there so humanity can understand it.' },
    ],
    colors: { bg: '#010609', text: '#C8E8F5', accent: '#00D4C8', muted: '#2A5A6A' },
    fontHeader: 'Raleway',
    fontBody: 'Inter',
    shaderColor1: '0.00, 0.83, 0.78',
    shaderColor2: '0.01, 0.15, 0.25',
    glowColor: 'rgba(0, 212, 200, 0.10)',
    industry: 'Deep Sea Exploration',
  },
  {
    folder: '17_pulse_grid',
    name: 'PULSE',
    tagline: 'Where energy flows, civilization grows.',
    story: [
      { heading: 'The Grid', body: 'Every city breathes on electricity. The grid is the nervous system — invisible, vast, always on.' },
      { heading: 'The Node', body: 'We are the connective tissue between energy and motion. Between the power that exists and the future that demands it.' },
      { heading: 'The Future', body: 'Petroleum built the twentieth century. Pulse is building the twenty-first — one charge at a time.' },
    ],
    colors: { bg: '#010A04', text: '#E8F5EC', accent: '#39E85A', muted: '#2A5A3A' },
    fontHeader: 'Raleway',
    fontBody: 'Inter',
    shaderColor1: '0.22, 0.91, 0.35',
    shaderColor2: '0.01, 0.25, 0.08',
    glowColor: 'rgba(57, 232, 90, 0.10)',
    industry: 'EV Charging Infrastructure',
  },
];

// ─────────────────────────────────
// TEMPLATE GENERATORS
// ─────────────────────────────────

function buildGlobals(site) {
  return `@import url('https://fonts.googleapis.com/css2?family=${site.fontHeader.replace(/ /g,'+')}:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=${site.fontBody}:wght@300;400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --col-bg: ${site.colors.bg};
  --col-text: ${site.colors.text};
  --col-accent: ${site.colors.accent};
  --col-muted: ${site.colors.muted};
  --col-glow: ${site.glowColor};
  --font-header: '${site.fontHeader}', serif;
  --font-body: '${site.fontBody}', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
html::-webkit-scrollbar { display: none; }

html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }

body {
  background-color: var(--col-bg);
  color: var(--col-text);
  font-family: var(--font-body);
  overflow-x: hidden;
  cursor: none;
}

::selection {
  background: var(--col-accent);
  color: var(--col-bg);
}

.font-header { font-family: var(--font-header); }
`;
}

function buildLayout(site) {
  return `import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "${site.name} | ${site.industry}",
  description: "${site.tagline}",
  keywords: ["${site.industry}", "${site.name}", "award-winning", "immersive"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
`;
}

function buildCursor() {
  return `"use client";
import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.closest("a") || t.closest("button") || t.dataset.cursor === "hover"));
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
    >
      <motion.div
        animate={{
          width: clicked ? 12 : hovered ? 48 : 20,
          height: clicked ? 12 : hovered ? 48 : 20,
          backgroundColor: hovered ? "var(--col-accent)" : "transparent",
          borderColor: "var(--col-accent)",
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="rounded-full border border-[var(--col-accent)] mix-blend-difference"
      />
    </motion.div>
  );
}
`;
}

function buildPreloader(site) {
  return `"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps { onComplete: () => void; }

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({ onComplete });

    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(counter.val).toString().padStart(3, "0");
      },
    })
    .to(barRef.current, { scaleX: 1, ease: "power3.inOut", duration: 1.8 }, "<")
    .fromTo(nameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3)
    .to(nameRef.current, { y: -50, opacity: 0, duration: 0.6, ease: "power3.in" })
    .to(overlayRef.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut" });
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9998] bg-[var(--col-bg)] flex flex-col items-center justify-center overflow-hidden">
      <h1 ref={nameRef} className="font-header text-[10vw] font-bold text-[var(--col-text)] tracking-[0.3em] uppercase opacity-0">
        ${site.name}
      </h1>
      <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between">
        <div className="h-[1px] flex-1 mr-8 bg-[var(--col-muted)]/30 relative">
          <div ref={barRef} className="absolute inset-0 bg-[var(--col-accent)] origin-left scale-x-0" />
        </div>
        <span ref={counterRef} className="text-[var(--col-accent)] font-mono text-sm tracking-widest">000</span>
      </div>
    </div>
  );
}
`;
}

function buildScene(site) {
  return `"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = \`
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uDistortion;

  // Simplex-style noise helper
  vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
  vec4 mod289(vec4 x){ return x - floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159-.85373472095314*r; }
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;
    vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vUv=uv;
    vNormal=normal;
    vec3 pos=position;
    float noise=snoise(vec3(pos.x*1.5+uTime*0.3, pos.y*1.5+uTime*0.25, pos.z*1.5+uTime*0.2));
    pos+=normal*noise*uDistortion;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
  }
\`;

const fragmentShader = \`
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  void main(){
    float t=sin(uTime*0.5)*0.5+0.5;
    vec3 col=mix(uColor2, uColor1, vUv.y);
    float fresnel=pow(1.-dot(vNormal,vec3(0.,0.,1.)),2.0);
    col=mix(col,uColor1,fresnel*0.8);
    float glow=0.05/(length(vUv-0.5)+0.05);
    col+=uColor1*glow*0.1*t;
    gl_FragColor=vec4(col,0.9);
  }
\`;

function MorphingMesh({ color1, color2 }: { color1: THREE.Vector3; color2: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDistortion: { value: 0.35 },
    uColor1: { value: color1 },
    uColor2: { value: color2 },
  }), [color1, color2]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta * 0.8;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x += delta * 0.06;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Scene({ color1Str, color2Str }: { color1Str: string; color2Str: string }) {
  const [r1, g1, b1] = color1Str.split(",").map(Number);
  const [r2, g2, b2] = color2Str.split(",").map(Number);
  const c1 = useMemo(() => new THREE.Vector3(r1, g1, b1), [r1, g1, b1]);
  const c2 = useMemo(() => new THREE.Vector3(r2, g2, b2), [r2, g2, b2]);

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <MorphingMesh color1={c1} color2={c2} />
    </Canvas>
  );
}
`;
}

function buildClientLayout(site) {
  return `"use client";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

const navLinks = [
  { label: "World", href: "/" },
  { label: "Story", href: "/about" },
  { label: "Craft", href: "/explore" },
  { label: "Access", href: "/auth" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Cursor />

          {/* ─── Navigation ─── */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={\`fixed top-0 w-full z-50 transition-all duration-700 \${scrolled ? "bg-[var(--col-bg)]/80 backdrop-blur-xl border-b border-[var(--col-accent)]/10" : ""}\`}
          >
            <div className="flex items-center justify-between px-8 md:px-16 py-6">
              <a href="/" className="font-header text-xl font-bold tracking-[0.3em] uppercase text-[var(--col-text)] cursor-none" style={{ fontFamily: "var(--font-header)" }}>
                ${site.name}
              </a>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-10">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href}
                    className="text-sm uppercase tracking-widest text-[var(--col-muted)] hover:text-[var(--col-accent)] transition-colors duration-300 cursor-none">
                    {l.label}
                  </a>
                ))}
              </nav>

              {/* Mobile menu toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[var(--col-text)] cursor-none">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </motion.header>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-40 bg-[var(--col-bg)] flex flex-col items-center justify-center gap-10"
              >
                {navLinks.map((l, i) => (
                  <motion.a key={l.href} href={l.href}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setMenuOpen(false)}
                    className="font-header text-5xl font-light text-[var(--col-text)] tracking-widest uppercase cursor-none" style={{ fontFamily: "var(--font-header)" }}>
                    {l.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audio */}
          <button onClick={() => setMuted(!muted)}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full border border-[var(--col-accent)]/40 flex items-center justify-center text-[var(--col-accent)] backdrop-blur-lg bg-[var(--col-bg)]/30 hover:bg-[var(--col-accent)] hover:text-[var(--col-bg)] transition-all duration-500 cursor-none">
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <audio src="/assets/audio/theme-ambient.mp3" loop autoPlay={!muted} muted={muted} />

          {/* Page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </>
  );
}
`;
}

function buildHomePage(site) {
  const storyBlocks = site.story.map((s, i) => `
          {/* ─── Chapter ${i + 1}: ${s.heading} ─── */}
          <section className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 relative overflow-hidden chapter" data-index="${i}">
            <div className="max-w-4xl">
              <p className="chapter-num text-xs uppercase tracking-[0.5em] text-[var(--col-accent)] mb-6 font-mono opacity-0 translate-y-8">
                ${String(i + 1).padStart(2, '0')} / ${String(site.story.length).padStart(2, '0')} — ${s.heading.toUpperCase()}
              </p>
              <h2 className="chapter-title font-header text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight text-[var(--col-text)] mb-10 opacity-0 translate-y-12" style={{ fontFamily: 'var(--font-header)' }}>
                ${s.heading}
              </h2>
              <p className="chapter-body text-lg md:text-xl font-light leading-relaxed text-[var(--col-muted)] max-w-xl opacity-0 translate-y-8">
                ${s.body}
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 h-full overflow-hidden opacity-30 pointer-events-none chapter-bar">
              <div className="w-full h-full bg-gradient-to-l from-[var(--col-accent)] to-transparent opacity-5 scale-x-0 origin-right" />
            </div>
          </section>`).join('\n');

  return `"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance
      gsap.fromTo(heroTitleRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.2, ease: "expo.out", delay: 0.3 }
      );
      gsap.fromTo(heroSubRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, ease: "expo.out", delay: 0.7 }
      );
      gsap.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 2.5 }
      );

      // ── Hero parallax + zoom on scroll
      gsap.to(heroTitleRef.current, {
        y: -200,
        opacity: 0,
        scale: 1.1,
        filter: "blur(30px)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── Scrolling chapter reveals
      gsap.utils.toArray<HTMLElement>(".chapter").forEach((section) => {
        const num = section.querySelector(".chapter-num");
        const title = section.querySelector(".chapter-title");
        const body = section.querySelector(".chapter-body");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 20%",
            scrub: false,
          },
        });

        tl.to(num, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .to(title, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=0.4")
          .to(body, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6");
      });

      // ── Divider lines animate in
      gsap.utils.toArray<HTMLElement>(".chapter-bar > div > div").forEach((bar) => {
        gsap.to(bar, {
          scaleX: 1,
          scrollTrigger: {
            trigger: bar.closest(".chapter"),
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[var(--col-bg)]">
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center overflow-hidden px-8 md:px-24">
        {/* Fullscreen WebGL */}
        <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen">
          <Scene color1Str="${site.shaderColor1}" color2Str="${site.shaderColor2}" />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,var(--col-glow),transparent)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--col-accent)] mb-8 font-mono">${site.industry}</p>
          <h1 ref={heroTitleRef} className="font-header text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tight text-[var(--col-text)] uppercase opacity-0" style={{ fontFamily: "var(--font-header)" }}>
            ${site.name}
          </h1>
          <p ref={heroSubRef} className="mt-8 text-base md:text-xl font-light text-[var(--col-muted)] max-w-md leading-relaxed opacity-0">
            ${site.tagline}
          </p>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--col-muted)]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--col-accent)] to-transparent animate-pulse" />
        </div>

        {/* Horizontal rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--col-accent)]/30 to-transparent" />
      </section>

      {/* ─── Story Chapters ─── */}
      ${storyBlocks}

      {/* ─── Final CTA ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,var(--col-glow),transparent)] pointer-events-none" />
        <p className="text-xs uppercase tracking-[0.6em] text-[var(--col-accent)] mb-8 font-mono">Begin</p>
        <h2 className="font-header text-5xl md:text-7xl lg:text-9xl font-light text-[var(--col-text)] mb-12 uppercase leading-none" style={{ fontFamily: "var(--font-header)" }}>
          Your Story
        </h2>
        <a href="/explore"
          data-cursor="hover"
          className="group relative overflow-hidden border border-[var(--col-accent)] text-[var(--col-accent)] px-12 py-5 text-sm uppercase tracking-widest hover:text-[var(--col-bg)] transition-colors duration-700 cursor-none">
          <span className="relative z-10">Enter the Experience</span>
          <div className="absolute inset-0 bg-[var(--col-accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
        </a>
      </section>
    </div>
  );
}
`;
}

function buildAboutPage(site) {
  return `"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timeline = [
  { year: "Origin", text: "Every craft begins with obsession — an irresistible pull toward something that does not yet exist." },
  { year: "Vision", text: "We mapped the edges of what was possible and chose to build beyond them. Craftsmanship became doctrine." },
  { year: "Mastery", text: "Detail is not the goal. It is the baseline. From here, everything we build exceeds what came before." },
  { year: "Legacy", text: "The works we create outlast their makers. That is the only standard that matters at ${site.name}." },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const lineH = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="bg-[var(--col-bg)] min-h-screen pt-40 pb-40">
      {/* Intro */}
      <div className="px-8 md:px-24 max-w-5xl mb-40">
        <motion.p
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.5em] text-[var(--col-accent)] mb-6 font-mono"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-header text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] text-[var(--col-text)] mb-10"
          style={{ fontFamily: "var(--font-header)" }}
        >
          We did not inherit greatness. <br />
          <em className="text-[var(--col-accent)]">We built it.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl font-light text-[var(--col-muted)] max-w-2xl leading-relaxed"
        >
          ${site.tagline} We exist at the intersection of precision engineering and pure creative will.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="px-8 md:px-24 flex gap-8 md:gap-16 relative">
        {/* Vertical progress line */}
        <div className="hidden md:block relative w-px bg-[var(--col-accent)]/10 flex-shrink-0">
          <motion.div style={{ height: lineH }} className="absolute top-0 left-0 w-full bg-[var(--col-accent)]" />
        </div>
        <div className="flex flex-col gap-32 flex-1">
          {timeline.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
              className="flex flex-col md:flex-row gap-8 md:gap-20 items-start"
            >
              <div className="flex-shrink-0 w-28">
                <span className="text-xs uppercase tracking-[0.4em] text-[var(--col-accent)] font-mono">{item.year}</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-light text-[var(--col-text)] leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Giant watermark */}
      <div className="overflow-hidden mt-40 pointer-events-none select-none text-center">
        <span className="text-[22vw] font-bold font-header text-[var(--col-accent)]/[0.03] uppercase tracking-tighter leading-none" style={{ fontFamily: "var(--font-header)" }}>
          ${site.name}
        </span>
      </div>
    </div>
  );
}
`;
}

function buildExplorePage(site) {
  return `"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  { num: "01", title: "Precision", sub: "Nothing is left to chance. Every molecule, every material, every movement is deliberate.", tag: "Engineering" },
  { num: "02", title: "Silence", sub: "True power does not announce itself. It is felt before it is heard.", tag: "Experience" },
  { num: "03", title: "Permanence", sub: "Build for the ages. Craft objects worthy of obsession, that resist the inevitable irrelevance of trends.", tag: "Philosophy" },
  { num: "04", title: "Velocity", sub: "The distance between where you are and where you want to be is a function of will, not time.", tag: "Ambition" },
];

export default function Explore() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--col-bg)] pt-40 pb-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--col-accent)] mb-4 font-mono">Principles</p>
          <h1 className="font-header text-5xl md:text-8xl font-light leading-[0.9] text-[var(--col-text)] uppercase" style={{ fontFamily: "var(--font-header)" }}>
            The Craft
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--col-accent)]/10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              whileHover={{ backgroundColor: "rgba(var(--col-accent-rgb, 201,168,76), 0.04)" }}
              className="group relative p-12 flex flex-col justify-between min-h-[360px] cursor-none border border-[var(--col-accent)]/10 bg-[var(--col-bg)] transition-colors duration-700"
            >
              <div className="flex justify-between items-start mb-16">
                <span className="text-xs font-mono tracking-widest text-[var(--col-muted)]">{item.num}</span>
                <span className="text-xs uppercase tracking-widest text-[var(--col-accent)] group-hover:text-[var(--col-text)] transition-colors">{item.tag}</span>
              </div>
              <div>
                <h3 className="font-header text-4xl md:text-5xl font-light text-[var(--col-text)] mb-6 tracking-tight" style={{ fontFamily: "var(--font-header)" }}>
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-light text-[var(--col-muted)] leading-relaxed max-w-xs">{item.sub}</p>
              </div>
              <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-[var(--col-accent)]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-[var(--col-accent)]">
                <ArrowUpRight size={16} className="text-[var(--col-accent)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
}

function buildAuthPage(site) {
  return `"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Auth() {
  const [step, setStep] = useState<"form" | "success">("form");

  return (
    <div className="min-h-screen bg-[var(--col-bg)] flex items-stretch relative overflow-hidden">
      {/* Left: atmosphere */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-16 border-r border-[var(--col-accent)]/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,var(--col-glow),transparent)] pointer-events-none" />
        <span className="font-header text-2xl font-bold tracking-[0.3em] uppercase text-[var(--col-text)] z-10" style={{ fontFamily: "var(--font-header)" }}>
          ${site.name}
        </span>
        <div className="z-10">
          <h2 className="font-header text-5xl md:text-6xl font-light text-[var(--col-text)] leading-tight mb-6" style={{ fontFamily: "var(--font-header)" }}>
            ${site.story[0].heading}
          </h2>
          <p className="text-base text-[var(--col-muted)] font-light leading-relaxed max-w-sm">
            ${site.story[0].body}
          </p>
        </div>
        <p className="text-xs text-[var(--col-muted)]/40 tracking-widest uppercase z-10">${site.industry}</p>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        {step === "form" ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-full max-w-md"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-[var(--col-accent)] mb-8 font-mono">Private Access</p>
            <h1 className="font-header text-4xl font-light text-[var(--col-text)] mb-12 leading-tight" style={{ fontFamily: "var(--font-header)" }}>
              Request Admission
            </h1>
            <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); setStep("success"); }}>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.4em] text-[var(--col-muted)] mb-3 font-mono">Full Name</label>
                <input type="text" required placeholder="Your name"
                  className="w-full bg-transparent border-b border-[var(--col-accent)]/20 pb-3 text-[var(--col-text)] text-lg font-light focus:outline-none focus:border-[var(--col-accent)] placeholder:text-[var(--col-muted)]/30 transition-colors duration-500 cursor-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.4em] text-[var(--col-muted)] mb-3 font-mono">Email Address</label>
                <input type="email" required placeholder="you@domain.com"
                  className="w-full bg-transparent border-b border-[var(--col-accent)]/20 pb-3 text-[var(--col-text)] text-lg font-light focus:outline-none focus:border-[var(--col-accent)] placeholder:text-[var(--col-muted)]/30 transition-colors duration-500 cursor-none" />
              </div>
              <button type="submit"
                data-cursor="hover"
                className="group/btn relative overflow-hidden flex items-center justify-between border border-[var(--col-accent)] px-8 py-5 text-sm uppercase tracking-widest text-[var(--col-accent)] hover:text-[var(--col-bg)] transition-colors duration-700 cursor-none mt-4">
                <span className="relative z-10">Enter</span>
                <ArrowRight size={18} className="relative z-10" />
                <div className="absolute inset-0 bg-[var(--col-accent)] origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-sm"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--col-accent)] flex items-center justify-center mx-auto mb-8">
              <div className="w-2 h-2 rounded-full bg-[var(--col-accent)]" />
            </div>
            <h2 className="font-header text-3xl font-light text-[var(--col-text)] mb-4" style={{ fontFamily: "var(--font-header)" }}>
              Request Received
            </h2>
            <p className="text-[var(--col-muted)] text-sm leading-relaxed">
              We will be in contact through the channels befitting this experience.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
`;
}

// ─────────────────────────────────────────────
// EXECUTION
// ─────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════');
console.log('  AWWWARDS PRO-MAX SCROLLYTELLING ENGINE v3.0 ');
console.log('═══════════════════════════════════════════════\n');

sites.forEach((site) => {
  const siteDir = path.join(__dirname, site.folder);
  if (!fs.existsSync(siteDir)) {
    console.log(`⚠  Skipping ${site.folder} — directory not found.`);
    return;
  }

  console.log(`▶  Building ${site.name} (${site.industry})...`);

  const componentsDir = path.join(siteDir, 'components');
  if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

  // Write components
  fs.writeFileSync(path.join(componentsDir, 'Cursor.tsx'), buildCursor());
  fs.writeFileSync(path.join(componentsDir, 'Preloader.tsx'), buildPreloader(site));
  fs.writeFileSync(path.join(componentsDir, 'Scene.tsx'), buildScene(site));

  // Write app files
  fs.writeFileSync(path.join(siteDir, 'app', 'globals.css'), buildGlobals(site));
  fs.writeFileSync(path.join(siteDir, 'app', 'layout.tsx'), buildLayout(site));
  fs.writeFileSync(path.join(siteDir, 'app', 'ClientLayout.tsx'), buildClientLayout(site));
  fs.writeFileSync(path.join(siteDir, 'app', 'page.tsx'), buildHomePage(site));
  fs.writeFileSync(path.join(siteDir, 'app', 'about', 'page.tsx'), buildAboutPage(site));
  fs.writeFileSync(path.join(siteDir, 'app', 'explore', 'page.tsx'), buildExplorePage(site));
  fs.writeFileSync(path.join(siteDir, 'app', 'auth', 'page.tsx'), buildAuthPage(site));

  console.log(`✓  ${site.name} — ${Object.keys({globals:1,layout:1,ClientLayout:1,page:1,about:1,explore:1,auth:1,Cursor:1,Preloader:1,Scene:1}).length} files written.`);
});

console.log('\n✅ ALL SITES COMPLETE. Launch with: npm run dev\n');
