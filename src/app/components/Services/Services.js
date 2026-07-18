import styles from './Services.module.css';

// t = t.services — the full service card list (titles, descriptions, tags)
// is now sourced dynamically from the active language context.
export default function Services({ t }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {t.headline}
          </h2>
          <p className="body-lg">{t.sub}</p>
        </div>

        <div className={styles.grid}>
          {t.list.map((s) => (
            <article key={s.title} className={`${styles.card} card stack stack--sm`}>
              <span className={styles.icon}>{s.icon}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={`body-sm ${styles.desc}`}>{s.desc}</p>
              
              <div className={styles.tags}>
                {s.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              
              <a href="#pricing" className={styles.link}>
                <span>{t.learnMore}</span>
                <svg className={styles.arrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}