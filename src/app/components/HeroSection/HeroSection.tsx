'use client';

import { useState, useEffect } from 'react';
import Grainient from '../shared/Grainient';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  scrollY: number;
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const darknessOpacity = Math.min(0.7, scrollY / 400);
  const gradientOpacity = Math.min(1, scrollY / 300);
  const blurAmount = Math.min(15, scrollY / 120);
  
  // Keep the background fully visible in the hero; let
  // the scroll effect come from Projects moving over it.
  const grainientOpacity = 1;

  return (
    <div id="home" className={styles.heroContainer}>
      {/* Grainient Background */}
      <div
        className={styles.grainientWrapper}
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: grainientOpacity,
        }}
      >
        <div className={styles.grainientInner}>
          <Grainient
            color1="#ff8647"
            color2="#e63b7a"
            color3="#000000"
            timeSpeed={0.25}
            colorBalance={-0.1}
            warpStrength={1.9}
            warpFrequency={5}
            warpSpeed={2.2}
            warpAmplitude={47}
            blendAngle={60}
            blendSoftness={0.25}
            rotationAmount={590}
            noiseScale={2}
            grainAmount={0.09}
            grainScale={2}
            grainAnimated={false}
            contrast={1.45}
            gamma={0.9}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.6}
          />
        </div>
        {/* Dark overlay */}
        <div
          className={styles.darkOverlay}
          style={{
            backgroundColor: `rgba(0,0,0,${darknessOpacity})`,
          }}
        />
        {/* Multi-layer gradient transition */}
        <div
          className={styles.gradientOverlay}
          style={{
            opacity: gradientOpacity,
          }}
        />
        {/* Red accent fade */}
        <div
          className={styles.redAccentFade}
          style={{
            opacity: gradientOpacity * 0.6,
          }}
        />
      </div>

      {/* Text overlay */}
      <div
        className={styles.textOverlay}
        style={{
          opacity: heroOpacity,
          display: heroOpacity === 0 ? 'none' : undefined,
        }}
      >
        <h1 className={styles.heroTitle}>Rodrigo Manão</h1>
      </div>
    </div>
  );
}
