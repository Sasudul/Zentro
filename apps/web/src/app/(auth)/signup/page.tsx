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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Join PULSE.</h1>
          <p className="text-muted-foreground">Create an account to start curating your event experience.</p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <OAuthButton provider="google" label="Sign up with Google" />
          <OAuthButton provider="github" label="Sign up with GitHub" />
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:underline font-medium">
            Log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
