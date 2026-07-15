import styles from './CaseStudies.module.css';

// t = t.caseStudies — all case data (client, category, metric labels,
// descriptions) is now sourced dynamically from the active language context.
export default function CaseStudies({ t }) {
  return (
    <section className="section" id="case-studies">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t.badge}</span>
          <h2 className="display-lg" style={{ marginTop: '16px', marginBottom: '14px' }}>
            {t.headline}
          </h2>
          <p className="body-lg">{t.sub}</p>
        </div>

        <div className="stack stack--md">
          {t.list.map((c) => (
            <article key={c.client} className={styles.caseCard}>
              <div
                className={styles.caseLeft}
                style={{ '--case-bg': c.accent }}
              >
                <span className="tag-badge">{c.category}</span>
                <h3 className={styles.client}>{c.client}</h3>
                <p className="body-sm" style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                  {c.desc}
                </p>
              </div>

              <div className={styles.caseRight}>
                {c.metrics.map(([val, label]) => (
                  <div key={label} className={styles.metricBox}>
                    <span className={styles.metricVal}>{val}</span>
                    <span className="body-sm">{label}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
