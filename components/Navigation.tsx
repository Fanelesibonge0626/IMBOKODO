
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/languages';
import { useFirebase } from '../hooks/useFirebase';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useFirebase();

  // Public routes that don't show navigation
  const publicRoutes = ['/', '/auth'];

  // Don't show navigation on public routes or if not authenticated
  if (publicRoutes.includes(pathname) || !user) {
    return null;
  }

  const navItems = [
    { href: '/ai-health', icon: 'fas fa-brain', label: getTranslation('aiHealth', currentLanguage) },
    { href: '/community', icon: 'fas fa-map-marked-alt', label: getTranslation('community', currentLanguage) },
    { href: '/risk-alerts', icon: 'fas fa-bell', label: getTranslation('alerts', currentLanguage) },
    { href: '/preventive-care', icon: 'fas fa-gamepad', label: getTranslation('challenges', currentLanguage) },
  ];

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        // Redirect to home page
        router.push('/');
        setShowLogout(false);
      } else {
        console.error('Logout failed:', result.error);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Logout Overlay */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-sign-out-alt text-red-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to sign out of SheCare?</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogout(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors whitespace-nowrap"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-40">
        <div className="grid grid-cols-6 h-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 relative group ${
                  isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'
                }`}
              >
                {/* Active Background */}
                {isActive && (
                  <div className="absolute inset-x-2 inset-y-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl"></div>
                )}
                
                {/* Icon */}
                <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                
                {/* Label */}
                <span className={`relative z-10 text-xs font-medium transition-colors ${
                  isActive ? 'text-purple-700' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                )}
              </Link>
            );
          })}
          
          {/* Logout Button */}
          <button
            onClick={() => setShowLogout(true)}
            className="flex flex-col items-center justify-center space-y-1 transition-all duration-300 relative group text-gray-500 hover:text-red-500"
          >
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
              <i className="fas fa-sign-out-alt text-xl"></i>
            </div>
            <span className="relative z-10 text-xs font-medium transition-colors text-gray-600 group-hover:text-red-600">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
