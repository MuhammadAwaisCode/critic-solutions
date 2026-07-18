'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link'; // Next.js fast navigation ke liye
import { usePathname } from 'next/navigation'; // Current page track karne ke liye
import styles from './Navbar.module.css';
import { useTheme } from '../../context/ThemeContext';
import { useLang, LANGUAGES } from '../../context/LangContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLang, t } = useLang();
  const langRef = useRef(null);

  // Path check karne ke liye logic
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const NAV_LINKS = [
    { label: t.nav.home,      href: '#' },
    { label: t.nav.about,     href: '#overview' },
    { label: t.nav.services,  href: '#services' },
    { label: t.nav.products,  href: '#ai-features' },
    { label: t.nav.resources, href: '#case-studies' },
    { label: t.nav.company,   href: '#footer' },
  ];

  // Smart URL generator
  const getHref = (href) => {
    if (isHomePage) return href; // Agar home page par hain toh normal anchor link '#' kaam karega
    return href === '#' ? '/' : `/${href}`; // Agar contact page par hain toh '/#section' ban jayega
  };

  // Prevent background scrolling when mobile menu is open (Premium UX)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          {/* Logo link: Logo click karne par home page par transfer karega */}
          <Link href={isHomePage ? '#' : '/'} className={styles.logo}>
            <span className={styles.logoMark}>
              <img
                src="/logo.png" 
                alt="Criticpick Logo"
                className={styles.logoImg}
              />
            </span>
            <span>Critics Solutions</span>
          </Link>

          <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.label} className={styles.navItem}>
                {/* <a> ki jagah <Link> component use kiya taake fast page change ho */}
                <Link href={getHref(link.href)} className={styles.link} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            
            <li className={styles.ctaMobileItem}>
              <Link
                href={isHomePage ? '#pricing' : '/#pricing'}
                className={`btn btn-dark ${styles.ctaMobile}`}
                onClick={() => setOpen(false)}
              >
                {t.nav.getStarted}
              </Link>
            </li>
          </ul>

          <div className={styles.actions}>
            {/* ── Theme Toggle ── */}
            <button
              className={styles.iconBtn}
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? (
                // Moon icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                // Sun icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {/* ── Language Dropdown ── */}
            <div className={styles.langWrap} ref={langRef}>
              <button
                className={styles.langBtn}
                onClick={() => setLangOpen(v => !v)}
                aria-label="Select language"
                aria-expanded={langOpen}
              >
                <span className={styles.langCode}>{currentLang.label}</span>
                <svg
                  className={`${styles.langChevron} ${langOpen ? styles.langChevronOpen : ''}`}
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langOpen && (
                <ul className={styles.langMenu} role="listbox">
                  {LANGUAGES.map(l => (
                    <li key={l.code}>
                      <button
                        className={`${styles.langOption} ${l.code === lang ? styles.langOptionActive : ''}`}
                        onClick={() => { changeLang(l.code); setLangOpen(false); }}
                        role="option"
                        aria-selected={l.code === lang}
                      >
                        <span className={styles.langFlag}>{l.flag}</span>
                        <span>{l.label}</span>
                        {l.code === lang && (
                          <svg className={styles.langCheck} width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Get Started Desktop CTA ── */}
            <Link href={isHomePage ? '#pricing' : '/#pricing'} className={`btn btn-dark ${styles.ctaDesktop}`}>
              {t.nav.getStarted}
            </Link>

            {/* ── Burger ── */}
            <button
              className={styles.burger}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`${styles.bar} ${open ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${open ? styles.barOpen2 : ''}`} />
              <span className={`${styles.bar} ${open ? styles.barOpen3 : ''}`} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}