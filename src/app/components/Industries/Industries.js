import styles from './Industries.module.css';

const INDUSTRIES = [
  { emoji: '🎓', name: 'Education', desc: 'LMS platforms, student portals, and admissions systems for modern institutions.' },
  { emoji: '🛍️', name: 'Retail & E-Commerce', desc: 'Omnichannel storefronts with smart inventory, loyalty, and analytics layers.' },
  { emoji: '🏥', name: 'Healthcare', desc: 'Appointment scheduling, patient portals, and HIPAA-conscious data handling.' },
  { emoji: '🚚', name: 'Logistics', desc: 'Real-time fleet tracking, dispatch automation, and route optimisation dashboards.' },
  { emoji: '💳', name: 'Finance', desc: 'Fintech dashboards, payment platforms, and compliance-ready reporting tools.' },
  { emoji: '🏢', name: 'Real Estate', desc: 'Property listing engines, CRM integrations, and virtual tour experiences.' },
];

export default function Industries() {
  return (
    <section className={`section section--muted`} id="industries">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">Industries We Serve</span>
          <h2 className="display-lg" style={{ marginTop: '16px', marginBottom: '14px' }}>
            Built for every vertical that moves fast
          </h2>
          <p className="body-lg">
            Deep domain knowledge lets us ship with context — no hand-holding on what your business actually does.
          </p>
        </div>

        <div className="grid-3">
          {INDUSTRIES.map((ind) => (
            <article key={ind.name} className={`${styles.card}`}>
              <div className={styles.emojiWrap}>{ind.emoji}</div>
              <div className="stack stack--sm">
                <h3 className={styles.name}>{ind.name}</h3>
                <p className="body-sm" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ind.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
