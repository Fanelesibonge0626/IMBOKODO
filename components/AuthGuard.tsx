'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useFirebase } from '../hooks/useFirebase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useFirebase();

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth'];

  useEffect(() => {
    // Check if current route is public
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // If not loading and no user, redirect to auth page
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [pathname, router, user, loading]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show content only if authenticated or on public route
  if (!user && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}