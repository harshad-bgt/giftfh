import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function ZahaSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  
  const { mouse } = useThree();
  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // Smooth mouse follow
    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, (mouse.y * Math.PI) / 4, 0.05);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, (mouse.x * Math.PI) / 4, 0.05);

    if (meshRef.current && wireframeRef.current) {
      // Continuous slow rotation
      meshRef.current.rotation.y += delta * 0.05;
      wireframeRef.current.rotation.y -= delta * 0.08;
      
      // Breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);

      // Mouse responsive parallax
      meshRef.current.rotation.x = targetRotation.current.x + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      wireframeRef.current.rotation.z = targetRotation.current.y + Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
    }

    // Moving highlight spotlight
    if (spotlightRef.current) {
      spotlightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5;
      spotlightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group position={[0, 0, 0]}>
        
        {/* Core Glass Sculptural Mass */}
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[2.5, 0.8, 256, 32, 3, 4]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.95}
            opacity={1}
            transparent
            roughness={0.05}
            ior={1.7}
            thickness={2}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Abstract Architectural Wireframe Shell */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[4, 2]} />
          <meshBasicMaterial color="#1D3557" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Soft Volumetric Background Light */}
        <pointLight position={[0, 0, -4]} intensity={5} color="#C8A96B" distance={20} decay={2} />
        
        {/* Moving Highlight Spotlight */}
        <spotLight 
          ref={spotlightRef}
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={4} 
          color="#ffffff" 
          distance={20}
        />
        
        {/* Subtle Ambient */}
        <ambientLight intensity={0.2} />

      </group>
    </Float>
  );
}
