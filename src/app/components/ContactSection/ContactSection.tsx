'use client';

import Noise from '../shared/Noise';
import styles from './ContactSection.module.css';

interface ContactSectionProps {
  scrollY: number;
}

export default function ContactSection({ scrollY }: ContactSectionProps) {
  const contactOpacity = Math.min(1, Math.max(0, (scrollY - 2000) / 500));

  return (
    <div id="contact" className={styles.section}>
      {/* Noise Background */}
      <div className={styles.noiseBackground}>
        <Noise patternAlpha={8} />
      </div>
      
      <div 
        className={styles.contentWrapper}
        style={{
          opacity: contactOpacity,
          transform: `translateY(${Math.max(0, 30 - (scrollY - 2000) / 15)}px)`,
        }}
      >
        {/* ASCII Art Title */}
        <div className={styles.asciiArt}>
          <pre className="text-xs sm:text-sm md:text-base">
{`
  ____            _             _   
 / ___|___  _ __ | |_ __ _  ___| |_ 
| |   / _ \\| '_ \\| __/ _\` |/ __| __|
| |__| (_) | | | | || (_| | (__| |_ 
 \\____\\___/|_| |_|\\__\\__,_|\\___|\\__|
`}
          </pre>
        </div>
        
        {/* Contact Cards Grid */}
        <div className={styles.contactCardsGrid}>
          {/* Email Card */}
          <a
            href="mailto:rodrigoalmeidamanao@gmail.com"
            className={`${styles.contactCard} ${styles.emailCard}`}
          >
            <div className={styles.cardInner}>
              {/* Glow effect on hover */}
              <div className={styles.glowEffect}></div>
              
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} text-3xl md:text-4xl`}>
                  Email
                </h3>
                <p className={`${styles.cardText} text-lg md:text-xl`}>
                  rodrigoalmeidamanao@gmail.com
                </p>
              </div>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/rodrigomanao"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactCard} ${styles.githubCard}`}
          >
            <div className={styles.cardInner}>
              {/* Glow effect on hover */}
              <div className={styles.glowEffect}></div>
              
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} text-3xl md:text-4xl`}>
                  GitHub
                </h3>
                <p className={`${styles.cardText} text-lg md:text-xl`}>
                  @rodrigomanao
                </p>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/rodrigo-manão-57b061330/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactCard} ${styles.linkedinCard}`}
          >
            <div className={styles.cardInner}>
              {/* Glow effect on hover */}
              <div className={styles.glowEffect}></div>
              
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} text-3xl md:text-4xl`}>
                  LinkedIn
                </h3>
                <p className={`${styles.cardText} text-lg md:text-xl`}>
                  Rodrigo Manão
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Footer Message */}
        <div className={styles.footerMessage}>
          <p className={`${styles.footerText} text-2xl md:text-3xl`}>
            Let&apos;s build something together
          </p>
        </div>
      </div>
    </div>
  );
}
