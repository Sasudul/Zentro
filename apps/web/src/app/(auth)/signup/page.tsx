'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Eye, EyeOff, Check } from 'lucide-react';
import Image from 'next/image';
import { OAuthButton } from '@/components/auth/OAuthButton';

export default function SignupPage() {
  const router = useRouter();
  const { register, isRegistering } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await register({ name, email, password });
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#FFFFFF',
      position: 'relative',
      fontFamily: 'var(--font-sans)',
      overflowY: 'auto'
    }}>
      {/* ── TOP BANNER ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '420px',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #2e1065 100%)',
        zIndex: 1
      }} />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1140px',
        margin: '0 auto',
        padding: '48px 24px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '48px'
      }} className="auth-grid-container">
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Header Section (sits inside Banner, so height should align) */}
          <div style={{ minHeight: '372px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Brand Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                <Image src="/logo.png" alt="Zentro Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>ZENTRO</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#00C26B', letterSpacing: '0.15em' }}>EVENT BOOKINGS</span>
              </div>
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-0.02em',
              maxWidth: '520px'
            }}>
              Why choose Zentro for your event ticketing?
            </h2>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Simple, easy-to-use platform',
                'Lowest ticketing fees',
                'Dedicated customer support team',
                'Powerful features'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#00C26B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0
                  }}>
                    <Check style={{ width: '12px', height: '12px', strokeWidth: 4 }} />
                  </div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#FFFFFF' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section (sits on White background) */}
          <div style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#1E293B',
                marginBottom: '24px',
                letterSpacing: '-0.01em'
              }}>
                10,000+ communities and organisers worldwide sell with Zentro
              </p>
              
              {/* Partner Logos Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px 16px',
                alignItems: 'center'
              }}>
                {/* Allison Park Church */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.65 }}>
                  <svg style={{ width: '20px', height: '20px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="7" />
                    <path d="M12 8l3 7h-6z" fill="currentColor" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#1E293B', letterSpacing: '0.02em', fontFamily: 'var(--font-sans)' }}>ALLISON PARK</span>
                    <span style={{ fontSize: '0.45rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.08em' }}>CHURCH</span>
                  </div>
                </div>

                {/* Restitute */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.65 }}>
                  <svg style={{ width: '18px', height: '18px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 21h18M6 21V10l6-6 6 6v11M9 21v-6h6v6" />
                  </svg>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#1E293B', letterSpacing: '0.06em', fontFamily: 'var(--font-sans)' }}>RESTITUTE</span>
                </div>

                {/* Quba Masjid */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.65 }}>
                  <svg style={{ width: '20px', height: '20px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v12M8 12h8M12 8a4 4 0 014 4M12 8a4 4 0 00-4 4" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#1E293B', letterSpacing: '0.02em', fontFamily: 'var(--font-sans)' }}>QUBA</span>
                    <span style={{ fontSize: '0.45rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.08em' }}>MASJID</span>
                  </div>
                </div>

                {/* Product Aotearoa */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.65 }}>
                  <svg style={{ width: '18px', height: '18px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3l9 16H3z" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#1E293B', letterSpacing: '0.02em', fontFamily: 'var(--font-sans)' }}>PRODUCT</span>
                    <span style={{ fontSize: '0.45rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.08em' }}>AOTEAROA</span>
                  </div>
                </div>

                {/* Australia */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.65 }}>
                  <svg style={{ width: '18px', height: '18px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{ fontSize: '0.5rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>IPSC</span>
                    <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#1E293B', letterSpacing: '0.02em', fontFamily: 'var(--font-sans)' }}>AUSTRALIA</span>
                  </div>
                </div>

                {/* The Covey */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.65 }}>
                  <svg style={{ width: '16px', height: '16px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
                  </svg>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#1E293B', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                    THE COVEY
                  </span>
                </div>

                {/* OMF */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.65 }}>
                  <svg style={{ width: '16px', height: '16px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#1E293B', letterSpacing: '0.06em', fontFamily: 'var(--font-sans)' }}>OMF</span>
                </div>

                {/* IPSC */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.65 }}>
                  <svg style={{ width: '16px', height: '16px', color: '#1E293B', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#1E293B', fontFamily: 'var(--font-sans)' }}>IPSC</span>
                    <span style={{ fontSize: '0.4rem', color: '#64748B', fontWeight: 700 }}>AUSTRALIA</span>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: 0 }} />

            {/* Testimonial Block */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '16px', overflow: 'hidden', position: 'relative', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" 
                  alt="Amelie Duggan" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#F59E0B', fontSize: '0.875rem' }}>
                  {Array.from({ length: 5 }).map((_, idx) => <span key={idx}>★</span>)}
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: '#334155', margin: 0, fontWeight: 500 }}>
                  "Fantastic customer service. I called and talked to real people who was patient and friendly."
                </p>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>
                  Amelie Duggan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - FLOATING CARD */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 3 }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            border: '1px solid #F1F5F9'
          }} className="auth-card">
            
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#0F172A',
              margin: 0,
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Create Account
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '6px',
                  color: '#DC2626',
                  fontSize: '0.8125rem',
                  lineHeight: 1.4
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="name" style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1E293B' }}>
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isRegistering}
                  required
                  style={{
                    height: '42px',
                    fontSize: '0.875rem',
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    outline: 'none',
                    transition: 'border-color 150ms ease, box-shadow 150ms ease'
                  }}
                  className="auth-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1E293B' }}>
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isRegistering}
                  required
                  style={{
                    height: '42px',
                    fontSize: '0.875rem',
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    outline: 'none',
                    transition: 'border-color 150ms ease, box-shadow 150ms ease'
                  }}
                  className="auth-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="password" style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1E293B' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isRegistering}
                    required
                    style={{
                      height: '42px',
                      fontSize: '0.875rem',
                      padding: '0 40px 0 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      width: '100%',
                      outline: 'none',
                      transition: 'border-color 150ms ease, box-shadow 150ms ease'
                    }}
                    className="auth-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                  >
                    {showPassword ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: '#00C26B',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'background-color 150ms ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#00A85D'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00C26B'}
                disabled={isRegistering}
              >
                {isRegistering ? 'Registering...' : 'Sign Up'}
              </button>
            </form>

            {/* Social Authentications (Only Google & GitHub!) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
                <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #E2E8F0' }} />
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>Or, Sign up with</span>
                <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #E2E8F0' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <OAuthButton provider="google" label="Google" />
                <OAuthButton provider="github" label="GitHub" />
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#00C26B', fontWeight: 700, textDecoration: 'none' }}>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .auth-input:focus {
          border-color: #00C26B !important;
          box-shadow: 0 0 0 2px rgba(0, 194, 107, 0.15) !important;
        }
        @media (max-width: 768px) {
          .auth-grid-container {
            grid-template-columns: 1fr !important;
            padding: 24px 16px !important;
            gap: 32px !important;
          }
          .auth-card {
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
