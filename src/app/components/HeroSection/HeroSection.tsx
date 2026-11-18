'use client';

import { useEffect, useRef } from 'react';
import Grainient from '../shared/Grainient';
import styles from './HeroSection.module.css';

const NAME = 'Rodrigo Manão';

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Scroll effects are written straight to the DOM inside one rAF,
  // instead of going through React state on every scroll event.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight || 1;
      if (y > vh * 1.5) return; // hero is fully covered — nothing to do

      const p = Math.min(1, y / (vh * 0.55)); // 0 → 1 while leaving the hero
      const eased = 1 - Math.pow(1 - p, 3);

      if (bgRef.current) {
        const blur = reduce ? 0 : eased * 12;
        bgRef.current.style.filter = blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : '';
        bgRef.current.style.transform = reduce ? '' : `scale(${1 + eased * 0.06})`;
      }
      if (darkRef.current) darkRef.current.style.opacity = String(eased * 0.7);
      if (fadeRef.current) fadeRef.current.style.opacity = String(Math.min(1, y / (vh * 0.4)));
      if (textRef.current) {
        const o = Math.max(0, 1 - y / (vh * 0.42));
        textRef.current.style.opacity = String(o);
        textRef.current.style.visibility = o === 0 ? 'hidden' : '';
        textRef.current.style.transform = reduce
          ? ''
          : `translate3d(0, ${(-y * 0.18).toFixed(1)}px, 0) scale(${1 - eased * 0.06})`;
        textRef.current.style.filter = reduce || p < 0.02 ? '' : `blur(${(eased * 6).toFixed(2)}px)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="home" className={styles.heroContainer} aria-label="Intro">
      <div ref={bgRef} className={styles.grainientWrapper}>
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
      </div>

      <div ref={darkRef} className={styles.darkOverlay} />
      <div ref={fadeRef} className={styles.gradientOverlay} />

      <div className={styles.textLayer}>
        <div ref={textRef} className={styles.textOverlay}>
          <h1 className={styles.heroTitle} aria-label={NAME}>
            {NAME.split(' ').map((word, w, words) => {
              const offset = words.slice(0, w).join(' ').length + (w ? 1 : 0);
              return (
                <span key={w} className={styles.word} aria-hidden>
                  {[...word].map((ch, i) => (
                    <span
                      key={i}
                      className={styles.char}
                      style={{ '--i': offset + i } as React.CSSProperties}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>
        </div>
      </div>
    </section>
  );
}
