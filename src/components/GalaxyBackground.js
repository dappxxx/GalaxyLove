import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GalaxyBackground() {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 6000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const r = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Pink/purple/white star colors
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // white/blue
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.75) {
        // pink
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.3;
      } else {
        // purple
        colors[i * 3] = 0.6 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1.0;
      }
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}