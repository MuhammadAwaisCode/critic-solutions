'use client';
import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import styles from './TechStack.module.css';

// functional vector icons optimized for both dark & light themes
const ICONS = {
  React: (
    <svg viewBox="-11.5 -10.2 23 20.4" width="100%" height="100%">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  NextJS: (
    <svg viewBox="0 0 180 180" width="100%" height="100%" fill="none">
      <circle cx="90" cy="90" r="90" fill="currentColor" />
      <path d="M149.5 157.5L69.1 54H54v71.9h12V71.7l71.5 91.8c4.4-1.7 8.4-3.7 12-6z" fill="url(#nextGrad)" />
      <rect x="115" y="54" width="12" height="72" fill="url(#nextGrad2)" />
      <defs>
        <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextGrad2" x1="121" y1="54" x2="120.8" y2="106.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill="#3178c6" rx="12"/>
      <path d="M38 70h-8V38h8v32zm27.8-21.7c-2-1.4-4.8-2-8-2-3.5 0-6.1.8-8 2.5-1.8 1.6-2.8 4.1-2.8 7.3s.9 5.5 2.8 7.2c1.9 1.7 4.5 2.5 8 2.5 3.2 0 6-.6 8-2v-5.5h-8v-6h14.5v13.5c-3 2.5-8.3 4.2-14.5 4.2-6.5 0-11.8-1.8-15.5-5.5C39 63.3 37 58.1 37 51.5c0-6.5 2-11.7 5.8-15.5 3.8-3.8 9.2-5.5 16.2-5.5 6 0 11.2 1.5 14.5 4l-5.7 5.8z" fill="white"/>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 25c-8.5 0-14 4.5-16.5 13.5 3.8-5 8.2-6.8 13.2-5.3 2.8.8 4.9 2.9 7.1 5.2s4.8 5.1 10.4 5.1c8.5 0 14-4.5 16.5-13.5-3.8 5-8.2 6.8-13.2 5.3-2.8-.8-4.9-2.9-7.1-5.2S65.5 25 50 25zM25 50c-8.5 0-14 4.5-16.5 13.5 3.8-5 8.2-6.8 13.2-5.3 2.8.8 4.9 2.9 7.1 5.2s4.8 5.1 10.4 5.1c8.5 0 14-4.5 16.5-13.5-3.8 5-8.2 6.8-13.2 5.3-2.8-.8-4.9-2.9-7.1-5.2S40.5 50 25 50z" fill="#38bdf8"/>
    </svg>
  ),
  Vue: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,15 90,85 75,85 50,41 25,85 10,85" fill="#41b883"/>
      <polygon points="50,15 75,85 62,85 50,62 38,85 25,85" fill="#35495e"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M25 25c0-6.9 5.6-12.5 12.5-12.5S50 18.1 50 25v12.5H37.5C30.6 37.5 25 31.9 25 25z" fill="#f24e1e"/>
      <path d="M25 50c0-6.9 5.6-12.5 12.5-12.5H50V50c0 6.9-5.6 12.5-12.5 12.5S25 56.9 25 50z" fill="#a259ff"/>
      <path d="M25 75c0-6.9 5.6-12.5 12.5-12.5H50V75c0 6.9-5.6 12.5-12.5 12.5S25 81.9 25 75z" fill="#1abc9c"/>
      <path d="M50 25c0-6.9 5.6-12.5 12.5-12.5S75 18.1 75 25s-5.6 12.5-12.5 12.5H50V25z" fill="#ff7262"/>
      <circle cx="62.5" cy="50" r="12.5" fill="#1abc9c"/>
    </svg>
  ),
  NodeJS: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10l35 20v40L50 90 15 70V30L50 10z" fill="none" stroke="#68a063" strokeWidth="6" strokeLinejoin="round"/>
      <path d="M50 22L75 36.5v29L50 80 25 65.5v-29L50 22z" fill="#68a063"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10C27.9 10 28.5 28.9 28.5 28.9h8.8s-.3-10.2 11.2-10.2c11.5 0 11.5 8.8 11.5 8.8h17s4.1-.1 4.1 19.3c0 19.4-15.6 18.2-15.6 18.2h-6.2v-8.8s.2-11.2-11.2-11.2H32c-11.4 0-16.7 10-16.7 18s4 18 16.7 18h6.2V83s-.6 8.8 21.8 8.8c22.4 0 21.8-18.9 21.8-18.9h-8.8s.3 10.2-11.2 10.2c-11.5 0-11.5-8.8-11.5-8.8h-17s-4.1.1-4.1-19.3c0-19.4 15.6-18.2 15.6-18.2h6.2v8.8s-.2 11.2 11.2 11.2H68c11.4 0 16.7-10 16.7-18s-4-18-16.7-18h-6.2V17s.6-8.8-21.8-8.8z" fill="#3776ab"/>
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" />
      <path d="M30 40h12L32 60h12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="65" cy="50" r="8" fill="currentColor" />
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill="#059669" rx="12"/>
      <path d="M55 15L25 55h20L35 85l35-45H50l5-25z" fill="white"/>
    </svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 15L15 35v30l35 20 35-20V35L50 15zm0 8l28 16v32L50 87 22 71V39l28-16z" fill="#e10098"/>
      <circle cx="50" cy="15" r="7" fill="#e10098"/>
      <circle cx="15" cy="35" r="7" fill="#e10098"/>
      <circle cx="15" cy="65" r="7" fill="#e10098"/>
      <circle cx="50" cy="85" r="7" fill="#e10098"/>
      <circle cx="85" cy="65" r="7" fill="#e10098"/>
      <circle cx="85" cy="35" r="7" fill="#e10098"/>
      <path d="M50 25L24 40v20l26 15 26-15V40L50 25z" fill="none" stroke="#e10098" strokeWidth="3"/>
    </svg>
  ),
  RestAPI: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
      <rect x="15" y="15" width="70" height="70" rx="12" strokeWidth="6" />
      <path d="M30 40h24M30 60h40M30 50h30" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm14 47.5c-1 1.7-2.6 3-4.5 3.5v11.5c0 1.4-1.1 2.5-2.5 2.5h-5c-1.4 0-2.5-1.1-2.5-2.5V61c-1.9-.5-3.5-1.8-4.5-3.5-1.2-2-1.5-4.5-.7-6.8l.2-.5c.4-1.1 1.2-2.1 2.2-2.7l3-1.8c.9-.5 2-.8 3-.8h10c1.1 0 2.1.3 3 .8l3 1.8c1 .6 1.8 1.6 2.2 2.7l.2.5c.8 2.3.5 4.8-.7 6.8zM41.5 30h17c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5h-17c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5z" fill="#336791"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10c-1.1 0-2.1.6-2.6 1.5C40 25 35 40 35 55c0 13.8 6.7 25 15 25s15-11.2 15-25c0-15-5-30-12.4-43.5-.5-.9-1.5-1.5-2.6-1.5z" fill="#47a248"/>
      <path d="M50 10c.1 0 .2.1.3.1V80c-8.3 0-15-11.2-15-25 0-15 5-30 12.4-43.5.5-.9 1.5-1.5 2.6-1.5z" fill="#3f3f3f" opacity="0.15" />
      <path d="M50 80v10c0 1.1-.9 2-2 2h4c1.1 0 2-.9 2-2V80" fill="#47a248"/>
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10L15 28l35 18 35-18L50 10z" fill="#d82c20"/>
      <path d="M15 42l35 18 35-18v10L50 70 15 52V42z" fill="#a31f16"/>
      <path d="M15 62l35 18 35-18v10L50 90 15 72V62z" fill="#d82c20"/>
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M55 10L25 52h22L35 90l40-42H53l12-38z" fill="#3ecf8e"/>
    </svg>
  ),
  Prisma: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      <path d="M50 10L15 45v20l35 25 35-25V45L50 10z" fill="#0c344b"/>
      <path d="M50 10L15 45l35 25 35-25-35-35z" fill="#2d3748" opacity="0.3"/>
      <path d="M50 10v60L85 45 50 10z" fill="#16a394"/>
    </svg>
  ),
  Firebase: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M18.5 75.8l10.3-64.4c.3-1.8 2.2-2.8 3.7-1.8L50 21.3l-31.5 54.5z" fill="#ffca28"/>
      <path d="M81.5 75.8L71.2 11.4c-.3-1.8-2.2-2.8-3.7-1.8L50 21.3l31.5 54.5z" fill="#ffa000"/>
      <path d="M18.5 75.8l31.5-54.5 10.3 35.4c.5 1.8-1.5 3.3-2.9 2.1L18.5 75.8z" fill="#f57c00"/>
      <path d="M18.5 75.8H81.5L50 95 18.5 75.8z" fill="#ff7043"/>
    </svg>
  ),
};

const CATEGORIES = {
  frontend: [
    { name: 'React', iconKey: 'React' },
    { name: 'Next.js', iconKey: 'NextJS' },
    { name: 'TypeScript', iconKey: 'TypeScript' },
    { name: 'Tailwind', iconKey: 'Tailwind' },
    { name: 'Vue.js', iconKey: 'Vue' },
    { name: 'Figma', iconKey: 'Figma' },
  ],
  backend: [
    { name: 'Node.js', iconKey: 'NodeJS' },
    { name: 'Python', iconKey: 'Python' },
    { name: 'Express', iconKey: 'Express' },
    { name: 'FastAPI', iconKey: 'FastAPI' },
    { name: 'GraphQL', iconKey: 'GraphQL' },
    { name: 'REST APIs', iconKey: 'RestAPI' },
    { name: 'PostgreSQL', iconKey: 'PostgreSQL' },
    { name: 'MongoDB', iconKey: 'MongoDB' },
    { name: 'Redis', iconKey: 'Redis' },
    { name: 'Supabase', iconKey: 'Supabase' },
    { name: 'Prisma', iconKey: 'Prisma' },
    { name: 'Firebase', iconKey: 'Firebase' },
  ],
};

const CATEGORY_KEYS = Object.keys(CATEGORIES); // ['frontend', 'backend']

export default function TechStack() {
  const { t } = useLang();
  const techStack = t?.techStack || {};
  const tabLabels = techStack.tabs || {};
  const [active, setActive] = useState('frontend');

  return (
    <section className="section section--muted" id="tech-stack">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{techStack.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {techStack.title}
          </h2>
          <p className="body-lg">
            {techStack.subTitle}
          </p>
        </div>

        {/* ── Tabs Container ── */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`${styles.tab} ${active === key ? styles.tabActive : ''}`}
              >
                {tabLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Dynamic Badge Grid ── */}
        <div className={styles.badgeGrid} key={active}>
          {CATEGORIES[active].map((tech) => (
            <div key={tech.name} className={styles.techBadge}>
              <span className={styles.techIcon}>
                {ICONS[tech.iconKey]}
              </span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}