import React, { useState } from 'react';

// ===== CUSTOMIZE HERE =====
const NAME = "Sayang";           // Your partner's name
const DATE = "March 15, 2026";   // Their birthday date
// ==========================

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInSlow {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .landing-btn {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.25);
    padding: 0.5rem 0;
    cursor: pointer;
    transition: color 0.4s, border-color 0.4s;
    animation: fadeIn 1.4s ease 1.6s both;
  }
  .landing-btn:hover {
    color: #fff;
    border-color: rgba(255,255,255,0.7);
  }
  .landing-btn:hover .btn-arrow {
    transform: translateX(5px);
  }
  .btn-arrow {
    display: inline-block;
    margin-left: 0.6em;
    transition: transform 0.3s ease;
  }
`;

export default function LandingPage({ onStart, fadeOut }) {
  return (
    <>
      <style>{css}</style>
      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#08080e',
        zIndex: 100,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1.2s ease',
        overflow: 'hidden',
      }}>

        {/* Subtle radial glow — not flashy, just atmospheric */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,100,140,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Fine dot grid texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />

        {/* Thin horizontal rule top */}
        <div style={{
          position: 'absolute',
          top: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))',
          animation: 'fadeInSlow 2s ease 0.5s both',
        }} />

        {/* Main content */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '600px',
        }}>

          {/* Label */}
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: '0.68rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '2.2rem',
            animation: 'fadeIn 1s ease 0.3s both',
          }}>
            A gift made with love · {DATE}
          </p>

          {/* Name — the hero */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            lineHeight: 1.0,
            color: '#ffffff',
            margin: '0 0 1.6rem 0',
            letterSpacing: '-0.01em',
            animation: 'fadeIn 1.2s ease 0.6s both',
          }}>
            {NAME}
          </h1>

          {/* Thin divider */}
          <div style={{
            width: '40px',
            height: '1px',
            background: 'rgba(255,255,255,0.2)',
            marginBottom: '1.6rem',
            animation: 'fadeIn 1s ease 1s both',
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.06em',
            lineHeight: 1.7,
            marginBottom: '3rem',
            animation: 'fadeIn 1.2s ease 1.1s both',
          }}>
            Something special has been prepared for you.
          </p>

          {/* CTA Button */}
          <button className="landing-btn" onClick={onStart}>
            Open your surprise
            <span className="btn-arrow">→</span>
          </button>
        </div>

        {/* Thin horizontal rule bottom */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to top, transparent, rgba(255,255,255,0.2))',
          animation: 'fadeInSlow 2s ease 0.5s both',
        }} />

      </div>
    </>
  );
}