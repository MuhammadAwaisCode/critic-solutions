import styles from './Overview.module.css';

// Pillars are technical product descriptions — not translated.
// Only the section badge/headline/body/CTA come from t (t.overview).
const PILLARS = [
  {
    title: 'Cutting-Edge Technologies',
    desc: 'We adopt modern stacks — Next.js, Node.js, PostgreSQL — chosen for durability and speed, not trends.',
  },
  {
    title: 'Responsive Design',
    desc: 'Every interface is pixel-perfect across devices, built mobile-first with accessibility as standard.',
  },
  {
    title: 'Performance Optimization',
    desc: 'Sub-second load times, Core Web Vitals in the green, and continuous Lighthouse monitoring post-launch.',
  },
  {
    title: 'Web Security',
    desc: 'SSL, rate limiting, OWASP practices, and penetration-tested endpoints on every production release.',
  },
];

// t = t.overview
export default function Overview({ t }) {
  return (
    <section className="section section--muted" id="overview">
      <div className="container">
        <div className="split split--40-60">

          {/* ── Left ── */}
          <div className="stack stack--md">
            <span className="tag-badge">{t.badge}</span>
            <h2 className="display-lg">
              {t.headline}
            </h2>
            <p className="body-lg">{t.body}</p>
            <a href="#services" className="btn btn-dark" style={{ alignSelf: 'flex-start' }}>
              {/* "See What We Build" is a CTA that maps naturally to services.badge;
                  using a dedicated key would require a LangContext addition.
                  For now we use the services badge as a sensible stand-in, or
                  you can add overview.cta to LangContext later. */}
              See What We Build
            </a>
          </div>

          {/* ── Right: Pillars ── */}
          <div className="stack stack--sm">
            {PILLARS.map((p) => (
              <div key={p.title} className={`${styles.pillar} card`}>
                <div className={styles.pillarHead}>
                  <span className={styles.checkIcon}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                </div>
                <p className="body-sm" style={{ marginLeft: '34px', color: 'var(--text-secondary)' }}>{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
