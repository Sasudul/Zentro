'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ChevronDown, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState({ code: 'SL', name: 'Sri Lanka', flag: '🇱🇰' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const countries = [
    { code: 'SL', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
  ];

  return (
    <nav className="navbar" style={{ backgroundColor: 'var(--color-navbar)', borderBottom: '1px solid var(--color-navbar-border)', transition: 'background-color 200ms ease, border-color 200ms ease' }}>
      <div className="navbar-inner" style={{ height: '70px' }}>
        {/* ZENTRO Logo block */}
        <Link href="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', textDecoration: 'none' }}>
          <div style={{
            width: '32px',
            height: '32px',
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Image 
              src="/logo.png" 
              alt="Zentro Logo" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-navbar-logo-text)', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)', transition: 'color 200ms ease' }}>ZENTRO</span>
            <span style={{ fontSize: '0.55rem', fontWeight: 700, color: 'var(--color-green-brand)', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)' }}>EVENT BOOKINGS</span>
          </div>
        </Link>

        {/* Corporate Middle Links */}
        <div className="navbar-links" style={{ display: 'none', gap: 'var(--space-20)', alignItems: 'center' }}>
          <Link href="/features" style={{ color: 'var(--color-navbar-link)', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, transition: 'color 200ms ease' }}>Features</Link>
          <Link href="/enterprise" style={{ color: 'var(--color-navbar-link)', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, transition: 'color 200ms ease' }}>Enterprise</Link>
          <Link href="/#explore" style={{ color: 'var(--color-navbar-link)', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, transition: 'color 200ms ease' }}>Explore Events</Link>
          
          {/* Help Dropdown selector */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--color-navbar-link)', fontSize: '0.8125rem', fontWeight: 600, userSelect: 'none', transition: 'color 200ms ease' }}
            >
              <span>Help</span>
              <ChevronDown style={{ width: '12px', height: '12px', opacity: 0.8, transform: isHelpOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }} />
            </div>

            {isHelpOpen && (
              <>
                <div onClick={() => setIsHelpOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }} />
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: 0,
                  backgroundColor: 'var(--color-navbar)',
                  border: '1px solid var(--color-navbar-border)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 1000,
                  minWidth: '160px',
                  overflow: 'hidden',
                  padding: '4px 0',
                  transition: 'background-color 200ms ease, border-color 200ms ease'
                }}>
                  <a href="mailto:support@zentro.com" style={{ display: 'block', padding: '10px 16px', color: 'var(--color-navbar-text)', fontSize: '0.8125rem', textDecoration: 'none', cursor: 'pointer', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.08)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    Email Support
                  </a>
                  <a href="#explore" style={{ display: 'block', padding: '10px 16px', color: 'var(--color-navbar-text)', fontSize: '0.8125rem', textDecoration: 'none', cursor: 'pointer', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.08)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setIsHelpOpen(false)}>
                    FAQ & Guides
                  </a>
                  <a href="#explore" style={{ display: 'block', padding: '10px 16px', color: 'var(--color-navbar-text)', fontSize: '0.8125rem', textDecoration: 'none', cursor: 'pointer', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.08)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={() => setIsHelpOpen(false)}>
                    Terms of Use
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Actions side */}
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-navbar-text)', fontWeight: 500, transition: 'color 200ms ease' }}>
                Signed in as <span style={{ color: 'var(--color-green-brand)', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
              </span>
              <button 
                onClick={() => logout()} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--color-navbar-link)', 
                  fontSize: '0.8125rem', 
                  cursor: 'pointer',
                  fontWeight: 500,
                  padding: 0,
                  transition: 'color 200ms ease'
                }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              style={{ 
                fontSize: '0.8125rem', 
                color: 'var(--color-navbar-text)', 
                fontWeight: 600, 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                transition: 'color 200ms ease'
              }}
            >
              <span>Sign In</span>
              <ChevronDown style={{ width: '12px', height: '12px', opacity: 0.7 }} />
            </Link>
          )}

          <Link href="/events/create" className="btn" style={{
            backgroundColor: 'var(--color-green-brand)',
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            fontWeight: 600,
            height: '36px',
            borderRadius: '4px',
            padding: '0 var(--space-16)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-8)',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'background-color 150ms ease'
          }}>
            <Calendar style={{ width: '14px', height: '14px' }} />
            <span>Create Event</span>
          </Link>

          {/* Country flag dropdown select selector */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                color: 'var(--color-navbar-text)', 
                fontSize: '0.8125rem', 
                fontWeight: 500, 
                cursor: 'pointer',
                backgroundColor: 'var(--color-navbar-pill-bg)',
                padding: '6px 12px',
                borderRadius: '6px',
                userSelect: 'none',
                transition: 'background-color 200ms ease, color 200ms ease'
              }}
            >
              <span style={{ fontSize: '1rem' }}>{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
              <ChevronDown style={{ width: '12px', height: '12px', opacity: 0.7, transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }} />
            </div>

            {isDropdownOpen && (
              <>
                <div onClick={() => setIsDropdownOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }} />
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  backgroundColor: 'var(--color-navbar)',
                  border: '1px solid var(--color-navbar-border)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 1000,
                  minWidth: '150px',
                  overflow: 'hidden',
                  padding: '4px 0',
                  transition: 'background-color 200ms ease, border-color 200ms ease'
                }}>
                  {countries.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        color: selectedCountry.code === c.code ? 'var(--color-green-brand)' : 'var(--color-navbar-text)',
                        fontSize: '0.8125rem',
                        cursor: 'pointer',
                        transition: 'background-color 100ms ease, color 100ms ease',
                        backgroundColor: selectedCountry.code === c.code ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCountry.code !== c.code) {
                          e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCountry.code !== c.code) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{c.flag}</span>
                      <span style={{ fontWeight: selectedCountry.code === c.code ? 700 : 500 }}>{c.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme toggler for Dark/Light mode selection */}
          <ThemeToggle />
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .navbar-links {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
