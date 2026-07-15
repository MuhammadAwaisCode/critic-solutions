'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AIFeatures.module.css';
import { useLang } from '../../context/LangContext';

/* ─── Markdown-lite renderer (unchanged) ─────────────────────── */
function renderText(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

/* ─── Typing Indicator (unchanged) ───────────────────────────── */
function TypingIndicator() {
  return (
    <div className={`${styles.chatBubble} ${styles.chatAI}`}>
      <span className={styles.typingDots}>
        <span /><span /><span />
      </span>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function AIFeatures() {
  const { t } = useLang();
  const cb = t.chatbot; // shorthand

  const makeInitial = useCallback(
    () => [{ id: 1, role: 'ai', text: cb.initialMessage }],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cb.initialMessage]
  );

  const [messages, setMessages]     = useState(makeInitial);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping]     = useState(false);
  const chatEndRef = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    setMessages(makeInitial());
    setInputValue('');
    setIsTyping(false);
  }, [makeInitial]);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


  const getResponse = useCallback(
    (input) => {
      const lower = input.toLowerCase().trim();
      for (const entry of cb.faqs) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
      
          return `${entry.response}\n\n---\n${cb.furtherInfo}`;
        }
      }
  
      return `${cb.fallback}\n\n---\n${cb.furtherInfo}`;
    },
    [cb.faqs, cb.fallback, cb.furtherInfo]
  );

  
  const sendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setInputValue('');

    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);

    await Promise.resolve();
    setIsTyping(true);

    const delay = 400 + Math.random() * 500;
    await new Promise((res) => setTimeout(res, delay));

    const aiMsg = { id: Date.now() + 1, role: 'ai', text: getResponse(text) };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);

    inputRef.current?.focus();
  }, [inputValue, isTyping, getResponse]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <section className="section section--dark" id="ai-features">
      <div className="container">
        <div className="split split--40-60">
          <div className="stack stack--lg">
            <span className="tag-badge tag-badge--dark">{cb.badge}</span>
            <h2 className="display-lg" style={{ color: 'var(--text-invert)' }}>
              {cb.headline1}<br />
              <em className={styles.em}>{cb.headlineEm}</em>
            </h2>
            <p className="body-lg" style={{ color: 'rgba(247,246,243,0.65)' }}>
              {cb.body}
            </p>

            <ul className="stack stack--sm">
              {cb.features.map((f) => (
                <li key={f} className={styles.featureItem}>
                  <span className={styles.tick}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href="#pricing" className="btn btn-invert" style={{ alignSelf: 'flex-start' }}>
              {cb.deployBtn}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* ── Right: Live AI Chatbot (unchanged structure) ── */}
          <div className={styles.mockup}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupTitle}>
                <div className={styles.aiDot} />
                <span className="label" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
                  {cb.assistantTitle}
                </span>
              </div>
              <span className={styles.statusBadge}>{cb.liveStatus}</span>
            </div>

            <div className={styles.mockupBody}>
              <div className={styles.chatWindow}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.chatBubble} ${msg.role === 'ai' ? styles.chatAI : styles.chatUser}`}
                  >
                    <p>{renderText(msg.text)}</p>
                  </div>
                ))}

                {isTyping && <TypingIndicator />}
                <div ref={chatEndRef} />
              </div>

              {/* Metrics row */}
              <div className={styles.metricRow}>
                {cb.metrics.map(([k, v]) => (
                  <div key={k} className={styles.metricCell}>
                    <span className={styles.metricV}>{v}</span>
                    <span className={styles.metricK}>{k}</span>
                  </div>
                ))}
              </div>

              {/* Live input row */}
              <div className={styles.inputRow}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={cb.inputPlaceholder}
                  className={styles.aiInput}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  autoComplete="off"
                />
                <button
                  className={styles.sendBtn}
                  onClick={sendMessage}
                  disabled={isTyping || !inputValue.trim()}
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2L2 7l5 2 2 5 5-12z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
