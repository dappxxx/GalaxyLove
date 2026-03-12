import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const RING_CONFIG = [
  { photoCount: 10, inner: 4.2,  outer: 7.0,  tiltX: 0.30, particleCount: 7000,  ringSpeed: 0.0012, photoSpeed: 0.18, color: '#c8c8c8' },
  { photoCount: 12, inner: 6.8,  outer: 10.0, tiltX: 0.30, particleCount: 9000,  ringSpeed: 0.0010, photoSpeed: 0.12, color: '#b8b8b8' },
  { photoCount: 14, inner: 9.8,  outer: 13.5, tiltX: 0.30, particleCount: 10000, ringSpeed: 0.0008, photoSpeed: 0.08, color: '#aaaaaa' },
  { photoCount: 14, inner: 13.2, outer: 17.5, tiltX: 0.30, particleCount: 10000, ringSpeed: 0.0006, photoSpeed: 0.05, color: '#999999' },
];
const getRingMidRadius = (cfg) => (cfg.inner + cfg.outer) / 2;

function SaturnRingBand({ cfg }) {
  const groupRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(cfg.particleCount * 3);
    for (let i = 0; i < cfg.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const t = Math.pow(Math.random(), 0.6); // denser toward inner edge
      const r = cfg.inner + t * (cfg.outer - cfg.inner);
      const y = (Math.random() - 0.5) * 0.12; // very thin disc
      positions[i * 3 + 0] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [cfg.inner, cfg.outer, cfg.particleCount]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += cfg.ringSpeed;
  });

  return (
    // ⚠️ rotation.x = tiltX — sama persis dengan foto
    <group ref={groupRef} rotation={[cfg.tiltX, 0, 0]}>
      <points geometry={geometry}>
        <pointsMaterial
          color={cfg.color}
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function useOrbit(orbit, meshRef, materialRef) {
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const angle = orbit.angleOffset + t * orbit.speed;

    const r = orbit.radius;
    const flatX = Math.cos(angle) * r;
    const flatZ = Math.sin(angle) * r;

    const tilt = orbit.tiltX;
    const worldX = flatX;
    const worldY = -flatZ * Math.sin(tilt) + orbit.yLift + Math.sin(t * 0.5 + orbit.seed) * 0.12;
    const worldZ = flatZ * Math.cos(tilt);

    meshRef.current.position.set(worldX, worldY, worldZ);

    // Hadap ke arah orbit 
    meshRef.current.rotation.order = 'YXZ';
    meshRef.current.rotation.y = -angle + Math.PI / 2;
    meshRef.current.rotation.x = tilt * 0.55; 
    meshRef.current.rotation.z = 0;
  });
}

function RealPhotoCard({ url, orbit, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(url);
  useOrbit(orbit, meshRef, null);
  return (
    <mesh ref={meshRef} scale={hovered ? 1.3 : 1}
      onClick={e => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}>
      <planeGeometry args={[1.6, 1.15]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ColorCard({ color, orbit, index, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const c = useMemo(() => new THREE.Color(color), [color]);
  useOrbit(orbit, meshRef, null);
  return (
    <mesh ref={meshRef} scale={hovered ? 1.3 : 1}
      onClick={e => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}>
      <planeGeometry args={[1.6, 1.15]} />
      <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.45}
        side={THREE.DoubleSide} />
    </mesh>
  );
}

function PhotoCard({ photo, orbit, index, onClick }) {
  if (photo.startsWith('__color__')) {
    return <ColorCard color={photo.replace('__color__', '')} orbit={orbit} index={index} onClick={onClick} />;
  }
  return <RealPhotoCard url={photo} orbit={orbit} onClick={onClick} />;
}

export default function PhotoStars({ photos, onPhotoClick }) {
  const orbitParams = useMemo(() => {
    const params = [];
    let idx = 0;
    for (let ri = 0; ri < RING_CONFIG.length && idx < photos.length; ri++) {
      const cfg = RING_CONFIG[ri];
      const midR = getRingMidRadius(cfg);
      const n = Math.min(cfg.photoCount, photos.length - idx);
      for (let i = 0; i < n; i++) {
        params.push({
          angleOffset: (i / cfg.photoCount) * Math.PI * 2,
          radius: midR,
          tiltX: cfg.tiltX,
          speed: cfg.photoSpeed,
          yLift: 0.55,   
          seed: idx * 0.61,
        });
        idx++;
      }
    }
    while (idx < photos.length) {
      params.push({
        angleOffset: ((idx % 12) / 12) * Math.PI * 2,
        radius: 20.0,
        tiltX: 0.30,
        speed: 0.04,
        yLift: 0.55,
        seed: idx * 0.61,
      });
      idx++;
    }
    return params;
  }, [photos.length]);

  return (
    <group>
      {RING_CONFIG.map((cfg, i) => (
        <SaturnRingBand key={i} cfg={cfg} />
      ))}

      {photos.map((photo, i) => (
        <PhotoCard
          key={i}
          photo={photo}
          orbit={orbitParams[i]}
          index={i}
          onClick={() => onPhotoClick(photo, i)}
        />
      ))}
    </group>
  );
}