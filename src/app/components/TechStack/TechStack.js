'use client';
import { useState } from 'react';
import styles from './TechStack.module.css';

const CATEGORIES = {
  Frontend: [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Tailwind', icon: '🌊' },
    { name: 'Vue.js', icon: '🟢' },
    { name: 'Figma', icon: '🎨' },
  ],
  Backend: [
    { name: 'Node.js', icon: '⬡' },
    { name: 'Python', icon: '🐍' },
    { name: 'Express', icon: 'Ex' },
    { name: 'FastAPI', icon: 'FA' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'REST APIs', icon: '🔌' },
  ],
  Database: [
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Redis', icon: '⚡' },
    { name: 'Supabase', icon: '🟢' },
    { name: 'Prisma', icon: '◇' },
    { name: 'Firebase', icon: '🔥' },
  ],
};

export default function TechStack() {
  const [active, setActive] = useState('Frontend');

  return (
    <section className="section section--muted" id="tech-stack">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">Technology</span>
          <h2 className="display-lg" style={{ marginTop: '16px', marginBottom: '14px' }}>
            Tools that ship on time
          </h2>
          <p className="body-lg">
            We work with battle-tested, well-supported technology — no experimental stack risk on your critical systems.
          </p>
        </div>

        {/* ── Tab Switcher ── */}
        <div className={styles.tabs}>
          {Object.keys(CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`${styles.tab} ${active === cat ? styles.tabActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Badge Grid ── */}
        <div className={styles.badgeGrid}>
          {CATEGORIES[active].map((tech) => (
            <div key={tech.name} className={styles.techBadge}>
              <span className={styles.techIcon}>{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
