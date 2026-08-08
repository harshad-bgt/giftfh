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

    // Remove the text fade out and montage so it transitions cleanly to Act 7
    // The text will just remain on screen

  }, { scope: containerRef });

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
          <p className="paragraph-line opacity-0 translate-y-5">To the architect,</p>
          <p className="paragraph-line opacity-0 translate-y-5">the dreamer,</p>
          <p className="paragraph-line opacity-0 translate-y-5">the creator,</p>
          <p className="paragraph-line opacity-0 translate-y-5">and the person behind</p>
          <p className="paragraph-line opacity-0 translate-y-5">all these beautiful memories.</p>
          
          <p className="paragraph-line opacity-0 translate-y-5 text-[#C8A96B] mt-12 block">
            "May the next chapter be your most beautiful one yet."
          </p>
        </div>
      </div>

    </section>
  );
}
