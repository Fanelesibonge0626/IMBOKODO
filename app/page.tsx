
'use client';

import Link from 'next/link';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/languages';
import LanguageSelector from '../components/LanguageSelector';

export default function Home() {
  const { currentLanguage, changeLanguage } = useLanguage();

  const features = [
    {
      title: getTranslation('essentialHealthCare', currentLanguage),
      subtitle: getTranslation('essentialHealthCareSubtitle', currentLanguage),
      description: getTranslation('essentialHealthCareDesc', currentLanguage),
      icon: 'fas fa-heartbeat',
      href: '/ai-health',
      color: 'from-purple-600 to-purple-800',
      stats: getTranslation('aiPowered', currentLanguage)
    },
    {
      title: getTranslation('maternalHealthSupport', currentLanguage),
      subtitle: getTranslation('maternalHealthSupportSubtitle', currentLanguage),
      description: getTranslation('maternalHealthSupportDesc', currentLanguage),
      icon: 'fas fa-baby',
      href: '/cycle',
      color: 'from-pink-500 to-pink-700',
      stats: 'Complete maternal care'
    },
    {
      title: getTranslation('preventiveCareAlerts', currentLanguage),
      subtitle: getTranslation('preventiveCareAlertsSubtitle', currentLanguage),
      description: getTranslation('preventiveCareAlertsDesc', currentLanguage),
      icon: 'fas fa-shield-alt',
      href: '/risk-alerts',
      color: 'from-purple-500 to-pink-500',
      stats: 'Smart health monitoring'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}
        ></div>

        {/* Language Selector */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={changeLanguage}
          />
        </div>

        {/* Guardian Silhouette */}
        <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center">
          <img
            src="https://readdy.ai/api/search-image?query=African%20woman%20healthcare%20guardian%20silhouette%2C%20protective%20stance%2C%20medical%20care%20symbol%2C%20purple%20and%20pink%20gradient%20background%2C%20modern%20minimalist%20design%2C%20health%20protection%20theme%2C%20inspiring%20and%20empowering&width=800&height=1200&seq=guardian-silhouette&orientation=portrait"
            alt="SheCare"
            className="h-full w-full object-cover opacity-20"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Health Shield */}
          <div className="absolute top-20 right-20 bg-white/10 backdrop-blur-sm rounded-full p-4 animate-float">
            <span className="text-white/90 font-medium">🛡️ Your SheCare</span>
          </div>

          {/* Cycle Tracker */}
          <div className="absolute top-40 right-40 bg-white/10 backdrop-blur-sm rounded-full p-4 animate-float-delayed">
            <span className="text-white/90 font-medium">📅 Cycle Tracker</span>
          </div>

          {/* Community */}
          <div className="absolute top-60 right-60 bg-white/10 backdrop-blur-sm rounded-full p-4 animate-float">
            <span className="text-white/90 font-medium">👥 Community</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {getTranslation('heroTitle', currentLanguage)}
          </h1>

          {/* Mission Statement */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {getTranslation('missionDescription', currentLanguage)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {getTranslation('getStarted', currentLanguage)}
            </Link>
            <Link
              href="/clinics"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              View Clinics
            </Link>
          </div>

          {/* Admin Access Section */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3">
                  <i className="fas fa-hospital text-white text-2xl"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white">Clinic Administration</h3>
                  <p className="text-white/80 text-sm">Staff Access Only</p>
                </div>
              </div>
              <p className="text-white/90 mb-6 text-sm">
                Manage Durban Women's Health Clinic bookings, appointments, and patient records
              </p>
              <Link
                href="/admin/login"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-shield-alt mr-2"></i>
                Access Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-6">
              <span className="font-medium">🛡️ Comprehensive Health Protection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Complete SheCare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI-powered healthcare support designed to protect and empower women in our community
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="group">
                <div
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${feature.color} p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                  {/* Background Icon */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <i className={`${feature.icon} text-6xl`}></i>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-4">
                        <i className={`${feature.icon} text-2xl`}></i>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm mb-2">{feature.subtitle}</p>
                      <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                        <span className="text-xs font-medium">{feature.stats}</span>
                      </div>
                    </div>

                    <p className="text-white/90 mb-6 text-lg leading-relaxed">{feature.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">Explore</span>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-6">
                <span className="font-medium">🎯 {getTranslation('ourMission', currentLanguage)}</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                {getTranslation('missionTitle', currentLanguage)}
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {getTranslation('missionDescription', currentLanguage)}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-purple-600"></i>
                  </div>
                  <span className="text-gray-700 font-medium">AI-powered health monitoring and alerts</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-pink-600"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Comprehensive maternal health support</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-purple-600"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Gamified preventive care challenges</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=African%20women%20healthcare%20technology%2C%20medical%20consultation%20with%20tablet%2C%20modern%20healthcare%20setting%2C%20diverse%20women%20discussing%20health%2C%20purple%20and%20pink%20color%20scheme%2C%20professional%20medical%20environment%2C%20empowering%20healthcare%20scene&width=600&height=600&seq=mission-image&orientation=squarish"
                alt="Women's healthcare technology"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <i className="fas fa-users text-white"></i>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">10,000+</div>
                    <div className="text-sm text-gray-600">Women Protected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-brain text-white text-2xl"></i>
              </div>
              <h3 className="text-4xl font-bold text-purple-600 mb-2">AI</h3>
              <p className="text-gray-600 text-lg">{getTranslation('aiPowered', currentLanguage)}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
              </div>
              <h3 className="text-4xl font-bold text-pink-500 mb-2">24/7</h3>
              <p className="text-gray-600 text-lg">{getTranslation('riskMonitoring', currentLanguage)}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-gamepad text-white text-2xl"></i>
              </div>
              <h3 className="text-4xl font-bold text-purple-500 mb-2">Fun</h3>
              <p className="text-gray-600 text-lg">{getTranslation('gamifiedHealth', currentLanguage)}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-map-marked-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">Local</h3>
              <p className="text-gray-600 text-lg">{getTranslation('localNetwork', currentLanguage)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="py-20 bg-gradient-to-br from-red-500 to-pink-600">
        <div className="container mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <i className="fas fa-shield-alt text-red-300 text-3xl"></i>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-6">{getTranslation('emergencyTitle', currentLanguage)}</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {getTranslation('emergencyDescription', currentLanguage)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Link
                href="/risk-alerts"
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 hover:bg-white/30 transition-colors"
              >
                <i className="fas fa-bell mb-2 text-xl"></i>
                <div className="font-semibold">{getTranslation('riskAlerts', currentLanguage)}</div>
                <div className="text-sm">{getTranslation('viewActiveAlerts', currentLanguage)}</div>
              </Link>
              <a
                href="tel:0800567567"
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 hover:bg-white/30 transition-colors"
              >
                <i className="fas fa-phone mb-2 text-xl"></i>
                <div className="font-semibold">{getTranslation('emergency', currentLanguage)}</div>
                <div className="text-sm">0800 567 567</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
