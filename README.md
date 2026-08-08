# The Architectural Birthday Exhibition

An ultra-premium, Awwwards-level cinematic digital exhibition celebrating a lifetime of memories. Built with an immersive architectural aesthetic.

## 🏛️ Vision
This is not a traditional birthday website. It is an immersive architectural exhibition where the visitor walks through different chapters of a journey, with every scroll telling a story. 

Inspired by the structural mastery of Zaha Hadid and Tadao Ando, this digital experience uses minimalist concrete textures, blueprint overlays, and cinematic typography.

## 🛠️ Technology Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Mobile-First, Cinematic Aesthetics)
- **Animation**: GSAP (GreenSock) for cinematic scroll-jacking, parallax, and reveals
- **3D Rendering**: React Three Fiber / Drei / Three.js (Hardware Accelerated)
- **Smooth Scrolling**: Lenis

## 🚀 Features
- **Act I: The Blueprint (Hero)**: Hardware-accelerated 3D architectural wireframe that rotates on scroll, slowly transforming a pitch-black cinematic screen into a structural masterpiece.
- **Act II: Foundation (Childhood)**: Cross-fading blueprint-to-color architectural reveals triggered on scroll.
- **Act III: Structural Support (Family)**: Floating glass panels with depth-of-field perspective scrolling.
- **Act IV: The Present (Today)**: Infinite pinned horizontal scrolling gallery wall with staggered natural aspect ratios and zero filler.
- **Act V: The Memory Constellation**: A 3D interactive floating wireframe constellation representing interconnected memories.
- **Act VI: Celebration (Finale)**: An elegant cinematic typographic reveal with an architectural cake background.

## 📱 Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (exposed to your local network for mobile testing):
   ```bash
   npm run dev
   ```

## 🖼️ Dynamic Image Loading
Images are dynamically loaded using Vite's `import.meta.glob()`. Simply drop your photos into the respective folders inside `src/assets/images/` (`childhood/`, `family/`, `current/`) and the exhibition will automatically calculate the architecture, spacing, and layouts to accommodate them perfectly.
