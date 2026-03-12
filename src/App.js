import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GalaxyScene from './components/GalaxyScene';

export default function App() {
  const [started, setStarted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => setStarted(true), 1000);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>
      {!started && <LandingPage onStart={handleStart} fadeOut={fadeOut} />}
      {started && <GalaxyScene />}
    </div>
  );
}
