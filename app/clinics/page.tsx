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

  const generateQRCode = () => {
    const mapUrl = `https://maps.google.com/maps?q=${providers.map(p => `${p.coordinates.lat},${p.coordinates.lng}`).join('|')}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mapUrl)}`;
    
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>Offline Clinic Map - QR Code</title></head>
          <body style="font-family: Arial; text-align: center; padding: 20px;">
            <h2>Scan to Save Clinic Locations Offline</h2>
            <img src="${qrUrl}" alt="QR Code for clinic locations" style="margin: 20px;"/>
            <p>Scan this QR code with your phone to save clinic locations for offline use.</p>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div 
        className="text-white py-4"
        style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="h3 fw-bold mb-1">Find Healthcare Clinics</h1>
              <p className="mb-0 opacity-90">Thola amakliniki asendawini yakho</p>
            </div>
            <button 
              onClick={generateQRCode}
              className="btn btn-light btn-sm rounded-pill text-decoration-none whitespace-nowrap"
              style={{ color: 'var(--primary-purple)' }}
            >
              <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                <i className="ri-qr-code-line"></i>
              </div>
              QR Code
            </button>
          </div>
        </div>
      </div>

      {/* SMS Guide */}
      <div className="bg-warning bg-opacity-10 py-3">
        <div className="container">
          <div className="card border-0 bg-white rounded-3">
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <div className="w-10 h-10 d-flex align-items-center justify-content-center me-3">
                  <i className="ri-message-2-line fs-4" style={{ color: 'var(--primary-purple)' }}></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fw-semibold mb-1">No Data? No Problem!</h6>
                  <p className="small mb-0 text-muted">
                    Text <strong>CLINIC [Your Town]</strong> to <strong>+27 123 456 789</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container py-3">
        <div className="row g-2">
          {providerTypes.map((type) => (
            <div key={type.id} className="col-6 col-lg-3">
              <button
                onClick={() => setSelectedType(type.id)}
                className={`btn w-100 rounded-pill d-flex align-items-center justify-content-center py-2 text-decoration-none whitespace-nowrap ${
                  selectedType === type.id
                    ? 'text-white'
                    : 'btn-outline-secondary'
                }`}
                style={{
                  background: selectedType === type.id 
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' 
                    : 'transparent',
                  border: selectedType === type.id ? 'none' : '1px solid #dee2e6'
                }}
              >
                <div className="w-4 h-4 d-flex align-items-center justify-content-center me-2">
                  <i className={type.icon}></i>
                </div>
                <span className="small">{type.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Map/List View */}
      <div className="container mb-3">
        <div className="d-flex justify-content-center">
          <div className="btn-group rounded-pill" role="group">
            <button
              onClick={() => setViewMode('list')}
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'} rounded-start-pill text-decoration-none whitespace-nowrap`}
            >
              <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                <i className="ri-list-check"></i>
              </div>
              List View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`btn ${viewMode === 'map' ? 'btn-primary' : 'btn-outline-primary'} rounded-end-pill text-decoration-none whitespace-nowrap`}
            >
              <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                <i className="ri-map-2-line"></i>
              </div>
              Map View
            </button>
          </div>
        </div>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="container mb-4">
          <div className="card border-0 rounded-4 overflow-hidden">
            <div style={{ height: '400px', position: 'relative' }}>
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
      <div className="container pb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-semibold mb-0">
            {filteredProviders.length} clinic{filteredProviders.length !== 1 ? 's' : ''} found
          </h5>
          <small className="text-muted">Sorted by distance</small>
        </div>

        <div className="row g-3">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="col-12">
              <div className="card border-0 rounded-4 card-hover">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{provider.name}</h6>
                      <p className="small text-muted mb-1">
                        <i className="ri-map-pin-line me-1"></i>
                        {provider.address}
                      </p>
                      <p className="small text-muted mb-0">
                        <i className="ri-time-line me-1"></i>
                        {provider.availability}
                      </p>
                    </div>
                    <span className="badge rounded-pill" style={{ backgroundColor: 'var(--primary-purple)', color: 'white' }}>
                      {provider.distance}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h6 className="small fw-semibold mb-2">Services Available:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {provider.services.map((service, index) => (
                        <span 
                          key={index}
                          className="badge bg-light text-dark rounded-pill small"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="small fw-semibold mb-2">Languages Spoken:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {provider.languages.map((language, index) => (
                        <span 
                          key={index}
                          className="badge rounded-pill"
                          style={{ backgroundColor: 'var(--light-pink)', color: 'var(--primary-purple)' }}
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <a 
                      href={`tel:${provider.phone}`}
                      className="btn btn-outline-primary btn-sm rounded-pill flex-grow-1 text-decoration-none whitespace-nowrap"
                    >
                      <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                        <i className="ri-phone-line"></i>
                      </div>
                      Call Now
                    </a>
                    <a 
                      href={`https://maps.google.com/maps?q=${provider.coordinates.lat},${provider.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary btn-sm rounded-pill flex-grow-1 text-decoration-none whitespace-nowrap"
                    >
                      <i className="ri-map-pin-line me-1"></i>
                      Directions
                    </a>
                    
                    {/* Booking Button for Clinics */}
                    {provider.type === 'clinic' && (
                      <Link
                        href={`/booking?provider=${encodeURIComponent(provider.name)}&type=${provider.type}&phone=${provider.phone}`}
                        className="btn btn-primary btn-sm rounded-pill flex-grow-1 text-decoration-none whitespace-nowrap"
                      >
                        <i className="fas fa-calendar-plus me-1"></i>
                        Book Appointment
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}