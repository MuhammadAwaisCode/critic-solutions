import styles from './Industries.module.css';
import {
  LuHeartPulse,
  LuShoppingBag,
  LuGraduationCap,
  LuHouse,
  LuCreditCard,
  LuTruck,
} from "react-icons/lu";

// Icons are matched by position — t.industries.list is always authored in this
// fixed order (Healthcare, Retail & E-Commerce, Education, Real Estate,
// Finance, Logistics) across every language in LangContext.js, so index-based
// mapping keeps the right icon on the right (translated) card.
const INDUSTRY_ICONS = [
  LuHeartPulse,    // Healthcare
  LuShoppingBag,   // Retail & E-Commerce
  LuGraduationCap, // Education
  LuHouse,         // Real Estate
  LuCreditCard,    // Finance
  LuTruck,         // Logistics
];

export default function Industries({ t }) {
  const list = t?.list || [];

  return (
    <section className="section section--muted" id="industries">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t?.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {t?.headline}
          </h2>
          <p className="body-lg" style={{ maxWidth: '640px', margin: '0 auto' }}>
            {t?.sub}
          </p>
        </div>

        <div className={styles.grid}>
          {list.map((ind, i) => {
            const IconComponent = INDUSTRY_ICONS[i] || LuHeartPulse;
            return (
              <article key={i} className={styles.card}>
                <div className={styles.iconWrap}>
                  <IconComponent className={styles.icon} />
                </div>
                <div className="stack stack--sm">
                  <h3 className={styles.name}>{ind.title}</h3>
                  <p className={`body-sm ${styles.desc}`}>{ind.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}