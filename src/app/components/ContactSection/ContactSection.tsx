'use client';

import Reveal from '../shared/Reveal';
import styles from './ContactSection.module.css';

export default function ContactSection() {

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.contentWrapper}>
        <Reveal className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Contacts</h2>
        </Reveal>

        <Reveal className={styles.contactLinks} delay={120}>
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
          <span className={styles.cardHint} aria-hidden>Contact me</span>
          <span className={styles.careerHint} aria-hidden>See my career</span>
        </Reveal>
      </div>
    </section>
  );
}
