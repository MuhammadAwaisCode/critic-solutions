'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LangContext';
import styles from './OurTeam.module.css';

export default function OurTeam() {
  const { currentLang, translations } = useLanguage();
  const teamMembers = translations[currentLang]?.ourTeam?.teamMembers || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (teamMembers.length === 0) return;
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (teamMembers.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (teamMembers.length === 0) return;
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(autoSlide);
  }, [currentIndex, teamMembers]);

  const current = teamMembers[currentIndex];

  if (!current) return null;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.headerLine}>
        <span className={styles.sectionNum}>{current.number}</span>
        <h2 className={styles.sectionHeading}>{current.sectionTitle}</h2>
      </div>

      <div className={styles.wrapper} key={`${currentLang}-${currentIndex}`}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.imageCard}>
            <img src={current.image} alt={current.name} className={styles.image} />
          </div>
          <div className={styles.leftMeta}>
            <h3 className={styles.leftName}>{current.name}</h3>
            <p className={styles.leftRole}>{current.role}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <blockquote className={styles.quote}>“{current.quote}”</blockquote>

          {current.paragraphs?.map((para, i) => (
            <p key={i} className={styles.paragraph}>
              {para}
            </p>
          ))}

          <div className={styles.signatureBlock}>
            <h4 className={styles.sigName}>{current.sigName}</h4>
            <p className={styles.sigRole}>{current.sigRole}</p>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className={styles.controls}>
        <button onClick={prevSlide} className={styles.navBtn} aria-label="Previous">
          &#8592;
        </button>
        <div className={styles.dots}>
          {teamMembers.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className={styles.navBtn} aria-label="Next">
          &#8594;
        </button>
      </div>
    </div>
  );
}