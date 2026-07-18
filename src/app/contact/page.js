'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './contact.module.css';
import { useLang } from '../context/LangContext';

const INITIAL = { firstName: '', lastName: '', email: '', message: '' };

// Clean Vector Icons for High-End Contact Details
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ContactPage() {
  const { t } = useLang();
  const c = t.contact; // shorthand

  const [form, setForm]       = useState(INITIAL);
  const [status, setStatus]   = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get('content-type');
      let data = {};
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.error || `Server Error: Status ${res.status}`);
      }

      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      console.error('Form Submission Error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <span className="tag-badge tag-badge--accent">{c.badge}</span>
            <h1 className={`display-xl ${styles.headline}`}>{c.headline}</h1>
            <p className="body-lg" style={{ maxWidth: '520px', margin: '0 auto' }}>
              {c.sub}
            </p>
          </div>

          <div className={styles.layout}>
            <aside className={styles.info}>
              <div className={`card stack stack--md ${styles.infoCard}`}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoIcon}>
                    <EmailIcon />
                  </span>
                  <div>
                    <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{c.emailLabel}</p>
                    <a href="mailto:criticpickindustries@gmail.com" className={styles.infoLink}>criticpickindustries@gmail.com</a>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.infoIcon}>
                    <WhatsAppIcon />
                  </span>
                  <div>
                    <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{c.whatsappLabel}</p>
                    <a href="https://wa.me/923019465427" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>+92 301 946 5427</a>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.infoIcon}>
                    <LocationIcon />
                  </span>
                  <div>
                    <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{c.locationLabel}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>{c.locationValue}</p>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.responseTimeSection}>
                  <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>{c.responseTimeLabel}</p>
                  <div className={styles.badge}><span className={styles.dot} />{c.responseTimeValue}</div>
                </div>
              </div>
            </aside>

            <div className={styles.formWrap}>
              {status === 'success' ? (
                <div className={`card ${styles.successCard}`}>
                  <div className={styles.successIcon}>✓</div>
                  <h2 className={styles.successTitle}>{c.successTitle}</h2>
                  <p className="body-lg" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{c.successBody}</p>
                  <button className="btn btn-dark" style={{ marginTop: '12px' }} onClick={() => setStatus('idle')}>{c.sendAnother}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={`card stack stack--md ${styles.form}`} noValidate>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="firstName">
                        {c.firstNameLabel} <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="firstName" name="firstName" type="text"
                        className={styles.input}
                        placeholder={c.firstNamePlaceholder}
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="lastName">
                        {c.lastNameLabel} <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="lastName" name="lastName" type="text"
                        className={styles.input}
                        placeholder={c.lastNamePlaceholder}
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      {c.emailFieldLabel} <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="email" name="email" type="email"
                      className={styles.input}
                      placeholder={c.emailPlaceholder}
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">
                      {c.messageLabel} <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="message" name="message"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder={c.messagePlaceholder}
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      disabled={status === 'loading'}
                    />
                  </div>

                  {status === 'error' && (
                    <div className={styles.errorBanner}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                      </svg>
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn btn-dark ${styles.submitBtn}`}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <><span className={styles.spinner} />{c.sendingButton}</>
                    ) : (
                      <>
                        {c.sendButton}
                        <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h10M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}