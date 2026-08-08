import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageData } from '../hooks/useDynamicImages';

interface Props {
  cutouts: ImageData[];
  chibis: ImageData[];
}

export default function Act7_Epilogue({ cutouts, chibis }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Floating animation for all frames
    gsap.utils.toArray('.cute-frame').forEach((el: any, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -20 : 20,
        rotation: i % 2 === 0 ? 2 : -2,
        duration: 3 + (i % 3),
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      
      // Entrance animation on scroll
      gsap.from(el, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      });
    });

  }, { scope: containerRef });

  const handleRelive = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="w-full bg-[#FAFAFA] py-32 relative z-50 overflow-hidden">
      
      {/* Soft playful background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-[#FFD1DC] rounded-full blur-[80px]" />
        <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-[#C8A96B] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-[#B5D8CC] rounded-full blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-12 relative z-10">
        
        <div className="text-center mb-24">
          <h2 className="font-serif text-4xl md:text-6xl text-[#1A1A1A] font-medium mb-6">
            A Little More Joy
          </h2>
          <p className="font-serif text-xl text-[#1A1A1A]/60 italic">
            Because one section wasn't enough for today.
          </p>
        </div>

        {/* CUTE FRAMES GRID */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-32">
          
          {cutouts.map((img, i) => (
            <div key={`cutout-${i}`} className="cute-frame w-[70vw] md:w-[350px]">
              <div 
                className="w-full aspect-square bg-white p-4 pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative"
                style={{ 
                  borderRadius: '20px 20px 20px 20px',
                  transform: `rotate(${(i % 5) - 2}deg)` 
                }}
              >
                <div 
                  className="w-full h-full overflow-hidden relative"
                  style={{ borderRadius: '60% 40% 50% 50% / 50% 50% 40% 60%' }} // Organic cutout shape
                >
                  <img 
                    src={img.src} 
                    alt={`Bonus ${i}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="absolute bottom-6 left-0 w-full text-center font-serif text-[#1A1A1A] text-sm md:text-lg italic px-4">
                  {img.caption || "Another beautiful moment."}
                </p>
                {/* Cute tape piece */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm border border-black/5 shadow-sm transform -rotate-2" />
              </div>
            </div>
          ))}

          {chibis.map((img, i) => (
            <div key={`chibi-${i}`} className="cute-frame w-[60vw] md:w-[280px] mt-12 md:mt-24">
              <div 
                className="w-full aspect-square bg-white p-3 shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-full relative"
                style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 4}deg)` }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#FFD1DC]">
                  <img 
                    src={img.src} 
                    alt={`Chibi ${i}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#FFD1DC] rounded-full flex items-center justify-center shadow-lg text-xl">
                  ✨
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="flex justify-center pb-24">
          <button 
            onClick={handleRelive}
            className="px-8 py-4 bg-[#1A1A1A] text-white font-mono text-sm tracking-widest uppercase hover:bg-[#C8A96B] transition-colors rounded-full shadow-2xl"
          >
            Replay The Exhibition
          </button>
        </div>

      </div>
    </section>
  );
}
