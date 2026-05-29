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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Welcome back.</h1>
          <p className="text-muted-foreground">Log in to save events and manage your profile.</p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <OAuthButton provider="google" label="Continue with Google" />
          <OAuthButton provider="github" label="Continue with GitHub" />
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="text-accent hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
