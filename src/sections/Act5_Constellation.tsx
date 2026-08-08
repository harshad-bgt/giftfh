import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ImageData } from '../hooks/useDynamicImages';

interface Props {
  images: ImageData[];
}

function ConstellationScene({ images }: { images: ImageData[] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Distribute images on a sphere
  const nodes = useMemo(() => {
    return images.map((img, i) => {
      const phi = Math.acos(-1 + (2 * i) / images.length);
      const theta = Math.sqrt(images.length * Math.PI) * phi;
      
      const radius = 6;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      return { pos: new THREE.Vector3(x, y, z), img };
    });
  }, [images]);

  // Load textures
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return images.map(img => loader.load(img.src));
  }, [images]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* Nodes (Images in Glass Cubes) */}
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <group position={node.pos}>
            <mesh>
              <boxGeometry args={[1.5, 2, 0.1]} />
              <meshBasicMaterial map={textures[i]} side={THREE.DoubleSide} />
            </mesh>
            {/* Simple wireframe border instead of heavy transmission glass */}
            <mesh>
              <boxGeometry args={[1.6, 2.1, 0.2]} />
              <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Connecting Architectural Lines */}
      {nodes.map((node, i) => {
        if (i === nodes.length - 1) return null;
        return (
          <Line
            key={`line-${i}`}
            points={[node.pos, nodes[i + 1].pos]}
            color="#C8A96B"
            lineWidth={0.5}
            transparent
            opacity={0.3}
          />
        );
      })}

      {/* Golden Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            args={[new Float32Array(900).map(() => (Math.random() - 0.5) * 20), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#C8A96B" transparent opacity={0.6} />
      </points>

    </group>
  );
}

export default function Act5_Constellation({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <section className="relative w-full h-[100svh] bg-[#0A0A0A] z-50 overflow-hidden">
      
      <div className="absolute top-12 left-0 w-full text-center z-10 pointer-events-none">
        <p className="font-mono text-[#C8A96B] tracking-[0.3em] uppercase text-xs mb-2">Act V: The Memory Constellation</p>
        <p className="font-serif text-[#F5F5F5]/60 text-sm italic">Drag to explore the architecture of a lifetime.</p>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#C8A96B" distance={20} />
        <ConstellationScene images={images} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
    </section>
  );
}
