'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Admin credentials (in production, this would be in a secure database)
  const ADMIN_CREDENTIALS = {
    email: 'admin@durbanwomensclinic.co.za',
    password: 'admin123'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check admin credentials
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Set admin session
        localStorage.setItem('shecare-admin-session', JSON.stringify({
          isAdmin: true,
          email: email,
          clinic: 'Durban Women\'s Health Clinic',
          loginTime: new Date().toISOString()
        }));

        // Redirect to admin dashboard
        router.push('/admin/durban-womens-clinic');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-purple-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-hospital text-purple-600 text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">
            Access Durban Women's Clinic Administrative Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter admin email"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter admin password"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login as Admin'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Admin Credentials Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Demo Admin Credentials:</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Email:</strong> admin@durbanwomensclinic.co.za</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: These are demo credentials for testing purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
