// src/hooks/useImages.ts
export function useImages(): string[] {
  // Dynamically import all images from the assets/images folder
  const modules = import.meta.glob('/src/assets/images/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' });
  const images = Object.values(modules)
    .map((module) => (typeof module === 'string' ? module : String(module)))
    .sort();
  return images;
}
