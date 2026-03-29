'use client';

import styles from './ContactSection.module.css';

interface ContactSectionProps {
  scrollY: number;
}

export default function ContactSection({ scrollY }: ContactSectionProps) {
  const contactOpacity = Math.min(1, Math.max(0, (scrollY - 2000) / 500));

  return (
    <div id="contact" className={styles.section}>
      <div 
        className={styles.contentWrapper}
        style={{
          opacity: contactOpacity,
          transform: `translateY(${Math.max(0, 30 - (scrollY - 2000) / 15)}px)`,
        }}
      >
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>Contacts</h2>
        
        {/* Contact Cards Grid */}
        <div className={styles.contactCardsGrid}>
          {/* Email Card */}
          <a
            href="mailto:rodrigoalmeidamanao@gmail.com"
            className={`${styles.contactCard} ${styles.emailCard}`}
          >
            <div className={styles.cardInner}>
              <div className={styles.glowEffect}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Email</h3>
                <p className={styles.cardText}>rodrigoalmeidamanao@gmail.com</p>
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
              <div className={styles.glowEffect}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>GitHub</h3>
                <p className={styles.cardText}>@rodrigomanao</p>
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
              <div className={styles.glowEffect}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>LinkedIn</h3>
                <p className={styles.cardText}>Rodrigo Manão</p>
              </div>
            </div>
          </a>
        </div>

        {/* Footer Message */}
        <div className={styles.footerMessage}>
          <p className={styles.footerText}>Let&apos;s build something together</p>
        </div>
      </div>
    </div>
  );
}
