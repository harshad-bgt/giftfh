import React, { useState, useEffect } from 'react';
import './tailwind.css';
import SmoothScroll from './components/SmoothScroll';

import Act1_Blueprint from './sections/Act1_Blueprint';
import Act2_Foundation from './sections/Act2_Foundation';
import Act3_StructuralSupport from './sections/Act3_StructuralSupport';
import Act4_ThePresent from './sections/Act4_ThePresent';
import Act5_Constellation from './sections/Act5_Constellation';
import Act6_Celebration from './sections/Act6_Celebration';

import { useDynamicImages } from './hooks/useDynamicImages';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const { childhood, family, current, allImages } = useDynamicImages();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (allImages.length > 0) {
      // Small delay to ensure smooth transition
      setTimeout(() => setLoading(false), 500);
    }
  }, [allImages]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="font-mono text-[#C8A96B] tracking-[0.4em] uppercase text-xs animate-pulse">
          Initializing Architecture...
        </p>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <Act1_Blueprint />
      <Act2_Foundation images={childhood} />
      <Act3_StructuralSupport images={family} />
      <Act4_ThePresent images={current} />
      <Act5_Constellation images={allImages} />
      <Act6_Celebration images={allImages} />
    </SmoothScroll>
  );
}
