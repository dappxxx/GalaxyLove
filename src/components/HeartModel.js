import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeartModel() {
  const meshRef = useRef();
  const glowRef = useRef();

  // Create heart shape using Three.js Shape
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;

    shape.moveTo(x, y + 1.0);
    shape.bezierCurveTo(x, y + 1.4, x - 0.5, y + 1.8, x - 1.0, y + 1.8);
    shape.bezierCurveTo(x - 2.0, y + 1.8, x - 2.0, y + 0.6, x - 2.0, y + 0.6);
    shape.bezierCurveTo(x - 2.0, y - 0.4, x - 1.0, y - 1.2, x, y - 2.0);
    shape.bezierCurveTo(x + 1.0, y - 1.2, x + 2.0, y - 0.4, x + 2.0, y + 0.6);
    shape.bezierCurveTo(x + 2.0, y + 0.6, x + 2.0, y + 1.8, x + 1.0, y + 1.8);
    shape.bezierCurveTo(x + 0.5, y + 1.8, x, y + 1.4, x, y + 1.0);

    const extrudeSettings = {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    return geometry;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.008;
      glowRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Outer glow heart */}
      <mesh ref={glowRef} geometry={heartGeometry} scale={1.08}>
        <meshStandardMaterial
          color="#ff3366"
          emissive="#ff1a4d"
          emissiveIntensity={0.6}
          transparent
          opacity={0.25}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Main heart */}
      <mesh ref={meshRef} geometry={heartGeometry} castShadow>
        <meshStandardMaterial
          color="#ff2255"
          emissive="#cc0033"
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Point light on heart */}
      <pointLight color="#ff4488" intensity={3} distance={8} decay={2} />
    </group>
  );
}
