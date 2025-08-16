'use client';

import { useFirebase } from '../../hooks/useFirebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading, logout } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push('/');
    }
  };

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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome to IMBOKODO</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Profile</h2>
          <div className="text-white/90">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.uid}</p>
            <p><strong>Account Created:</strong> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h3 className="text-xl font-semibold text-white mb-3">Clinics</h3>
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
        </div>
      </div>
    </div>
  );
} 