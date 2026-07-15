'use client';
import styles from './Hero.module.css';


export default function Hero({ t, tOverview }) {
  return (
    <section className={`section ${styles.hero}`}>
      <div className="container">
        <div className="split split--60-40">

          <div className={`stack stack--lg ${styles.left}`}>
            <span className="tag-badge tag-badge--accent">
              <span className={styles.dot} />
              {t.badge}
            </span>

            <h1 className="display-xl">{t.headline}</h1>

            <p className="body-lg" style={{ maxWidth: '500px' }}>{t.sub}</p>

            <div className={`row row--gap-sm ${styles.ctas}`}>
              <a href="#services" className="btn btn-dark">
                {t.cta1}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/contact" className="btn btn-light">{t.cta2}</a>
            </div>

            <div className={`row row--gap-md ${styles.metrics}`}>
              {[
                ['120+', tOverview.stat1Label],
                ['98%',  tOverview.stat2Label],
                ['6+',   tOverview.stat3Label],
              ].map(([val, label]) => (
                <div key={label} className={styles.metric}>
                  <span className={styles.metricVal}>{val}</span>
                  <span className="body-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard visual — metric labels are UI chrome, kept in English */}
          <div className={styles.dashboard}>
            <div className={styles.dashHeader}>
              <div className={styles.dashDots}>
                <span style={{ background: '#FF5F57' }} />
                <span style={{ background: '#FFBD2E' }} />
                <span style={{ background: '#28C840' }} />
              </div>
              <span className="body-sm">yae-dashboard.app</span>
            </div>

            <div className={styles.dashBody}>
              <div className={`row row--between ${styles.dashMeta}`}>
                <div>
                  <p className="label" style={{ color: 'var(--text-muted)' }}>Total Revenue</p>
                  <p className={styles.dashBig}>$284,920</p>
                </div>
                <span className={styles.badge}>↑ 18.4%</span>
              </div>

              <div className={styles.chartBar}>
                {[65, 80, 55, 90, 72, 88, 95].map((h, i) => (
                  <div key={i} className={styles.bar} style={{ height: `${h}%` }} />
                ))}
              </div>

              <div className={styles.dashCards}>
                {[
                  { label: 'Active Users', val: '4,821', color: 'blue'   },
                  { label: 'Conversions',  val: '63.2%', color: 'green'  },
                  { label: 'Avg. Session', val: '4m 38s', color: 'yellow' },
                ].map(({ label, val, color }) => (
                  <div key={label} className={styles.dashCard} data-color={color}>
                    <p className="body-sm">{label}</p>
                    <p className={styles.dashCardVal}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
