'use client';

import { useFirebase } from '../../hooks/useFirebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SubscriptionService from '../../lib/subscriptionService';

export default function DashboardPage() {
  const { user, loading, logout } = useFirebase();
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('free');
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      checkSubscriptionStatus();
    }
  }, [user]);

  useEffect(() => {
    // Check for subscription success message in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscription') === 'success') {
      // Refresh subscription status
      checkSubscriptionStatus();
      // Show success message
      setShowSuccessMessage(true);
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      setLoadingSubscription(true);
      const subscriptionService = SubscriptionService.getInstance();
      const hasActiveSubscription = await subscriptionService.isSubscriptionActive(user?.uid || '');
      setIsPremium(hasActiveSubscription);
      setSubscriptionStatus(hasActiveSubscription ? 'premium' : 'free');
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsPremium(false);
      setSubscriptionStatus('free');
    } finally {
      setLoadingSubscription(false);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push('/');
    }
  };

  if (loading || loadingSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome to SheCare</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-8 text-center">
            <div className="flex items-center justify-center">
              <i className="fas fa-check-circle text-2xl mr-3"></i>
              <div>
                <h3 className="text-lg font-semibold">🎉 Subscription Successful!</h3>
                <p>Welcome to SheCare Premium! You now have access to all premium features.</p>
              </div>
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Your Profile</h2>
              <div className="text-white/90">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.uid}</p>
                <p><strong>Account Created:</strong> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                    subscriptionStatus === 'premium' 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {subscriptionStatus === 'premium' ? '🌟 Premium Member' : '🆓 Free User'}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Premium Status Badge */}
            {subscriptionStatus === 'free' && (
              <div className="text-right">
                <Link
                  href="/subscription"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all inline-flex items-center"
                >
                  <i className="fas fa-crown mr-2"></i>
                  Go Premium
                </Link>
                <p className="text-white/70 text-sm mt-2">Unlock exclusive features</p>
              </div>
            )}
          </div>
        </div>

        {/* Premium Upgrade Banner for Free Users */}
        {subscriptionStatus === 'free' && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-3">🚀 Upgrade to Premium</h3>
              <p className="text-white/90 mb-4 text-lg">
                Get access to private doctors, personalized pregnancy insights, and exclusive health resources
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/subscription"
                  className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                >
                  View Plans
                </Link>
                <Link
                  href="/subscription"
                  className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Free Features */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-3">AI Health Assistant</h3>
            <p className="text-white/80 mb-4">Get personalized health insights and recommendations</p>
            <button 
              onClick={() => router.push('/ai-health')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Access AI Health
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-3">Cycle Tracking</h3>
            <p className="text-white/80 mb-4">Track your menstrual cycle and health patterns</p>
            <button 
              onClick={() => router.push('/cycle')}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Track Cycle
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-3">Public Clinics</h3>
            <p className="text-white/80 mb-4">Connect with healthcare clinics in your area</p>
            <button 
              onClick={() => router.push('/clinics')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Clinics
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-3">Preventive Care</h3>
            <p className="text-white/80 mb-4">Access preventive health resources and tips</p>
            <button 
              onClick={() => router.push('/preventive-care')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Learn More
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-3">Risk Alerts</h3>
            <p className="text-white/80 mb-4">Stay informed about health risks and alerts</p>
            <button 
              onClick={() => router.push('/risk-alerts')}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              View Alerts
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-3">Voice Assistant</h3>
            <p className="text-white/80 mb-4">Use voice commands for hands-free health assistance</p>
            <button 
              onClick={() => router.push('/voice')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Voice Commands
            </button>
          </div>

          {/* Premium Features */}
          {isPremium ? (
            <>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-white mb-3">🌟 Private Doctors</h3>
                <p className="text-white/90 mb-4">Book appointments with top gynecologists and specialists</p>
                <button 
                  onClick={() => router.push('/private-doctors')}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Book Private Doctor
                </button>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-white mb-3">👩‍⚕️ Specialist Directory</h3>
                <p className="text-white/90 mb-4">Access detailed profiles, ratings, and reviews</p>
                <button 
                  onClick={() => router.push('/specialists')}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View Specialists
                </button>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-white mb-3">📊 Personalized Insights</h3>
                <p className="text-white/90 mb-4">Get AI-powered pregnancy insights and reminders</p>
                <button 
                  onClick={() => router.push('/insights')}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View Insights
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 opacity-60">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="text-xl font-semibold text-white/60 mb-3">Private Doctors</h3>
                  <p className="text-white/50 mb-4">Premium feature - upgrade to access</p>
                  <Link
                    href="/subscription"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 opacity-60">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="text-xl font-semibold text-white/60 mb-3">Specialist Directory</h3>
                  <p className="text-white/50 mb-4">Premium feature - upgrade to access</p>
                  <Link
                    href="/subscription"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 opacity-60">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="text-xl font-semibold text-white/60 mb-3">Personalized Insights</h3>
                  <p className="text-white/50 mb-4">Premium feature - upgrade to access</p>
                  <Link
                    href="/subscription"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* My Bookings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-3">My Bookings</h3>
            <p className="text-white/80 mb-4">View and manage your clinic appointments</p>
            <button 
              onClick={() => router.push('/my-bookings')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              View Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 