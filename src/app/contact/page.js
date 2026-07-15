'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './contact.module.css';
import { useLang } from '../context/LangContext';

const INITIAL = { firstName: '', lastName: '', email: '', message: '' };

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
                  <span className={styles.infoIcon}></span>
                  <div>
                    <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{c.emailLabel}</p>
                    <a href="mailto:criticpickindustries@gmail.com" className={styles.infoLink}>criticpickindustries@gmail.com</a>
                  </div>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoIcon}></span>
                  <div>
                    <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{c.whatsappLabel}</p>
                    <a href="https://wa.me/923019465427" className={styles.infoLink}>+92 301 946 5427</a>
                  </div>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoIcon}></span>
                  <div>
                    <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{c.locationLabel}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>{c.locationValue}</p>
                  </div>
                </div>
                <hr className="divider" />
                <div>
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
                  <p className="body-lg" style={{ textAlign: 'center' }}>{c.successBody}</p>
                  <button className="btn btn-dark" onClick={() => setStatus('idle')}>{c.sendAnother}</button>
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
