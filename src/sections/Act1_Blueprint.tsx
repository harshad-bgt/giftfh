import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ArchitecturalGeometry from '../components/ArchitecturalGeometry';
import BlueprintBackground from '../components/BlueprintBackground';

export default function Act1_Blueprint() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // --- ENTRY SEQUENCE ---
    const entryTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Initial State
    gsap.set('.grid-bg', { opacity: 0 });
    gsap.set('.annotation', { opacity: 0, y: 10 });
    gsap.set('.project-tag', { opacity: 0, x: -20 });
    gsap.set('.title-stroke', { opacity: 0 });
    gsap.set('.title-fill', { opacity: 0 });
    gsap.set('.hero-3d', { opacity: 0, scale: 0.8 });
    gsap.set('.story-line', { opacity: 0, y: 10 });

    // Sequence
    entryTl
      // 1. Blueprint grid slowly appears
      .to('.grid-bg', { opacity: 0.2, duration: 2, ease: 'power1.inOut' }, 0.5)
      // 2. Annotations fade in
      .to('.annotation', { opacity: 0.6, y: 0, duration: 1, stagger: 0.1 }, 1.5)
      // 3. PROJECT 001 appears
      .to('.project-tag', { opacity: 1, x: 0, duration: 1 }, 2)
      // 4. Letters drawn using blueprint strokes
      .to('.title-stroke', { opacity: 1, duration: 1.5, ease: 'power3.inOut' }, 2.5)
      // 5. Letters fill with solid color & metallic sweep
      .to('.title-fill', { opacity: 1, duration: 2, ease: 'power2.inOut' }, 3.5)
      // 6. Sculpture emerges
      .to('.hero-3d', { opacity: 1, scale: 1, duration: 2.5, ease: 'power3.out' }, 4)
      // 7. Story text reveals individually
      .to('.story-line', { opacity: 1, y: 0, duration: 1, stagger: 0.4 }, 5);

    // --- SCROLL SEQUENCE ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
      }
    });

    scrollTl
      // The camera pushes toward the structure, shifting text naturally
      .to('.hero-content', { x: '-10vw', opacity: 0, duration: 1 }, 0)
      .to('.hero-3d', { scale: 1.5, x: '-10vw', duration: 1 }, 0)
      .to('.grid-bg', { scale: 1.2, opacity: 0, duration: 1 }, 0)
      .to('.annotation', { opacity: 0, duration: 0.5 }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] overflow-hidden bg-[#0A0A0A] z-10 flex flex-col md:flex-row">
      
      <div className="grid-bg absolute inset-0 z-0">
        <BlueprintBackground />
      </div>
      <div className="noise-overlay" />
      <div className="absolute inset-0 z-10 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none" />

      {/* 3D Architectural Centerpiece */}
      <div className="hero-3d absolute inset-0 md:relative md:w-1/2 md:h-full z-20 flex items-center justify-center pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
          <ArchitecturalGeometry />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Typography & Story */}
      <div className="hero-content relative z-30 w-full h-full md:w-1/2 flex flex-col justify-end md:justify-center p-8 md:p-20 pb-24 md:pb-20 pointer-events-none">
        
        <p className="project-tag font-mono text-[#C8A96B] tracking-[0.4em] uppercase text-xs md:text-sm border-l border-[#C8A96B] pl-4 mb-4">
          Project 001
        </p>
        
        <div className="relative mb-8">
          {/* Blueprint Stroke Layer */}
          <h1 
            className="title-stroke text-massive font-bold tracking-tighter -ml-1 md:-ml-2 leading-[0.85] text-transparent"
            style={{ WebkitTextStroke: '2px #1D3557' }}
          >
            VAISHNAVI
          </h1>
          {/* Solid Fill Layer */}
          <h1 className="title-fill absolute top-0 left-0 text-massive font-bold tracking-tighter -ml-1 md:-ml-2 drop-shadow-2xl leading-[0.85] text-[#F5F5F5]">
            VAISHNAVI
          </h1>
        </div>
        
        <div className="font-serif text-lg md:text-2xl text-[#F5F5F5]/70 italic flex flex-col gap-2 border-l border-[#1D3557] pl-6 mt-4">
          <p className="story-line">Every masterpiece</p>
          <p className="story-line">begins with a vision.</p>
          <p className="story-line">Some become buildings.</p>
          <p className="story-line">Some become memories.</p>
          <p className="story-line mt-4">Today...</p>
          <p className="story-line">We celebrate</p>
          <p className="story-line">the story</p>
          <p className="story-line text-[#C8A96B]">behind both.</p>
        </div>
      </div>

      {/* Architectural Technical Annotations */}
      <div className="annotation absolute z-20 top-8 left-8 text-[9px] md:text-[10px] font-mono text-[#1D3557] tracking-[0.3em]">
        <p>DRAWING NO. A-001</p>
        <p className="mt-1">REVISION 22</p>
      </div>
      
      <div className="annotation absolute z-20 top-8 right-8 text-[9px] md:text-[10px] font-mono text-[#1D3557] tracking-[0.3em] text-right">
        <p>SCALE 1:100</p>
        <p className="mt-1">GRID X:12</p>
      </div>
      
      <div className="annotation absolute z-20 bottom-8 left-8 text-[9px] md:text-[10px] font-mono text-[#1D3557] tracking-[0.3em]">
        <p>LAT 34.0522° N</p>
        <p className="mt-1">LONG 118.2437° W</p>
      </div>

      <div className="annotation absolute z-20 top-1/2 right-4 md:right-8 -rotate-90 origin-right text-[9px] md:text-[10px] font-mono text-[#1D3557] tracking-[0.3em]">
        <span className="text-[#C8A96B] mr-4">STATUS</span>
        UNDER CONSTRUCTION
      </div>

    </section>
  );
}
