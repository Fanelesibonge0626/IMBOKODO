'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('AdminGuard: Checking admin session...');
    
    // Check admin session
    const adminSession = localStorage.getItem('shecare-admin-session');
    console.log('AdminGuard: Raw admin session:', adminSession);
    
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        console.log('AdminGuard: Parsed session:', session);
        console.log('AdminGuard: isAdmin check:', session.isAdmin);
        console.log('AdminGuard: clinic check:', session.clinic);
        console.log('AdminGuard: Expected clinic:', 'Durban Women\'s Health Clinic');
        
        if (session.isAdmin && session.clinic === 'Durban Women\'s Health Clinic') {
          console.log('AdminGuard: Admin access granted');
          setIsAdmin(true);
        } else {
          console.log('AdminGuard: Invalid session, redirecting to admin login');
          // Clear invalid session
          localStorage.removeItem('shecare-admin-session');
          // Invalid session, redirect to admin login
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('AdminGuard: Error parsing session:', error);
        // Clear invalid session
        localStorage.removeItem('shecare-admin-session');
        // Invalid session data, redirect to admin login
        router.push('/admin/login');
      }
    } else {
      console.log('AdminGuard: No admin session found, redirecting to admin login');
      // No admin session, redirect to admin login
      router.push('/admin/login');
    }
    
    setIsLoading(false);
  }, [router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show content only if authenticated as admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-red-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-lock text-red-600 text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in as an administrator to access this page.
          </p>
          <div className="space-y-3">
            <Link
              href="/admin/login"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all inline-block"
            >
              Admin Login
            </Link>
            <Link
              href="/dashboard"
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all inline-block"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
