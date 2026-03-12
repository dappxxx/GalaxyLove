import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HeartModel from './HeartModel';
import PhotoStars from './PhotoStar';
import GalaxyBackground from './GalaxyBackground';


const NAME = "Sayang"; 

const MESSAGES = [
  "Happy birthday to the most beautiful soul.",
  "May this year bring you everything you've been dreaming of.",
  "Wishing your birthday is as wonderful and amazing as you are.",
  "Wishing you a birthday filled with love and joy.",
  "I hope we stay together forEVER and make more beautiful memories.",
];

const FOTO_KENANGAN = [
  "/photos/foto1.jpg",
  "/photos/foto2.jpg",
  "/photos/foto3.jpg",
  "/photos/foto4.jpg",
  "/photos/foto5.jpg",
  "/photos/foto6.jpg",
  "/photos/foto7.jpg",
  "/photos/foto8.jpg",
  "/photos/foto9.jpg",
  "/photos/foto10.jpg",
  "/photos/foto11.jpg",
  "/photos/foto12.jpg",
  "/photos/foto13.jpg",
  "/photos/foto14.jpg",
  "/photos/foto15.jpg",
  "/photos/foto16.jpg",
  "/photos/foto17.jpg",
  "/photos/foto18.jpg",
  "/photos/foto19.jpg",
  "/photos/foto20.jpg",
  "/photos/foto21.jpg",
  "/photos/foto22.jpg",
  "/photos/foto23.jpg",
  "/photos/foto24.jpg",
  "/photos/foto25.jpg",
  "/photos/foto26.jpg",
  "/photos/foto27.jpg",
  "/photos/foto28.jpg",
  "/photos/foto29.jpg",
  "/photos/foto30.jpg",
  "/photos/foto31.jpg",
  "/photos/foto32.jpg",
  "/photos/foto33.jpg",
  "/photos/foto34.jpg",
  "/photos/foto35.jpg",
  "/photos/foto36.jpg",
  "/photos/foto37.jpg",
  "/photos/foto38.jpg",
  "/photos/foto39.jpg",
  "/photos/foto40.jpg",
  "/photos/foto41.jpg",
  "/photos/foto42.jpg",
  "/photos/foto43.jpg",
  "/photos/foto44.jpg",
  "/photos/foto45.jpg",
  "/photos/foto46.jpg",
  "/photos/foto47.jpg",
  "/photos/foto48.jpg",
  "/photos/foto49.jpg",
];

const PLACEHOLDER_COLORS = [
  "#ff6b9d","#c44dff","#4d79ff","#ff4d6b","#ff9f43",
  "#54a0ff","#ff6348","#ffd32a","#0be881","#f368e0",
  "#ff9ff3","#48dbfb","#1dd1a1","#ffeaa7","#dfe6e9",
  "#fd79a8","#a29bfe","#74b9ff","#fab1a0","#55efc4",
  "#e17055","#00cec9","#fdcb6e","#6c5ce7","#00b894",
  "#d63031","#0984e3","#e84393","#636e72","#b2bec3",
  "#ff7675","#81ecec","#778ca3","#fdfd96","#c7ecee",
  "#a55eea","#f7b731","#fc5c65","#45aaf2","#26de81",
  "#fd9644","#2bcbba","#eb3b5a","#3867d6","#20bf6b",
  "#ff85c1","#7bed9f","#eccc68","#70a1ff","#ff6b81",
];

const photoList = FOTO_KENANGAN.length > 0
  ? FOTO_KENANGAN
  : PLACEHOLDER_COLORS.map(c => `__color__${c}`);

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }

  .close-btn:hover {
    background: rgba(255,255,255,0.12) !important;
  }
  .music-btn:hover {
    background: rgba(255,255,255,0.08) !important;
    border-color: rgba(255,255,255,0.3) !important;
  }
`;

export default function GalaxyScene() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    muted ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  }, [muted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const isColor = (p) => p && p.startsWith('__color__');
  const getColor = (p) => p && p.replace('__color__', '');

  return (
    <>
      <style>{css}</style>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 8, 24], fov: 62 }}
        style={{ width: '100vw', height: '100vh', background: '#000' }}
        gl={{ antialias: true, alpha: false }}
      >
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffccee" />
        <directionalLight position={[-5, -3, -3]} intensity={0.4} color="#aabbff" />
        <pointLight position={[0, 12, 0]} intensity={2.5} color="#ffffff" distance={40} decay={1.5} />
        <pointLight position={[0, -8, 0]} intensity={1.5} color="#cc99ff" distance={30} decay={2} />

        <GalaxyBackground />
        <HeartModel />
        <PhotoStars photos={photoList} onPhotoClick={(photo) => setSelectedPhoto(photo)} />

        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={45}
          autoRotate
          autoRotateSpeed={0.4}
          makeDefault
        />
      </Canvas>

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '2.2rem 1rem 3rem',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)',
        pointerEvents: 'none',
        animation: 'fadeDown 1.6s ease forwards',
      }}>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: '0.62rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '0.55rem',
        }}>
          To my beloved, Naura Tedja
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '0.02em',
          margin: 0,
          lineHeight: 1.1,
        }}>
          Happy Birthday, {NAME}
        </h1>
      </div>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '3rem 1.5rem 2.8rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>

        <div style={{
          width: '28px',
          height: '1px',
          background: 'rgba(255,255,255,0.18)',
          marginBottom: '1rem',
        }} />

        <p key={msgIndex} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 2.2vw, 1.3rem)',
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
          maxWidth: '520px',
          lineHeight: 1.65,
          letterSpacing: '0.02em',
          margin: '0 0 1rem 0',
          animation: 'msgIn 0.9s ease forwards',
        }}>
          {MESSAGES[msgIndex]}
        </p>

        <div style={{ display: 'flex', gap: '6px', marginBottom: showHint ? '1.2rem' : '0' }}>
          {MESSAGES.map((_, i) => (
            <div key={i} style={{
              width: i === msgIndex ? '16px' : '4px',
              height: '2px',
              borderRadius: '2px',
              background: i === msgIndex ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>

        {showHint && (
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
            textAlign: 'center',
            animation: 'fadeUp 1s ease 1s both',
          }}>
            Click a photo · Drag to rotate · Scroll to zoom
          </p>
        )}
      </div>

      <button
        className="music-btn"
        onClick={() => setMuted(!muted)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.45)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '0.8rem',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(12px)',
          zIndex: 50,
          fontFamily: "'Jost', sans-serif",
          letterSpacing: '0.05em',
        }}
        title={muted ? 'Play music' : 'Mute music'}
      >
        {muted ? '♪' : '♫'}
      </button>

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.88)',
            zIndex: 200,
            backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              animation: 'scaleIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards',
              width: 'min(78vw, 700px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isColor(selectedPhoto) ? (
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6) 0%, ${getColor(selectedPhoto)} 70%)`,
                borderRadius: '16px',
              }} />
            ) : (
              <img
                src={selectedPhoto}
                alt="Memory"
                style={{
                  width: '100%',
                  maxHeight: '80vh',
                  borderRadius: '16px',
                  display: 'block',
                  objectFit: 'contain',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                }}
              />
            )}

            <button
              className="close-btn"
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '-14px', right: '-14px',
                background: 'rgba(10,10,10,0.75)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
                borderRadius: '50%',
                width: '36px', height: '36px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
                backdropFilter: 'blur(8px)',
                fontFamily: "'Jost', sans-serif",
              }}
            >
              ✕
            </button>
          </div>

          <p style={{
            position: 'absolute', bottom: '2rem',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
          }}>
            Click outside to close
          </p>
        </div>
      )}
    </>
  );
}