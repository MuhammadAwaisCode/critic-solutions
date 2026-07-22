import styles from './Services.module.css';

// ── Icons Mapper ──
// Yeh helper function title ke mutabiq aapke premium SVG icons ko assign karega
const getServiceIcon = (title, defaultIcon) => {
  const cleanTitle = title?.trim();
  
  // Packaging & Printing ke liye SVG Icon (English/Arabic donon ke liye)
  if (cleanTitle === "Packaging & Printing" || cleanTitle === "التعبئة والتغليف والطباعة") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    );
  }

  // Tax Consultancy ke liye SVG Icon (English/Arabic donon ke liye)
  if (cleanTitle === "Tax Consultancy" || cleanTitle === "الاستشارات الضريبية") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  }

  // Baki saari services ke liye jo translation file se icon aa raha hai wahi dikhao
  return defaultIcon;
};

export default function Services({ t }) {
  // Ab direct context list use hogi (English mein 8 items aur Arabic mein bhi exact 8 items)
  const servicesToRender = t?.list || [];

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t?.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {t?.headline}
          </h2>
          <p className="body-lg">{t?.sub}</p>
        </div>

        <div className={styles.grid}>
          {servicesToRender.map((s) => (
            <article key={s.title} className={`${styles.card} card stack stack--sm`}>
              {/* Icon helper function ko call kiya */}
              <span className={styles.icon}>{getServiceIcon(s.title, s.icon)}</span>
              
              <h3 className={styles.title}>{s.title}</h3>
              <p className={`body-sm ${styles.desc}`}>{s.desc}</p>
              
              <div className={styles.tags}>
                {s.tags?.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              
              <a href="#pricing" className={styles.link}>
                <span>{t?.learnMore}</span>
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