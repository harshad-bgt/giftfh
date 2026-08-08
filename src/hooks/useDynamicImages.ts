import { useState, useEffect } from 'react';
import captionsData from '../../images/captions.json';

export interface ImageData {
  src: string;
  filename: string;
  caption: string;
}

const fallbackCaptions = [
  "Some of the happiest memories begin with the simplest smiles.",
  "The moments that quietly became unforgettable.",
  "The best stories are always shared.",
  "Joy is brightest when shared together.",
  "Every milestone is another step toward the future.",
  "A genuine smile never goes out of style.",
  "Every journey leaves behind a new story.",
  "Growing into the person you were always meant to become.",
  "Some moments are too beautiful to rush.",
  "The strongest foundations are built on love.",
  "Every challenge became an experience.",
  "Behind every sketch is a dream.",
  "Designing a beautiful future.",
  "The architecture of a well-lived life.",
  "Every masterpiece begins with curiosity."
];

export function useDynamicImages() {
  const [childhood, setChildhood] = useState<ImageData[]>([]);
  const [family, setFamily] = useState<ImageData[]>([]);
  const [current, setCurrent] = useState<ImageData[]>([]);
  const [allImages, setAllImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      // 1. Define globs - dynamically scanning the 3 folders in the root images directory
      const childGlob = import.meta.glob('../../images/[cC]hildhood/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}');
      const familyGlob = import.meta.glob('../../images/[fF]amily/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}');
      const currentGlob = import.meta.glob('../../images/[cC]urrent/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}');

      let usedFallbackIndices = new Set<number>();

      const getUniqueCaption = (filename: string, category: 'childhood' | 'family' | 'current') => {
        // Try getting it from captions.json first
        const categoryDict = (captionsData as Record<string, Record<string, string>>)[category] || {};
        if (categoryDict[filename]) return categoryDict[filename];

        // Otherwise pick a unique fallback
        const availableIndices = Array.from({ length: fallbackCaptions.length }, (_, i) => i)
          .filter(i => !usedFallbackIndices.has(i));

        if (availableIndices.length === 0) {
          return "Every moment tells a unique story."; // Exhausted all fallbacks
        }

        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        usedFallbackIndices.add(randomIndex);
        return fallbackCaptions[randomIndex];
      };

      const processGlob = async (globObj: Record<string, () => Promise<any>>, category: 'childhood' | 'family' | 'current') => {
        const results: ImageData[] = [];
        for (const path in globObj) {
          const mod = await globObj[path]();
          const filename = path.split('/').pop() || '';
          
          results.push({
            src: mod.default,
            filename,
            caption: getUniqueCaption(filename, category)
          });
        }
        return results;
      };

      const cImgs = await processGlob(childGlob, 'childhood');
      const fImgs = await processGlob(familyGlob, 'family');
      const curImgs = await processGlob(currentGlob, 'current');

      setChildhood(cImgs);
      setFamily(fImgs);
      setCurrent(curImgs);
      setAllImages([...cImgs, ...fImgs, ...curImgs]);
    };

    loadImages();
  }, []);

  return { childhood, family, current, allImages };
}
