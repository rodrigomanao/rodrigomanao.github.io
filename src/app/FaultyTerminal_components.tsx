'use client';


import type { ComponentType } from 'react';
import Terminal from './FaultyTerminal';

const TerminalComponent = Terminal as ComponentType<Record<string, unknown>>;

export default function TerminalWrapper() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <TerminalComponent
        scale={2.5}
        gridMul={[2, 1]}
        digitSize={1.3}
        timeScale={1}
        pause={false}
        scanlineIntensity={0.2}
        glitchAmount={0.5}
        flickerAmount={0.5}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#00ff00"
        mouseReact={true}
        mouseStrength={0.5}
        pageLoadAnimation={true}
        brightness={0.7}
      />
    </div>
  );
}