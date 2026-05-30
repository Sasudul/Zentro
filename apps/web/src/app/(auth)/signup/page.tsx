import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { OAuthButton } from '@/components/auth/OAuthButton';
import Link from 'next/link';

export const metadata = {
  title: 'Sign Up | PULSE',
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <div>
        <h1 className="auth-heading">Join PULSE.</h1>
        <p className="auth-subheading">Create an account to start curating your event experience.</p>
      </div>

      <div className="auth-buttons">
        <OAuthButton provider="google" label="Sign up with Google" />
        <OAuthButton provider="github" label="Sign up with GitHub" />
      </div>

      <div className="auth-footer">
        Already have an account?{' '}
        <Link href="/login">Log in</Link>
      </div>
    </AuthLayout>
  );
}
