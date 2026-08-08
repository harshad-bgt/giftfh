import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function ArchitecturalGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // Smooth mouse follow for parallax
    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, (mouse.y * Math.PI) / 8, 0.05);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, (mouse.x * Math.PI) / 8, 0.05);

    if (groupRef.current) {
      // Very slow, elegant rotation
      groupRef.current.rotation.y += delta * 0.05;
      
      // Apply parallax
      groupRef.current.rotation.x = targetRotation.current.x + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      groupRef.current.rotation.z = targetRotation.current.y;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -1, 0]}>
        
        {/* Core Concrete Pillar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 6, 1]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Cantilever Plane 1 */}
        <mesh position={[1, 1, 0.5]} rotation={[0, 0, 0]}>
          <boxGeometry args={[4, 0.2, 3]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.8} />
        </mesh>

        {/* Cantilever Plane 2 */}
        <mesh position={[-1, -1, -0.5]} rotation={[0, 0, 0]}>
          <boxGeometry args={[5, 0.2, 2.5]} />
          <meshStandardMaterial color="#111111" roughness={0.8} />
        </mesh>

        {/* Wireframe Architectural Shell */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 6, 6]} />
          <meshBasicMaterial color="#1D3557" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Secondary Wireframe Grid */}
        <mesh position={[0.5, 0.5, 0.5]}>
          <boxGeometry args={[4, 5, 4]} />
          <meshBasicMaterial color="#C8A96B" wireframe transparent opacity={0.15} />
        </mesh>

        {/* Soft Lighting specifically for this structure */}
        <pointLight position={[-2, 2, 2]} intensity={2} color="#F5F5F5" distance={10} />
        <pointLight position={[2, -2, -2]} intensity={3} color="#C8A96B" distance={15} />
        
      </group>
    </Float>
  );
}
