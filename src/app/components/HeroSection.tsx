'use client';

import Terminal from './FaultyTerminal';
import type { ComponentType } from 'react';

const TerminalComponent = Terminal as ComponentType<Record<string, unknown>>;

interface HeroSectionProps {
  scrollY: number;
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const darknessOpacity = Math.min(0.7, scrollY / 500);
  const gradientOpacity = Math.min(1, scrollY / 300);
  const blurAmount = Math.min(15, scrollY / 120);
  
  // Hide terminal completely after scrolling past hero section
  const terminalOpacity = Math.max(0, 1 - (scrollY - 800) / 400);
  const shouldRenderTerminal = scrollY < 1800;

  return (
    <>
      {/* FaultyTerminal Background - Fixed to viewport */}
      {shouldRenderTerminal && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 0,
            filter: `blur(${blurAmount}px)`,
            opacity: terminalOpacity,
            transition: 'filter 0.1s ease-out, opacity 0.3s ease-out',
          }}
        >
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
          {/* Dark overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundColor: `rgba(0,0,0,${darknessOpacity})`,
              transition: 'background-color 0.2s ease-out',
            }}
          />
          {/* Multi-layer gradient transition */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50vh',
              pointerEvents: 'none',
              background: `
                linear-gradient(to bottom, 
                  transparent 0%, 
                  rgba(7, 7, 7, 0.3) 30%,
                  rgba(7, 7, 7, 0.6) 60%,
                  #070707 100%
                )
              `,
              opacity: gradientOpacity,
              transition: 'opacity 0.2s ease-out',
            }}
          />
          {/* Red accent fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40vh',
              pointerEvents: 'none',
              background: `
                radial-gradient(ellipse at bottom center, 
                  rgba(240, 85, 85, 0.05) 0%, 
                  transparent 70%
                )
              `,
              opacity: gradientOpacity * 0.6,
              transition: 'opacity 0.2s ease-out',
            }}
          />
        </div>
      )}

      {/* Hero Section */}
      <div
        id="home"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
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
            display: heroOpacity === 0 ? 'none' : undefined,
          }}
        >
          <h1 style={{ fontSize: '10rem', margin: 0 }}>Rodrigo Manão</h1>
          <p style={{ fontSize: '5rem', margin: 0 }}>Portfolio</p>
        </div>
      </div>
    </>
  );
}
