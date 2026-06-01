'use client';

import React from 'react';
import { ShieldCheck, Cpu, Globe, Users2, FileText, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

export default function EnterprisePage() {
  return (
    <div style={{ padding: 'var(--space-64) 0', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
      {/* Hero section */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-64)' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          backgroundColor: 'var(--color-accent-light)',
          padding: '6px 12px',
          borderRadius: '20px',
        }}>
          Zentro Enterprise
        </span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginTop: 'var(--space-20)',
          marginBottom: 'var(--space-16)',
          letterSpacing: '-0.02em',
        }}>
          Scale your large-scale ticketing operations
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '650px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Secure, stable, and highly-scalable event infrastructure for Sri Lanka\'s largest conferences, trade shows, festivals, and corporate organizers.
        </p>
      </div>

      {/* Highlights Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-32)',
        marginBottom: 'var(--space-64)',
      }}>
        {/* Highlight 1 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-green-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Premium Security &amp; Compliance</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Enterprise-grade data security with full SOC2 compliance, advanced encryption, secure database partitioning, and strict localized payment gateways.
          </p>
        </div>

        {/* Highlight 2 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <Cpu size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Developer API &amp; Webhooks</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Integrate ticket flows into your CRM, website, or custom native mobile applications using our high-speed, well-documented REST APIs and event-driven webhooks.
          </p>
        </div>

        {/* Highlight 3 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <Globe size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Custom Domains &amp; Branding</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Keep your brand front and center. Host ticket stores on your own custom subdomain (e.g., tickets.yourcompany.com) with 100% white-label configurations.
          </p>
        </div>

        {/* Highlight 4 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-green-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <Users2 size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Dedicated Account Managers</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Never go at it alone. Our dedicated Sri Lankan operations team provides on-site check-in coordination, custom plan setup, and 24/7 priority hotlines.
          </p>
        </div>

        {/* Highlight 5 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <FileText size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Uptime SLAs &amp; High Capacity</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Rest easy with a 99.9% application availability SLA. Our serverless architecture automatically scales to handle tens of thousands of simultaneous ticket purchasers.
          </p>
        </div>

        {/* Highlight 6 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <BadgeCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Advanced Access Control</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Assign different team roles (Manager, Gate Staff, Accountant) with granular permission bounds, ensuring safe, auditable event governance.
          </p>
        </div>
      </div>

      {/* Enterprise Contact block */}
      <div style={{
        backgroundColor: '#0d2c31',
        borderRadius: '24px',
        padding: 'var(--space-48) var(--space-32)',
        textAlign: 'center',
        color: '#FFFFFF',
      }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-12)' }}>
          Let\'s discuss your ticketing goals
        </h2>
        <p style={{ opacity: 0.8, maxWidth: '500px', margin: '0 auto var(--space-24) auto', lineHeight: 1.6 }}>
          Reach out to our enterprise experts for custom quote integrations, demo run-throughs, or localized integration setups.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center' }}>
          <a href="mailto:enterprise@zentro.events" style={{
            backgroundColor: 'var(--color-green-brand)',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'opacity 150ms ease',
          }}>
            Contact Sales
          </a>
          <Link href="/features" style={{
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.875rem',
          }}>
            Platform Features
          </Link>
        </div>
      </div>
    </div>
  );
}
