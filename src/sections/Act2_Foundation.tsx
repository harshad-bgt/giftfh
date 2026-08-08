import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageData } from '../hooks/useDynamicImages';

interface Props {
  images: ImageData[];
}

export default function Act2_Foundation({ images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || images.length === 0) return;

    // Fade in text blocks
    gsap.utils.toArray('.act2-text').forEach((el: any) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        }
      });
    });

    // Reveal blueprint to color images (optimized using opacity instead of filters)
    gsap.utils.toArray('.blueprint-reveal').forEach((el: any) => {
      const colorImg = el.querySelector('.color-img');
      gsap.to(colorImg, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
        }
      });
    });

  }, { scope: containerRef, dependencies: [images] });

  if (images.length === 0) return null;

  return (
    <section ref={containerRef} className="w-full bg-[#1A1A1A] text-[#F5F5F5] py-24 relative z-20">
      
      {/* Decorative vertical blueprint line */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-1/2 w-[1px] bg-[#1D3557]/40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <div className="act2-text text-center mb-32 relative bg-[#1A1A1A] p-6 shadow-2xl border border-[#1D3557]/30">
          <p className="font-mono text-[#C8A96B] tracking-[0.3em] uppercase text-xs mb-4">Act II: Foundation</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-snug">
            Every masterpiece <br />
            begins with a single line.
          </h2>
        </div>

        <div className="w-full flex flex-col gap-32">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-8 md:gap-16 even:md:flex-row-reverse group w-full">
              
              {/* Image Frame */}
              <div className="blueprint-reveal relative w-full md:w-[45%] aspect-[4/5] bg-[#0A0A0A] p-4 border border-[#1D3557] shadow-2xl">
                {/* Drafting board clips */}
                <div className="absolute -top-2 left-4 w-8 h-4 bg-[#C8A96B] shadow-md z-20" />
                <div className="absolute -top-2 right-4 w-8 h-4 bg-[#C8A96B] shadow-md z-20" />
                
                {/* Base Blueprint Image (Grayscale + Blueish) */}
                <img 
                  src={img.src} 
                  alt={`Childhood memory ${i} blueprint`} 
                  className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover object-top opacity-60 mix-blend-luminosity brightness-75"
                />
                <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] bg-[#1D3557] mix-blend-screen pointer-events-none" />
                
                {/* Full Color Image (Fades in over the blueprint) */}
                <img 
                  src={img.src} 
                  alt={`Childhood memory ${i}`} 
                  className="color-img absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover object-top opacity-0 z-10"
                />
              </div>

              {/* Text & Caption */}
              <div className="act2-text w-full md:w-[45%] flex flex-col space-y-4 px-4 md:px-0 bg-[#1A1A1A] md:bg-transparent z-10">
                <span className="font-mono text-[#1D3557] tracking-widest text-xs">FIG. {String(i + 1).padStart(2, '0')}</span>
                <p className="font-serif text-2xl md:text-3xl italic text-[#F5F5F5]/90">
                  {i === 0 ? "Every dream begins with curiosity." : i === images.length - 1 ? "Every foundation creates the future." : img.caption}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
