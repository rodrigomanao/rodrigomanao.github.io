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
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Contacts</h2>
        </div>

        <div className={styles.contactLinks}>
          <a href="mailto:rodrigoalmeidamanao@gmail.com" className={styles.contactLink}>
            <span className={styles.contactLabel}>Email</span>
            <span className={styles.contactValue}>rodrigoalmeidamanao@gmail.com</span>
          </a>
          <a href="https://github.com/rodrigomanao" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
            <span className={styles.contactLabel}>GitHub</span>
            <span className={styles.contactValue}>@rodrigomanao</span>
          </a>
          <a href="https://www.linkedin.com/in/rodrigo-manão-57b061330/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
            <span className={styles.contactLabel}>LinkedIn</span>
            <span className={styles.contactValue}>Rodrigo Manão</span>
          </a>
          <span className={styles.cardHint}>Contact me</span>
          <span className={styles.careerHint}>See my career</span>
        </div>
      </div>
    </div>
  );
}
