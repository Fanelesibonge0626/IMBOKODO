'use client';

import { useState } from 'react';
import { useFirebase } from '../hooks/useFirebase';
import { useRouter } from 'next/navigation';

export default function FirebaseAuth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signUp } = useFirebase();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form event:', e);
    console.log('Current state - isSignUp:', isSignUp, 'email:', email, 'password:', password);
    
    setLoading(true);
    setError('');

    try {
      console.log('Starting authentication process...');
      
      if (isSignUp) {
        console.log('Attempting signup...');
        const result = await signUp(email, password, { name });
        console.log('Signup result:', result);
        
        if (result.success) {
          console.log('Signup successful, redirecting...');
          router.push('/dashboard');
        } else {
          console.error('Signup failed:', result.error);
          setError(result.error || 'Signup failed. Please try again.');
        }
      } else {
        console.log('Attempting signin...');
        
        // Check if this is an admin login (automatic detection)
        const ADMIN_CREDENTIALS = {
          email: 'admin@durbanwomensclinic.co.za',
          password: 'admin123'
        };
        
        console.log('Checking credentials...');
        console.log('Input email:', email);
        console.log('Input password:', password);
        
        // Check if admin credentials are used
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          console.log('Admin login detected, setting admin session...');
          
          try {
            // Set admin session
            const adminSession = {
              isAdmin: true,
              email: email,
              clinic: 'Durban Women\'s Health Clinic',
              loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('shecare-admin-session', JSON.stringify(adminSession));
            console.log('Admin session set successfully:', adminSession);
            
            // Clear any existing errors
            setError('');
            
            // Redirect immediately without delay
            console.log('Redirecting to admin panel...');
            window.location.href = '/admin/durban-womens-clinic';
            
            return;
          } catch (error) {
            console.error('Error setting admin session:', error);
            setError('Failed to set admin session. Please try again.');
            return;
          }
        } else {
          console.log('Regular user credentials, proceeding with Firebase authentication...');
          
          // Regular user authentication
          const result = await signIn(email, password);
          console.log('Signin result:', result);
          
          if (result.success) {
            console.log('Signin successful, redirecting...');
            router.push('/dashboard');
          } else {
            console.error('Signin failed:', result.error);
            setError(result.error || 'Signin failed. Please try again.');
          }
        }
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  // Reset form when switching between signup/signin
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setUserRole('user'); // Reset to user role
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create Account' : userRole === 'admin' ? 'Admin Access' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Join our clinics network today' 
              : userRole === 'admin' 
                ? 'Access Durban Women\'s Clinic Administrative Dashboard'
                : 'Sign in to your account'
            }
          </p>
          
          {/* Role Indicator */}
          {!isSignUp && (
            <div className="mt-4 inline-flex items-center bg-purple-100 text-purple-700 rounded-full px-4 py-2">
              <i className={`${userRole === 'admin' ? 'fas fa-hospital' : 'fas fa-user'} mr-2`}></i>
              <span className="text-sm font-medium">
                {userRole === 'admin' ? 'Clinic Administrator' : 'Regular User'}
              </span>
            </div>
          )}
        </div>

        {/* Role Selection */}
        {!isSignUp && false && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Select Your Role
            </label>
            <div className="flex rounded-lg border border-gray-300 p-1 bg-gray-50">
              <button
                type="button"
                onClick={() => setUserRole('user')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  userRole === 'user'
                    ? 'bg-white text-purple-600 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="fas fa-user mr-2"></i>
                Regular User
              </button>
              <button
                type="button"
                onClick={() => setUserRole('admin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  userRole === 'admin'
                    ? 'bg-white text-purple-600 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="fas fa-hospital mr-2"></i>
                Clinic Admin
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
                required={isSignUp}
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-purple-600 hover:text-purple-700 font-medium"
            disabled={loading}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
} 