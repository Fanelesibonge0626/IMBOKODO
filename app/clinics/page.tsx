'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HealthcareProvider {
  id: number;
  name: string;
  type: 'clinic' | 'hospital';
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
  emergencyServices: boolean;
}

export default function ClinicsPage() {
  const [providers, setProviders] = useState<HealthcareProvider[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<HealthcareProvider | null>(null);

  const providerTypes = [
    { id: 'all', label: 'All Providers', icon: 'fas fa-hospital' },
    { id: 'clinic', label: 'Clinics', icon: 'fas fa-clinic-medical' },
    { id: 'hospital', label: 'Hospitals', icon: 'fas fa-hospital' }
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
        id: 4,
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

  const filteredProviders = providers.filter(provider => {
    if (selectedType === 'all') return true;
    return provider.type === selectedType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Healthcare Clinics</h1>
            <p className="text-xl text-white/90">Thola amakliniki asendawini yakho</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {providerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <i className={`${type.icon} mr-2`}></i>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              List View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="fas fa-map mr-2"></i>
              Map View
            </button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 relative">
                <iframe
                  src={`https://maps.google.com/maps?q=${providers.map(p => `${p.coordinates.lat},${p.coordinates.lng}`).join('|')}&output=embed&z=12`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Providers List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProviders.length} clinic{filteredProviders.length !== 1 ? 's' : ''} found
            </h2>
            <p className="text-gray-600">Sorted by distance</p>
          </div>

          <div className="grid gap-6">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.name}</h3>
                    <p className="text-gray-600 mb-1">
                      <i className="fas fa-map-marker-alt mr-2 text-purple-500"></i>
                      {provider.address}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <i className="fas fa-clock mr-2 text-purple-500"></i>
                      {provider.availability}
                    </p>
                    <p className="text-gray-600">
                      <i className="fas fa-star mr-2 text-yellow-500"></i>
                      {provider.rating} ({provider.reviews} reviews)
                    </p>
                  </div>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {provider.distance}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.services.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Languages Spoken:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((language, index) => (
                      <span 
                        key={index}
                        className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a 
                    href={`tel:${provider.phone}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium text-center hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Call Now
                  </a>
                  <a 
                    href={`https://maps.google.com/maps?q=${provider.coordinates.lat},${provider.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-xl font-medium text-center hover:bg-gray-700 transition-colors"
                  >
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    Directions
                  </a>
                  
                  {/* Booking Button for Clinics */}
                  {provider.type === 'clinic' && (
                    <Link
                      href={`/booking?provider=${encodeURIComponent(provider.name)}&type=${provider.type}&phone=${provider.phone}`}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-medium text-center hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      <i className="fas fa-calendar-plus mr-2"></i>
                      Book Appointment
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}