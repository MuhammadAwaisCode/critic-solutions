import styles from './Testimonials.module.css';

// t = t.testimonials — all reviews (quotes, names, roles, initials, colors)
// are now sourced dynamically from the active language context.
const STARS = '★★★★★';

export default function Testimonials({ t }) {
  return (
    <section className="section section--muted" id="testimonials">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t.badge}</span>
          <h2 className="display-lg" style={{ marginTop: '16px', marginBottom: '14px' }}>
            {t.headline}
          </h2>
        </div>

        <div className="grid-3">
          {t.list.map((r) => (
            <article key={r.name} className={`card stack stack--md ${styles.card}`}>
              <div className={styles.stars}>{STARS}</div>
              <blockquote className={styles.quote}>"{r.quote}"</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: r.color }}>
                  {r.initials}
                </div>
                <div>
                  <p className={styles.name}>{r.name}</p>
                  <p className="body-sm">{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
