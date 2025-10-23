'use client';


import type { ComponentType } from 'react';
import Terminal from './FaultyTerminal';

const TerminalComponent = Terminal as ComponentType<Record<string, unknown>>;

export default function TerminalWrapper() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
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
        pageLoadAnimation={true}
        brightness={0.4}
      />
      {/* Text overlay */}
      {/* Text overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#f05555ff', // White text color
          fontFamily: 'Percy Pixel', // Font that complements the background
          animation: 'fadeIn 2s ease-in-out', // Entry animation
        }}
      >
        <h1 style={{ fontSize: '10rem', margin: 0 }}>Rodrigo Manão</h1>
        <p style={{ fontSize: '5rem', margin: 0 }}>Portfolio</p>
      </div>
    </div>
  );
}