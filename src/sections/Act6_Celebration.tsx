import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageData } from '../hooks/useDynamicImages';

interface Props {
  images: ImageData[];
}

export default function Act6_Celebration({ images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      }
    });

    // Reveal Happy Birthday text
    tl.to('.hbd-text', {
      opacity: 1,
      y: 0,
      stagger: 0.3,
      duration: 1,
      ease: 'power2.out'
    });

    // Reveal paragraph lines
    tl.to('.paragraph-line', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out'
    }, '+=0.5');

    // Fade out text to reveal montage
    tl.to('.hbd-container', {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      ease: 'power2.inOut'
    }, '+=1');

    // Reveal montage
    tl.to('.montage-container', {
      opacity: 1,
      duration: 1,
    });

  }, { scope: containerRef });

  const handleRelive = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="w-full h-[100svh] bg-[#0A0A0A] relative z-50 flex items-center justify-center overflow-hidden">
      
      {/* Architectural Cake Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-luminosity">
        <img 
          src="/architectural_cake.png" 
          alt="Architectural Cake" 
          className="w-full h-full object-cover grayscale-[30%]"
        />
        {/* Dark vignette overlay so text is readable */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_80%)]" />
        <div className="absolute inset-0 bg-[#0A0A0A]/40" />
      </div>

      {/* Central Light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[80vw] h-[80vw] bg-[#F5F5F5] opacity-5 blur-[150px] rounded-full" />
      </div>

      {/* Text Container */}
      <div className="hbd-container z-20 flex flex-col items-center text-center px-4">
        <h1 className="font-serif text-5xl md:text-8xl text-[#F5F5F5] font-light leading-tight mb-12">
          <span className="hbd-text block opacity-0 translate-y-10">HAPPY</span>
          <span className="hbd-text block opacity-0 translate-y-10 text-[#C8A96B]">BIRTHDAY</span>
          <span className="hbd-text block opacity-0 translate-y-10">VAISHNAVI</span>
        </h1>

        <div className="font-serif text-xl md:text-3xl text-[#F5F5F5]/80 italic space-y-4">
          <p className="paragraph-line opacity-0 translate-y-5">To the architect</p>
          <p className="paragraph-line opacity-0 translate-y-5">who builds dreams,</p>
          <p className="paragraph-line opacity-0 translate-y-5">creates memories,</p>
          <p className="paragraph-line opacity-0 translate-y-5">inspires everyone around her,</p>
          <p className="paragraph-line opacity-0 translate-y-5">and continues designing</p>
          <p className="paragraph-line opacity-0 translate-y-5 text-[#C8A96B]">a beautiful future.</p>
        </div>
      </div>

      {/* Cinematic Montage (Revealed at the end) */}
      <div className="montage-container absolute inset-0 z-30 opacity-0 pointer-events-none flex flex-col items-center justify-center bg-[#0A0A0A]">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          {images.map((img, i) => (
            <img 
              key={i}
              src={img.src}
              alt={`Montage ${i}`}
              className="absolute max-w-[80vw] max-h-[70vh] object-contain opacity-0"
              style={{
                animation: `fade-montage 1.5s ease-in-out forwards ${i * 1.5}s`,
              }}
            />
          ))}
        </div>
        
        <button 
          onClick={handleRelive}
          className="absolute bottom-12 px-6 py-3 border border-[#C8A96B] text-[#C8A96B] font-mono text-xs tracking-widest uppercase hover:bg-[#C8A96B] hover:text-[#0A0A0A] transition-colors pointer-events-auto"
          style={{ animation: `fade-in 1s ease-in forwards ${(images.length * 1.5) + 1}s`, opacity: 0 }}
        >
          Experience The Journey Again
        </button>
      </div>

      <style>{`
        @keyframes fade-montage {
          0% { opacity: 0; transform: scale(0.95); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
      `}</style>

    </section>
  );
}
