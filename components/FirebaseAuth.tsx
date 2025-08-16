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
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    phone: '',
    dateOfBirth: '',
    emergencyContact: '',
    healthConditions: ''
  });
  
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
      
      // Check if terms are accepted for both signup and login
      if (!acceptTerms) {
        setError('Please accept the Terms and Conditions and Privacy Policy to continue.');
        return;
      }
      
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
        
        // Auto-detect admin credentials
        const ADMIN_CREDENTIALS = {
          email: 'admin@durbanwomensclinic.co.za',
          password: 'admin123'
        };
        
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
          // Regular user authentication
          console.log('Regular user credentials, proceeding with Firebase authentication...');
          
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
    setShowPassword(false);
    setAcceptTerms(false);
  };

  // Handle profile management
  const handleProfileUpdate = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Here you would typically update the user's profile in Firebase
      // For now, we'll just simulate a successful update
      console.log('Updating profile:', profileData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      setError('');
      // You could show a success message here
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    if (!showProfile) {
      // Load profile data when opening
      setProfileData({
        displayName: name || '',
        phone: '',
        dateOfBirth: '',
        emergencyContact: '',
        healthConditions: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Join our clinics network today' 
              : 'Sign in to your account'
            }
          </p>
          

        </div>

        {/* Role Selection - Hidden */}
        {/* {!isSignUp && (
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
                    : 'text-gray-800'
                }`}
              >
                <i className="fas fa-hospital mr-2"></i>
                Clinic Admin
              </button>
            </div>
          </div>
        )} */}

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              required
              disabled={loading}
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed">
              I accept the{' '}
              <a href="/terms" className="text-purple-600 hover:text-purple-700 underline font-medium">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-purple-600 hover:text-purple-700 underline font-medium">
                Privacy Policy
              </a>{' '}
              for the AI health tool and data processing
            </label>
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

        <div className="mt-6 text-center space-y-3">
          <button
            type="button"
            onClick={toggleMode}
            className="text-purple-600 hover:text-purple-700 font-medium"
            disabled={loading}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
          
          {/* Profile Management Button */}
          {!isSignUp && (
            <div>
              <button
                type="button"
                onClick={toggleProfile}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                disabled={loading}
              >
                {showProfile ? 'Hide Profile' : 'Manage Profile'}
              </button>
            </div>
          )}
        </div>

        {/* Profile Management Section */}
        {showProfile && !isSignUp && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                disabled={loading}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your display name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Name and phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Health Conditions
                  </label>
                  <textarea
                    value={profileData.healthConditions}
                    onChange={(e) => setProfileData({...profileData, healthConditions: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Any relevant health conditions or allergies"
                    rows={3}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleProfileUpdate}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Display Name:</span>
                  <span className="text-sm text-gray-900">{profileData.displayName || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <span className="text-sm text-gray-900">{profileData.phone || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
                  <span className="text-sm text-gray-900">{profileData.dateOfBirth || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Emergency Contact:</span>
                  <span className="text-sm text-gray-900">{profileData.emergencyContact || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Health Conditions:</span>
                  <span className="text-sm text-gray-900">{profileData.healthConditions || 'None specified'}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 