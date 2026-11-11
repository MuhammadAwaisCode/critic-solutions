'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Trash2, 
  LogOut, 
  Star, 
  Filter, 
  RefreshCw, 
  User, 
  Building, 
  Mail,
  Clock
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchReviews();
      } else {
        const data = await res.json();
        setLoginError(data.error || 'Invalid password');
      }
    } catch (err) {
      setLoginError('Login request failed');
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id, newStatus) => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter reviews by selected tab
  const filteredReviews = reviews.filter((r) => r.status === activeTab);

  const statusCounts = {
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    quarantined: reviews.filter((r) => r.status === 'quarantined').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
    spam: reviews.filter((r) => r.status === 'spam').length,
  };

  // ── Login Screen ───────────────────────────────────────────
  if (!isAuthenticated && !loading) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginHeader}>
            <div className={styles.shieldIconWrapper}>
              <ShieldCheck size={32} className={styles.shieldIcon} />
            </div>
            <h2>Admin Portal</h2>
            <p>Enter your master security key to manage reviews</p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Admin Secret Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loginError && <p className={styles.errorText}>{loginError}</p>}

            <button type="submit" className={styles.loginBtn}>
              Authenticate Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin Dashboard Screen ──────────────────────────────────
  return (
    <div className={styles.dashboardLayout}>
      <header className={styles.topHeader}>
        <div className={styles.headerTitle}>
          <ShieldCheck size={26} />
          <h1>Review Management Center</h1>
        </div>
        <div className={styles.headerActions}>
          <button onClick={fetchReviews} className={styles.refreshBtn} title="Refresh Data">
            <RefreshCw size={18} className={loading ? styles.spinning : ''} />
          </button>
          <button onClick={() => window.location.reload()} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Exit</span>
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        {/* Status Tabs */}
        <div className={styles.tabsBar}>
          {[
            { id: 'pending', label: 'Pending', icon: Clock, count: statusCounts.pending },
            { id: 'approved', label: 'Approved', icon: CheckCircle, count: statusCounts.approved },
            { id: 'quarantined', label: 'Quarantined (AI)', icon: AlertTriangle, count: statusCounts.quarantined },
            { id: 'rejected', label: 'Rejected', icon: XCircle, count: statusCounts.rejected },
            { id: 'spam', label: 'Spam', icon: Trash2, count: statusCounts.spam },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                <span className={styles.badge}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Reviews List */}
        <div className={styles.listContainer}>
          {filteredReviews.length === 0 ? (
            <div className={styles.emptyState}>
              <Filter size={40} />
              <p>No reviews found under <strong>{activeTab}</strong> status.</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.reviewerMeta}>
                    <div className={styles.metaItem}>
                      <User size={15} />
                      <strong>{review.reviewer_name}</strong>
                    </div>
                    {review.company_name && (
                      <div className={styles.metaItem}>
                        <Building size={15} />
                        <span>{review.company_name}</span>
                      </div>
                    )}
                    <div className={styles.metaItem}>
                      <Mail size={15} />
                      <span>{review.reviewer_email}</span>
                    </div>
                  </div>

                  <div className={styles.ratingStars}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? styles.starGold : styles.starGray}
                      />
                    ))}
                  </div>
                </div>

                {review.review_title && (
                  <h4 className={styles.reviewTitle}>{review.review_title}</h4>
                )}

                <p className={styles.reviewText}>"{review.review_text}"</p>

                <div className={styles.cardFooter}>
                  <span className={styles.dateText}>
                    Submitted: {new Date(review.submitted_at).toLocaleDateString()}
                  </span>

                  <div className={styles.actionButtons}>
                    {activeTab !== 'approved' && (
                      <button
                        onClick={() => updateReviewStatus(review.id, 'approved')}
                        disabled={actionLoading === review.id}
                        className={styles.approveBtn}
                      >
                        <CheckCircle size={16} /> Approve & Publish
                      </button>
                    )}

                    {activeTab !== 'rejected' && (
                      <button
                        onClick={() => updateReviewStatus(review.id, 'rejected')}
                        disabled={actionLoading === review.id}
                        className={styles.rejectBtn}
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    )}

                    {activeTab !== 'spam' && (
                      <button
                        onClick={() => updateReviewStatus(review.id, 'spam')}
                        disabled={actionLoading === review.id}
                        className={styles.spamBtn}
                      >
                        <Trash2 size={16} /> Mark Spam
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}