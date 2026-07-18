import styles from './Testimonials.module.css';

// Crisp Vector Star Icon for premium consistency across all browsers
const StarIcon = () => (
  <svg className={styles.starSvg} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export default function Testimonials({ t }) {
  return (
    <section className="section section--muted" id="testimonials">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {t.headline}
          </h2>
        </div>

        <div className={styles.grid}>
          {t.list.map((r) => (
            <article key={r.name} className={`${styles.card} card`}>
              <div className={styles.topInfo}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote className={styles.quote}>“{r.quote}”</blockquote>
              </div>

              <div className={styles.author}>
                <div className={styles.avatar} style={{ backgroundColor: r.color }}>
                  {r.initials}
                </div>
                <div className={styles.authorMeta}>
                  <p className={styles.name}>{r.name}</p>
                  <p className={`body-sm ${styles.role}`}>{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}