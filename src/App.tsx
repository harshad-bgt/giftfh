import React, { useState, useEffect } from 'react';
import './tailwind.css';
import SmoothScroll from './components/SmoothScroll';

import Act1_Blueprint from './sections/Act1_Blueprint';
import Act2_Foundation from './sections/Act2_Foundation';
import Act3_StructuralSupport from './sections/Act3_StructuralSupport';
import Act4_ThePresent from './sections/Act4_ThePresent';
import Act5_Constellation from './sections/Act5_Constellation';
import Act6_Celebration from './sections/Act6_Celebration';
import Act7_Epilogue from './sections/Act7_Epilogue';
import LoginPage from './sections/LoginPage';

import { useDynamicImages } from './hooks/useDynamicImages';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="font-mono text-[#C8A96B] tracking-[0.4em] uppercase text-xs animate-pulse">
          Initializing Architecture...
        </p>
      </div>
    );
  }

  // Reduce images in Today section (Act 4) to 8 images
  const act4Images = current.slice(0, 8);
  
  // Pass the remaining Today images to Epilogue
  const epilogueCutouts = current.slice(8);

  return (
    <SmoothScroll>
      <Act1_Blueprint />
      <Act2_Foundation images={childhood} />
      <Act3_StructuralSupport images={family} />
      <Act4_ThePresent images={act4Images} />
      <Act5_Constellation images={allImages} />
      <Act6_Celebration images={allImages} />
      {epilogueCutouts.length > 0 && (
        <Act7_Epilogue cutouts={epilogueCutouts} />
      )}
    </SmoothScroll>
  );
}
