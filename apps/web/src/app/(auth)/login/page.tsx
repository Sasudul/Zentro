import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { OAuthButton } from '@/components/auth/OAuthButton';
import Link from 'next/link';

export const metadata = {
  title: 'Log In | PULSE',
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div>
        <h1 className="auth-heading">Welcome back.</h1>
        <p className="auth-subheading">Log in to save events and manage your profile.</p>
      </div>

      <div className="auth-buttons">
        <OAuthButton provider="google" label="Continue with Google" />
        <OAuthButton provider="github" label="Continue with GitHub" />
      </div>

      <div className="auth-footer">
        Don&apos;t have an account?{' '}
        <Link href="/signup">Sign up</Link>
      </div>
    </AuthLayout>
  );
}
