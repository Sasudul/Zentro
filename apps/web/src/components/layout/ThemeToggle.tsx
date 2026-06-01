'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      style={{
        background: 'var(--color-navbar-pill-bg)',
        border: '1px solid var(--color-navbar-border)',
        borderRadius: '8px',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-navbar-text)',
        transition: 'background-color 150ms ease, color 150ms ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-navbar-pill-bg)';
      }}
    >
      {theme === 'light' ? (
        <Moon style={{ width: '16px', height: '16px', color: 'var(--color-navbar-text)' }} />
      ) : (
        <Sun style={{ width: '16px', height: '16px', color: '#FBBF24' }} />
      )}
    </button>
  );
}
