import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageData } from '../hooks/useDynamicImages';

interface Props {
  images: ImageData[];
}

export default function Act3_StructuralSupport({ images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || images.length === 0) return;

    // Corridor floating effect
    gsap.utils.toArray('.glass-frame').forEach((el: any, i) => {
      gsap.from(el, {
        opacity: 0,
        z: -500,
        y: 100,
        rotationX: 10,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        }
      });
    });

  }, { scope: containerRef, dependencies: [images] });

  if (images.length === 0) return null;

  return (
    <section ref={containerRef} className="w-full bg-[#0A0A0A] relative z-30 py-32 overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* Golden Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#C8A96B]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-12 flex flex-col items-center">
        
        <div className="text-center mb-32 z-10">
          <p className="font-mono text-[#C8A96B] tracking-[0.3em] uppercase text-xs mb-6">Act III: The Structural Support</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight text-[#F5F5F5]">
            Behind every great architect <br />
            is a family that believed first.
          </h2>
          <p className="mt-6 font-serif text-xl italic text-[#C8A96B]">
            The strongest structures are built with love.
          </p>
        </div>

        <div className="w-full flex flex-col gap-24 relative z-10">
          {images.map((img, i) => (
            <div key={i} className={`glass-frame relative w-[85vw] md:w-[60vw] p-2 bg-[#1A1A1A]/80 border border-white/10 shadow-[0_20px_50px_rgba(200,169,107,0.1)] rounded-sm ${i % 2 === 0 ? 'md:self-start' : 'md:self-end'}`}>
              
              <div className="w-full aspect-[4/3] overflow-hidden bg-black relative">
                <img src={img.src} alt={`Family ${i}`} className="w-full h-full object-cover object-top opacity-80" />
                
                {/* Thin architectural border instead of thick mullions */}
                <div className="absolute inset-0 pointer-events-none border border-[#0A0A0A]/50" />
              </div>

              <div className="mt-4 flex justify-between items-end">
                <p className="font-serif text-[#F5F5F5] italic text-lg md:text-xl max-w-[80%]">{img.caption}</p>
                <span className="font-mono text-[#C8A96B] text-[10px] tracking-widest uppercase">Support 0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
