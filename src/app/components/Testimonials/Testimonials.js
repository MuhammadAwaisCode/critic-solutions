'use client';

import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';
import ReviewModal from './ReviewModal';

// Crisp Vector Star Icon
const StarIcon = ({ filled = true }) => (
  <svg 
    className={styles.starSvg} 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "#cbd5e1"}
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// Helper for generating avatar color based on name
const AVATAR_COLORS = ['#4F46E5', '#0D9488', '#D97706', '#2563EB', '#7C3AED', '#DB2777'];

function getInitials(name = '') {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CS';
}

export default function Testimonials({ t }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveReviews, setLiveReviews] = useState([]);

  // Fetch approved reviews from Supabase API
  useEffect(() => {
    async function fetchPublishedReviews() {
      try {
        const res = await fetch('/api/reviews/published');
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            const formatted = data.reviews.map((rev, idx) => ({
              id: rev.id,
              name: rev.reviewer_name,
              role: rev.company_name || 'Verified Client',
              quote: rev.review_text,
              rating: rev.rating || 5,
              initials: getInitials(rev.reviewer_name),
              color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
            }));
            setLiveReviews(formatted);
          }
        }
      } catch (err) {
        console.error('Failed to fetch live reviews:', err);
      }
    }

    fetchPublishedReviews();
  }, []);

  // Merge live approved reviews at top + fallback static i18n list
  const displayList = [...liveReviews, ...(t?.list || [])];

  return (
    <section className="section section--muted" id="testimonials">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{t?.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {t?.headline}
          </h2>
        </div>

        <div className={styles.grid}>
          {displayList.map((r, index) => {
            const cardKey = r.id || `${r.name}-${index}`;
            const ratingCount = r.rating || 5;

            return (
              <article key={cardKey} className={`${styles.card} card`}>
                <div className={styles.topInfo}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < ratingCount} />
                    ))}
                  </div>
                  <blockquote className={styles.quote}>“{r.quote}”</blockquote>
                </div>

                <div className={styles.author}>
                  <div className={styles.avatar} style={{ backgroundColor: r.color || '#4F46E5' }}>
                    {r.initials || getInitials(r.name)}
                  </div>
                  <div className={styles.authorMeta}>
                    <p className={styles.name}>{r.name}</p>
                    <p className={`body-sm ${styles.role}`}>{r.role}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* --- WRITE A REVIEW BUTTON --- */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            {t?.reviewPrompt || "Loved our service? Share your experience with us!"}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#4F46E5',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338CA'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
          >
            {t?.writeReviewBtn || "Write a Review"}
          </button>
        </div>
      </div>

      {/* Review Popup Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}