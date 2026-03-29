'use client';

import { useState } from 'react';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  scrollY: number;
}

export default function AboutSection({ scrollY }: AboutSectionProps) {
  const [showSkills, setShowSkills] = useState(false);
  const contentOpacity = Math.min(1, Math.max(0, (scrollY - 1000) / 500));

  const languages = ['Java', 'C', 'PostgreSQL', 'TypeScript', 'Python'];
  const technologies = ['React', 'Next.js', 'CSS', 'Docker', 'Git'];

  return (
    <div id="about" className={styles.section}>
      {/* Background Image - rotated 180deg */}
      <div className={styles.backgroundImage} />
      
      <div 
        className={styles.contentWrapper}
        style={{
          opacity: contentOpacity,
          transform: `translateY(${Math.max(0, 30 - (scrollY - 1000) / 15)}px)`,
        }}
      >
        {/* Section Title - Top Right Corner */}
        <h2 className={styles.sectionTitle}>Who am i</h2>
        
        {/* Glass Container */}
        <div className={styles.glassContainer}>
          {/* Content Area */}
          <div className={styles.contentArea}>
            {!showSkills ? (
              /* Bio Content */
              <div className={styles.bioContent}>
                <p className={styles.bioText}>
                  I am a Computer Science and Engineering student with a deep curiosity for understanding how things work, which has been the main reason why I chose this field.
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
                    <span className={styles.infoValue}>Computer Science @ University of Coimbra</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Skills Content */
              <div className={styles.skillsContent}>
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
            )}
          </div>
          
          {/* Single Toggle Button - Bottom Right Corner */}
          <button 
            className={styles.toggleBtn}
            onClick={() => setShowSkills(!showSkills)}
          >
            {showSkills ? 'About' : 'Skills'}
          </button>
        </div>
      </div>
    </div>
  );
}
