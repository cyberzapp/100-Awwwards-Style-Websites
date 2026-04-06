---
description: Generates an elite, multi-page, Awwwards-style Next.js site from an Industry ID.
---

# WORKFLOW TRIGGERED: AWWWARDS FACTORY
Read the attached `100_industries.txt`. Locate the brief for the ID provided by the user. Execute this exact 6-phase pipeline for the specified industry:

1. ARCHITECTURE & FOLDER CREATION: 
Use the terminal to run `npx create-next-app@latest [ID]_[website_name] --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm`.

2. DEPENDENCY INJECTION: 
Navigate into the folder and run `npm install gsap @studio-freight/lenis framer-motion three @react-three/fiber @react-three/drei lucide-react clsx tailwind-merge`.

3. ASSET MANIFEST & DEFENSIVE CODING: 
Create an `ASSETS_MANIFEST.md` detailing where the human should drop specific SVGs, audio tracks, or image sequences. All code you write next MUST have visually stunning fallback states (like generative R3F meshes or gradients) so the app looks premium even before the human drops in the assets.

4. ELITE MULTI-PAGE DEVELOPMENT (TSX):
- globals.css: Inject Lenis CSS and hide native scrollbars.
- layout.tsx: Global Lenis wrapper, Framer Motion navigation, and persistent ambient audio controller.
- page.tsx (Home): 400vh+ depth. Hero must feature a generative React Three Fiber Canvas. Use GSAP ScrollTrigger to pin sections and scrub elements.
- about/page.tsx: Heavy typographic parallax.
- explore/page.tsx: 3D interactive tilt cards for the product/service showcase.

5. QA & VISUAL TESTING:
Autonomously run `npm run dev`. Open your browser tool to `http://localhost:3000`. Verify that there are no TS errors, the 3D canvas renders, and the GSAP scroll-jacking is active. Do not output your final message until you have fixed any compilation errors.

6. FINAL HANDOFF: 
Notify the user the site is ready and point them to the `ASSETS_MANIFEST.md`.