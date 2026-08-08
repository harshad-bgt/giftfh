import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageData } from '../hooks/useDynamicImages';

interface Props {
  cutouts: ImageData[];
}

export default function Act7_Epilogue({ cutouts }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Ethereal floating effect
    gsap.utils.toArray('.epilogue-portrait').forEach((el: any, i) => {
      // Parallax scroll entrance
      gsap.from(el, {
        opacity: 0,
        y: 150,
        scale: 0.9,
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        }
      });

      // Continuous subtle breathing floating
      gsap.to(el, {
        y: i % 2 === 0 ? -15 : 15,
        duration: 3 + (i % 3),
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    });

  }, { scope: containerRef });

  const handleRelive = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="w-full bg-[#0A0A0A] py-32 relative z-50 overflow-hidden">
      
      {/* Subtle moody lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8A96B] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1D3557] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-32 max-w-2xl">
          <p className="font-mono text-[#C8A96B] tracking-[0.4em] uppercase text-xs mb-6">Epilogue</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F5F5] font-light leading-snug">
            Because a single day isn't enough to hold an entire lifetime of memories.
          </h2>
        </div>

        {/* ELEGANT DARK PORTRAITS GRID */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-40 w-full">
          
          {cutouts.map((img, i) => (
            <div 
              key={`portrait-${i}`} 
              className={`epilogue-portrait relative w-[80vw] md:w-[400px] shadow-[0_0_50px_rgba(0,0,0,0.8)] ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              <div className="w-full h-auto overflow-hidden border border-white/5 bg-[#111111] p-2 md:p-3 pb-8 md:pb-12">
                <img 
                  src={img.src} 
                  alt={`Epilogue ${i}`} 
                  className="w-full h-auto object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          ))}

        </div>

        <div className="flex justify-center pb-24">
          <button 
            onClick={handleRelive}
            className="px-8 py-4 border border-[#C8A96B] text-[#C8A96B] font-mono text-xs tracking-widest uppercase hover:bg-[#C8A96B] hover:text-[#0A0A0A] transition-colors rounded-sm shadow-2xl backdrop-blur-sm"
          >
            Replay The Exhibition
          </button>
        </div>

      </div>
    </section>
  );
}
