import Link from 'next/link';
import styles from './Pricing.module.css';

// t = t.pricing (badge, headline, sub, popularBadge, footnote, footnoteLink, plans[6])
export default function Pricing({ t }) {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {t.headline}
          </h2>
          <p className="body-lg">{t.sub}</p>
        </div>

        {/* 6-card grid: 3 cols desktop → 2 cols tablet → 1 col mobile */}
        <div className={styles.grid}>
          {t.plans.map((plan) => (
            <article
              key={plan.id}
              className={`${styles.plan} ${plan.highlight ? styles.planHighlight : ''}`}
            >
              {plan.highlight && (
                <div className={styles.popularBadge}>{t.popularBadge}</div>
              )}

              <div className="stack stack--sm">
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceLine}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <p className={styles.planDesc}>{plan.desc}</p>
              </div>

              <hr className={styles.divider} />

              <ul className={`stack stack--sm ${styles.features}`}>
                {plan.features.map((f, i) => (
                  <li key={i} className={styles.feature}>
                    <svg className={styles.featureIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`btn ${plan.highlight ? 'btn-invert' : 'btn-dark'} ${styles.cta}`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>

        <p className={styles.footnote}>
          {t.footnote}<Link href="/contact" className={styles.footLink}>{t.footnoteLink}</Link>
        </p>
      </div>
    </section>
  );
}