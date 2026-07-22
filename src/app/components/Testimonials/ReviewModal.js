'use client';
import { useState } from 'react';
import { useLang } from '../../context/LangContext';

export default function ReviewModal({ isOpen, onClose }) {
  const { t } = useLang();
  const rm = t?.reviewModal || {}; 

  const [formData, setFormData] = useState({ name: '', designation: '', rating: 5, message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handlePostAnother = () => {
    setFormData({ name: '', designation: '', rating: 5, message: '' });
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(rm.errorSomethingWentWrong || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert(rm.errorNetwork || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', 
      backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', zIndex: 9999, padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        maxWidth: '450px', width: '100%', padding: '1.5rem', color: '#000'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
            {rm.title || 'Write a Review'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9CA3AF' }}>&times;</button>
        </div>
        
        {submitted ? (
          /* --- SUCCESS STATE --- */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: '#DCFCE7', color: '#16A34A', marginBottom: '1rem'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
              {rm.thankYou || 'Thank You!'}
            </h4>
            <p style={{ color: '#4B5563', fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>
              {rm.successMessage || 'Your review has been submitted successfully.'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button 
                type="button"
                onClick={handlePostAnother} 
                style={{ 
                  backgroundColor: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', 
                  padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: '500'
                }}
              >
                {rm.postAnother || 'Post Another'}
              </button>

              <button 
                type="button"
                onClick={onClose} 
                style={{ 
                  backgroundColor: '#4F46E5', color: '#fff', border: 'none', 
                  padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: '500' 
                }}
              >
                {rm.close || 'Close'}
              </button>
            </div>

          </div>
        ) : (
          /* --- FORM STATE --- */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Name Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', color: '#374151' }}>
                {rm.nameLabel || 'Name'}
              </label>
              <input 
                required 
                type="text" 
                placeholder={rm.namePlaceholder || 'Enter your name'}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', outline: 'none', color: '#111827', backgroundColor: '#fff' }} 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            {/* Designation Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', color: '#374151' }}>
                {rm.designationLabel || 'Designation'} <span style={{ color: '#9CA3AF', fontSize: '0.75rem', fontWeight: '400' }}>{rm.optional || '(Optional)'}</span>
              </label>
              <input 
                type="text" 
                placeholder={rm.designationPlaceholder || 'e.g. Software Engineer'}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', outline: 'none', color: '#111827', backgroundColor: '#fff' }} 
                value={formData.designation} 
                onChange={(e) => setFormData({...formData, designation: e.target.value})} 
              />
            </div>

            {/* Rating Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', color: '#374151' }}>
                {rm.ratingLabel || 'Rating'}
              </label>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setFormData({ ...formData, rating: num })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={num <= formData.rating ? "#FBBF24" : "#E5E7EB"}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Review Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', color: '#374151' }}>
                {rm.yourReviewLabel || 'Your Review'}
              </label>
              <textarea 
                required 
                rows="4" 
                placeholder={rm.reviewPlaceholder || 'Write your review here...'}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', outline: 'none', resize: 'none', color: '#111827', backgroundColor: '#fff' }} 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} style={{
              backgroundColor: loading ? '#9CA3AF' : '#4F46E5', color: '#fff', border: 'none', 
              padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}>
              {loading ? (rm.submitting || 'Submitting...') : (rm.submit || 'Submit Review')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}