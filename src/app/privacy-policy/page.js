'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useLang, translations } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import styles from '../legal/legal.module.css';

export default function PrivacyPolicy() {
  const { t } = useLang();
  const { theme } = useTheme();

  // Robust fallback: if the active language is somehow missing a `legal`
  // dictionary, fall back to English instead of rendering blank content.
  const legalData = t?.legal || translations.en.legal;
  const data = legalData.privacy;
  const themeClass = theme === 'dark' ? styles.dark : styles.light;

  return (
    <>
      <Navbar />
      <main className={`${styles.page} ${themeClass}`} data-theme={theme}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            <span>←</span> {legalData.backLink}
          </Link>

          <div className={styles.legalCard}>
            <header className={styles.header}>
              <h1 className={styles.title}>{data.title}</h1>
              <p className={styles.meta}>{legalData.lastUpdated}</p>
            </header>

            <article className={styles.content}>
              <p>{data.intro}</p>

              {data.sections.map((section, i) => (
                <div key={i}>
                  <h2>{section.title}</h2>
                  {section.content && <p>{section.content}</p>}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer t={t?.footer} />
    </>
  );
}
