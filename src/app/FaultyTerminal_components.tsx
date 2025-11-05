'use client';

import { useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import Terminal from './components/FaultyTerminal';

const TerminalComponent = Terminal as ComponentType<Record<string, unknown>>;

export default function TerminalWrapper() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Calculate opacity based on scroll position
  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const projectsOpacity = Math.min(1, scrollY / 500);
  const darknessOpacity = Math.min(0.6, scrollY / 600);
  
  return (
    <div style={{ height: '200vh' }}>
      {/* Hero Section */}
      <div
      id="home"
        style={{
          width: '100%',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* FaultyTerminal rendering */}
        <TerminalComponent
          scale={2.5}
          gridMul={[2, 1]}
          digitSize={1.3}
          timeScale={1}
          pause={false}
          scanlineIntensity={0.7}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#d32f2f"
          mouseReact={true}
          mouseStrength={1}
          pageLoadAnimation={false}
          brightness={0.4}
        />
        {/* Dark overlay using darknessOpacity to avoid unused variable */}
        <div

          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundColor: `rgba(0,0,0,${darknessOpacity})`,
            transition: 'background-color 0.3s ease-out',
          }}
        />

        
        {/* Text overlay */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#f05555ff',
            fontFamily: 'Percy Pixel',
            animation: 'fadeIn 2s ease-in-out',
            pointerEvents: 'none',
            opacity: heroOpacity,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <h1 style={{ fontSize: '10rem', margin: 0 }}>Rodrigo Manão</h1>
          <p style={{ fontSize: '5rem', margin: 0 }}>Portfolio</p>
        </div>
      </div>

      {/* Projects Section */}
      <div
        id="projects"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          opacity: projectsOpacity,
          transform: `translateY(${Math.max(0, 50 - scrollY / 10)}px)`,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        }}
      >
        <h2
          style={{
            fontSize: '6rem',
            color: '#f05555ff',
            fontFamily: 'Percy Pixel',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          My Projects
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%',
          }}
        >
          {/* Add your project cards here */}
          <div
            style={{
              backgroundColor: '#1a1a1a',
              padding: '2rem',
              borderRadius: '8px',
              border: '2px solid #f05555ff',
            }}
          >
            <h3 style={{ color: '#f05555ff', fontFamily: 'Percy Pixel' }}>
              Project 1
            </h3>
            <p style={{ color: '#ccc' }}>Project description goes here</p>
          </div>
          {/* Repeat for more projects */}
        </div>
      </div>
    </div>
  );
}