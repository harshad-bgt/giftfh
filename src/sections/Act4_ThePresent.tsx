import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageData } from '../hooks/useDynamicImages';

interface Props {
  images: ImageData[];
}

export default function Act4_ThePresent({ images }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current || images.length === 0) return;

    // Calculate total scroll distance based on track width vs window width
    const getScrollAmount = () => {
      let trackWidth = trackRef.current!.scrollWidth;
      return -(trackWidth - window.innerWidth);
    };

    // Horizontal Scroll Timeline
    const tween = gsap.to(trackRef.current, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`, // The scroll distance equals the track width
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    // Inner Image Parallax (removed because object-contain is now used)
    gsap.utils.toArray('.parallax-horizontal').forEach((el: any) => {
      // Intentionally left blank or can add subtle scaling instead
      gsap.to(el, {
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          scrub: true,
        }
      });
    });

  }, { scope: sectionRef, dependencies: [images] });

  if (images.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#111111] relative z-40 overflow-hidden">
      
      {/* Pinned Container */}
      <div className="h-screen w-full flex flex-col justify-center relative">
        
        {/* Intro Text (Fades out as you scroll right) */}
        <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none mix-blend-difference">
          <p className="font-mono text-[#C8A96B] tracking-[0.4em] uppercase text-xs mb-2 md:mb-4">Act IV: The Present</p>
          <h2 className="font-serif text-4xl md:text-7xl text-[#F5F5F5] font-light">Today</h2>
        </div>

        {/* Horizontal Track */}
        <div ref={trackRef} className="flex items-center gap-12 md:gap-24 px-[10vw] w-max h-full pt-16">
          
          {/* Introductory Title Block inside the track */}
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0 pr-12 md:pr-24 flex flex-col justify-center">
            <div className="space-y-6 font-serif text-2xl md:text-4xl text-[#F5F5F5]/70 italic leading-relaxed border-l-2 border-[#1D3557] pl-8">
              <p>Dreams became reality.</p>
              <p>Every sketch became confidence.</p>
              <p>Every challenge became experience.</p>
              <p className="text-[#C8A96B] pt-4">The exhibition of now.</p>
            </div>
          </div>

          {/* Dynamic Image Gallery */}
          {images.map((img, i) => {
            
            // Generate creative dynamic layouts based on index, but DO NOT force aspect ratios
            const layoutType = i % 4;
            let containerClass = "flex-shrink-0 relative group overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl ";
            
            if (layoutType === 0) {
              containerClass += "w-[70vw] md:w-[35vw] self-center"; // Large Natural
            } else if (layoutType === 1) {
              containerClass += "w-[60vw] md:w-[25vw] self-start mt-24"; // Small Natural Top
            } else if (layoutType === 2) {
              containerClass += "w-[85vw] md:w-[45vw] self-center"; // Wide Natural
            } else {
              containerClass += "w-[60vw] md:w-[25vw] self-end mb-24"; // Medium Natural Bottom
            }

            return (
              <div key={i} className={containerClass}>
                
                <img 
                  src={img.src} 
                  alt={`Current ${i}`} 
                  className="parallax-horizontal w-full h-auto block opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale-[20%] group-hover:grayscale-0"
                />
                
                {/* Floating Glass Info Panel */}
                <div className="absolute bottom-6 left-6 right-6 p-4 md:p-6 bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-mono text-[#C8A96B] text-[10px] tracking-widest uppercase mb-3 block">Frame 0{i + 1}</span>
                  <p className="font-serif text-[#F5F5F5] text-sm md:text-lg italic leading-relaxed">{img.caption}</p>
                </div>

              </div>
            );
          })}

          {/* End cap spacing */}
          <div className="w-[10vw] flex-shrink-0" />

        </div>

      </div>
    </section>
  );
}
