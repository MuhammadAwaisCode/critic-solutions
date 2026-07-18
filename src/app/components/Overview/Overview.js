import styles from './Overview.module.css';

export default function Overview({ t }) {
  const features = t?.features || [];

  return (
    <section className="section section--muted" id="overview">
      <div className="container">
        <div className={`split split--40-60 ${styles.layout}`}>

          {/* ── Left ── */}
          <div className="stack stack--md">
            <span className="tag-badge">{t?.badge}</span>
            <h2 className="display-lg">
              {t?.headline}
            </h2>
            <p className="body-lg">{t?.body}</p>
            <a href="#services" className={`btn btn-dark ${styles.ctaBtn}`}>
              {t?.cta}
            </a>
          </div>

          {/* ── Right: Pillars ── */}
          <div className="stack stack--sm">
            {features.map((p, i) => (
              <div key={i} className={`${styles.pillar} card`}>
                <div className={styles.pillarHead}>
                  <span className={styles.checkIcon}>
                    <svg className={styles.checkSvg} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7l4 4 6-7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                </div>
                <p className={`body-sm ${styles.pillarDesc}`}>{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}