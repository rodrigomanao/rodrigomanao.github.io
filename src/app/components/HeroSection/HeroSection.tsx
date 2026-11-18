'use client';

import Grainient from '../shared/Grainient';
import styles from './HeroSection.module.css';

const NAME = 'Rodrigo Manão';

/**
 * Just the name over the moving gradient. The gradient melts into the black
 * of the Projects section below it (same transition as the /projects page),
 * so there is no scroll-driven animation here any more.
 */
export default function HeroSection() {
  return (
    <section id="home" className={styles.heroContainer} aria-label="Intro">
      <div className={styles.grainientWrapper}>
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

      <div className={styles.fade} />

      <div className={styles.textLayer}>
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
    </section>
  );
}
