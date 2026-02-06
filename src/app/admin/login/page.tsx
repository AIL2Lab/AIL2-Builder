'use client';

import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-[#010101] flex items-center justify-center px-4">
      <div className="max-w-md w-full animate-pulse">
        <div className="h-16 w-16 bg-[#222] rounded-full mx-auto mb-8"></div>
        <div className="h-8 bg-[#222] rounded mb-4 mx-auto w-1/2"></div>
        <div className="space-y-4">
          <div className="h-12 bg-[#222] rounded-xl"></div>
          <div className="h-12 bg-[#222] rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
