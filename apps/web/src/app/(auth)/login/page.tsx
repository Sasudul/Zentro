'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Eye, EyeOff, Check } from 'lucide-react';
import Image from 'next/image';
import { OAuthButton } from '@/components/auth/OAuthButton';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await login({ email, password });
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password.');
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

          {/* Image Showcase Section */}
          <div style={{
            marginTop: '48px',
            position: 'relative',
            width: '100%',
            flexGrow: 1,
            minHeight: '300px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
              alt="Exciting event"
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '32px'
            }}>
              <span style={{
                color: '#00C26B',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                Experience the Energy
              </span>
              <p style={{
                color: '#FFFFFF',
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '400px'
              }}>
                Join thousands of tech enthusiasts and discover your next favorite event in Sri Lanka.
              </p>
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
              Log In
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
                <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1E293B' }}>
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoggingIn}
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
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

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="remember"
                    style={{ width: '16px', height: '16px', accentColor: '#00C26B', cursor: 'pointer' }}
                  />
                  <label htmlFor="remember" style={{ fontSize: '0.8125rem', color: '#475569', cursor: 'pointer', userSelect: 'none' }}>
                    Remember me
                  </label>
                </div>
                <Link href="/" style={{ fontSize: '0.8125rem', color: '#00C26B', textDecoration: 'none', fontWeight: 600 }}>
                  Forgot password?
                </Link>
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
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging In...' : 'Log In'}
              </button>
            </form>

            {/* Social Authentications (Only Google & GitHub!) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
                <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #E2E8F0' }} />
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>Or, Sign in with</span>
                <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #E2E8F0' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <OAuthButton provider="google" label="Google" />
                <OAuthButton provider="github" label="GitHub" />
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
              New here?{' '}
              <Link href="/signup" style={{ color: '#00C26B', fontWeight: 700, textDecoration: 'none' }}>
                Sign Up
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
