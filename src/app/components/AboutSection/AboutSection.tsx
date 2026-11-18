'use client';

import { useState } from 'react';
import Reveal from '../shared/Reveal';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const [showSkills, setShowSkills] = useState(false);

  const languages = ['Java', 'C', 'C++', 'PostgreSQL', 'TypeScript', 'Python', 'LaTeX', 'Lex'];
  const technologies = ['React', 'Next.js', 'CSS', 'Docker', 'Git', 'Tailwind'];

  return (
    <section id="about" className={styles.section}>
      {/* Background Image - rotated 180deg */}
      <div className={styles.backgroundImage} />
      
      <Reveal className={styles.contentWrapper} amount={0.15}>
        {/* Section Title - Top Right Corner */}
        <h2 className={styles.sectionTitle}>Who am i</h2>
        
        {/* Glass Container */}
        <div className={styles.glassContainer}>
          {/* Content Area */}
          <div
            className={`${styles.contentArea} ${showSkills ? styles.skillsActive : styles.aboutActive}`}
          >
            <div className={styles.contentTrack}>
              {/* Bio Content (About) */}
              <div className={styles.bioContent} aria-hidden={showSkills}>
                <p className={styles.bioText}>
                  I&apos;m currently doing my MSc in Cybersecurity at the University of Coimbra, after a degree in Computer Science and Engineering. A deep curiosity for understanding how things work is what brought me to this field.
                </p>
                <p className={styles.bioText}>
                  Since a young age, I&apos;ve always been fascinated by technology and the logic behind systems, and that enthusiasm has grown even stronger throughout my academic journey.
                </p>
                <p className={styles.bioText}>
                  I&apos;m passionate about problem-solving, innovation, and constantly learning new concepts. My goal is to develop creative and efficient solutions to real-world problems while continuously improving my technical and personal skills.
                </p>
                
                {/* Info Cards */}
                <div className={styles.infoCards}>
                  <div className={styles.infoCard}>
                    <span className={styles.infoLabel}>Location</span>
                    <span className={styles.infoValue}>Portugal, Anadia</span>
                  </div>
                  <div className={styles.infoCard}>
                    <span className={styles.infoLabel}>Education</span>
                    <span className={styles.infoValue}>MSc Cybersecurity @ University of Coimbra</span>
                  </div>
                </div>
              </div>

              {/* Skills Content */}
              <div className={styles.skillsContent} aria-hidden={!showSkills}>
                <div className={styles.skillsCategory}>
                  <h3 className={styles.categoryTitle}>Languages</h3>
                  <div className={styles.skillsGrid}>
                    {languages.map((skill) => (
                      <span key={skill} className={styles.skillTag}>{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.skillsCategory}>
                  <h3 className={styles.categoryTitle}>Technologies</h3>
                  <div className={styles.skillsGrid}>
                    {technologies.map((skill) => (
                      <span key={skill} className={styles.skillTag}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Single Toggle Button - Bottom Right Corner */}
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setShowSkills(!showSkills)}
            aria-pressed={showSkills}
          >
            {showSkills ? 'About' : 'Skills'}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
