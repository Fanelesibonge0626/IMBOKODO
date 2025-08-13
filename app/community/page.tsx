
'use client';

import { useState, useEffect } from 'react';

interface HealthcareProvider {
  id: number;
  name: string;
  type: 'clinic' | 'hospital' | 'midwife' | 'specialist';
  address: string;
  distance: string;
  phone: string;
  email?: string;
  services: string[];
  languages: string[];
  rating: number;
  reviews: number;
  availability: string;
  coordinates: { lat: number; lng: number };
  specializations?: string[];
  emergencyServices: boolean;
}

export default function CommunityPage() {
  const [providers, setProviders] = useState<HealthcareProvider[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<HealthcareProvider | null>(null);

  const providerTypes = [
    { id: 'all', label: 'All Providers', icon: 'fas fa-hospital' },
    { id: 'clinic', label: 'Clinics', icon: 'fas fa-clinic-medical' },
    { id: 'hospital', label: 'Hospitals', icon: 'fas fa-hospital' },
    { id: 'midwife', label: 'Midwives', icon: 'fas fa-baby' },
    { id: 'specialist', label: 'Specialists', icon: 'fas fa-user-md' }
  ];

  useEffect(() => {
    // Mock healthcare providers data
    const mockProviders: HealthcareProvider[] = [
      {
        id: 1,
        name: 'Durban Women\'s Health Clinic',
        type: 'clinic',
        address: '123 West Street, Durban Central',
        distance: '1.2 km',
        phone: '031-304-5678',
        email: 'info@durbanwomenshealth.co.za',
        services: ['Prenatal Care', 'Family Planning', 'Reproductive Health', 'Counselling'],
        languages: ['English', 'Zulu', 'Afrikaans'],
        rating: 4.8,
        reviews: 156,
        availability: 'Mon-Fri: 8:00-17:00, Sat: 8:00-13:00',
        coordinates: { lat: -29.8587, lng: 31.0218 },
        emergencyServices: false
      },
      {
        id: 2,
        name: 'Addington Hospital',
        type: 'hospital',
        address: '101 Erskine Terrace, South Beach',
        distance: '2.1 km',
        phone: '031-327-2000',
        services: ['Emergency Care', 'Maternity Ward', 'Pediatrics', 'Surgery'],
        languages: ['English', 'Zulu', 'Tamil'],
        rating: 4.2,
        reviews: 284,
        availability: '24/7 Emergency Services',
        coordinates: { lat: -29.8748, lng: 31.0341 },
        emergencyServices: true
      },
      {
        id: 3,
        name: 'Sister Nomsa Mthembu - Certified Midwife',
        type: 'midwife',
        address: 'Umlazi Section BB, Home Visits Available',
        distance: '8.5 km',
        phone: '083-456-7890',
        email: 'nomsa.midwife@gmail.com',
        services: ['Home Births', 'Prenatal Care', 'Postnatal Care', 'Breastfeeding Support'],
        languages: ['Zulu', 'English'],
        rating: 4.9,
        reviews: 78,
        availability: 'Available 24/7 for births, Consultations by appointment',
        coordinates: { lat: -29.9689, lng: 30.8794 },
        specializations: ['Natural Birth', 'High-Risk Pregnancies'],
        emergencyServices: false
      },
      {
        id: 4,
        name: 'Chatsworth Maternity Clinic',
        type: 'clinic',
        address: '45 Chatsworth Centre, Unit Road',
        distance: '12.3 km',
        phone: '031-404-5555',
        services: ['Prenatal Care', 'Ultrasounds', 'Birth Classes', 'Vaccinations'],
        languages: ['English', 'Tamil', 'Hindi', 'Zulu'],
        rating: 4.5,
        reviews: 127,
        availability: 'Mon-Fri: 7:30-16:00, Sat: 8:00-12:00',
        coordinates: { lat: -29.9017, lng: 30.8603 },
        emergencyServices: false
      },
      {
        id: 5,
        name: 'Dr. Priya Sharma - Gynecologist',
        type: 'specialist',
        address: 'Sandton Medical Centre, Musgrave Road',
        distance: '5.7 km',
        phone: '031-201-3456',
        email: 'dr.sharma@gynhealth.co.za',
        services: ['Gynecological Exams', 'Fertility Consultations', 'Prenatal Care', 'Surgery'],
        languages: ['English', 'Hindi', 'Gujarati'],
        rating: 4.7,
        reviews: 203,
        availability: 'Mon-Thu: 9:00-17:00, Fri: 9:00-15:00',
        coordinates: { lat: -29.8465, lng: 31.0244 },
        specializations: ['Fertility Treatment', 'High-Risk Pregnancies', 'Endometriosis'],
        emergencyServices: false
      },
      {
        id: 6,
        name: 'Pinetown Community Health Centre',
        type: 'clinic',
        address: '78 Main Road, Pinetown',
        distance: '18.2 km',
        phone: '031-702-8900',
        services: ['Primary Healthcare', 'Maternal Care', 'HIV Testing', 'Counselling'],
        languages: ['English', 'Zulu', 'Afrikaans'],
        rating: 4.1,
        reviews: 92,
        availability: 'Mon-Fri: 7:00-16:00',
        coordinates: { lat: -29.8294, lng: 30.8786 },
        emergencyServices: false
      }
    ];

    setProviders(mockProviders);
  }, []);

  const filteredProviders = providers.filter(provider => 
    selectedType === 'all' || provider.type === selectedType
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'clinic': return 'fas fa-clinic-medical';
      case 'hospital': return 'fas fa-hospital';
      case 'midwife': return 'fas fa-baby';
      case 'specialist': return 'fas fa-user-md';
      default: return 'fas fa-hospital';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'clinic': return 'from-blue-500 to-blue-600';
      case 'hospital': return 'from-red-500 to-red-600';
      case 'midwife': return 'from-pink-500 to-pink-600';
      case 'specialist': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`fas fa-star text-sm ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      ></i>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <i className="fas fa-map-marked-alt text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Community Healthcare Network</h1>
                <p className="text-white/80">Connect with local clinics, midwives, and specialists</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{filteredProviders.length}</div>
              <div className="text-white/80 text-sm">Providers found</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {providerTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${type.icon} mr-2`}></i>
                  {type.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
                  }`}
                >
                  <i className="fas fa-list mr-1"></i>
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'map' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
                  }`}
                >
                  <i className="fas fa-map mr-1"></i>
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="h-96 relative">
              <iframe
                src={`https://maps.google.com/maps?q=${filteredProviders.map(p => `${p.coordinates.lat},${p.coordinates.lng}`).join('|')}&output=embed&z=12`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}

        {/* Providers List */}
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <div className={`bg-gradient-to-r ${getTypeColor(provider.type)} text-white rounded-xl p-3 mr-4`}>
                      <i className={`${getTypeIcon(provider.type)} text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">{renderStars(provider.rating)}</div>
                        <span className="text-sm text-gray-600">
                          {provider.rating} ({provider.reviews} reviews)
                        </span>
                        {provider.emergencyServices && (
                          <span className="ml-3 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                            24/7 Emergency
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <i className="fas fa-map-marker-alt mr-2 text-purple-500"></i>
                        <span className="mr-4">{provider.address}</span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                          {provider.distance}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <i className="fas fa-clock mr-2 text-green-500"></i>
                        <span>{provider.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                {provider.specializations && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`tel:${provider.phone}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Contact Clinic
                  </a>
                  
                  {provider.email && (
                    <a
                      href={`mailto:${provider.email}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                    >
                      <i className="fas fa-envelope mr-2"></i>
                      Email
                    </a>
                  )}
                  
                  <a
                    href={`https://maps.google.com/maps?q=${provider.coordinates.lat},${provider.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
                  >
                    <i className="fas fa-directions mr-2"></i>
                    Get Directions
                  </a>

                  <button
                    onClick={() => setSelectedProvider(provider)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-info-circle mr-2"></i>
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-500 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">
            <i className="fas fa-ambulance mr-2"></i>
            Medical Emergency?
          </h3>
          <p className="mb-4">For immediate medical assistance, contact emergency services</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="tel:10111"
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-phone mr-2"></i>
              Emergency: 10111
            </a>
            <a
              href="tel:0800567567"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <i className="fas fa-headset mr-2"></i>
              Health Hotline: 0800 567 567
            </a>
          </div>
        </div>
      </div>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.name}</h2>
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-600 rounded-lg p-2 mr-3">
                    <i className={`${getTypeIcon(selectedProvider.type)} text-lg`}></i>
                  </div>
                  <div>
                    <div className="font-semibold capitalize">{selectedProvider.type}</div>
                    <div className="text-gray-600 text-sm">{selectedProvider.address}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <p className="text-gray-600">📞 {selectedProvider.phone}</p>
                    {selectedProvider.email && (
                      <p className="text-gray-600">✉️ {selectedProvider.email}</p>
                    )}
                    <p className="text-gray-600">📍 {selectedProvider.distance}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Availability</h3>
                    <p className="text-gray-600">{selectedProvider.availability}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-4">
                  <a
                    href={`tel:${selectedProvider.phone}`}
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Call Now
                  </a>
                  <a
                    href={`https://maps.google.com/maps?q=${selectedProvider.coordinates.lat},${selectedProvider.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <i className="fas fa-directions mr-2"></i>
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
