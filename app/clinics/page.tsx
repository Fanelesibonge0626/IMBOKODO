'use client';

import { useState, useEffect } from 'react';

interface Clinic {
  id: number;
  name: string;
  distance: string;
  address: string;
  hours: string;
  services: string[];
  languages: string[];
  phone: string;
  coordinates: { lat: number; lng: number };
}

export default function ClinicsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filters = [
    { id: 'all', label: 'All Services', icon: 'ri-hospital-line' },
    { id: 'prenatal', label: 'Prenatal Care', icon: 'ri-heart-pulse-line' },
    { id: 'hiv', label: 'HIV Testing', icon: 'ri-test-tube-line' },
    { id: 'mental', label: 'Mental Health', icon: 'ri-brain-line' },
  ];

  const clinics: Clinic[] = [
    {
      id: 1,
      name: 'Durban Central Clinic',
      distance: '0.8 km',
      address: '123 Smith Street, Durban Central',
      hours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-13:00',
      services: ['Prenatal Care', 'HIV Testing', 'Mental Health', 'Family Planning'],
      languages: ['English', 'Zulu', 'Xhosa'],
      phone: '031-123-4567',
      coordinates: { lat: -29.8587, lng: 31.0218 }
    },
    {
      id: 2,
      name: 'Umlazi Community Health Centre',
      distance: '2.1 km',
      address: '456 Mangosuthu Highway, Umlazi',
      hours: 'Mon-Sun: 7:00-19:00',
      services: ['Prenatal Care', 'HIV Testing', 'General Medicine'],
      languages: ['Zulu', 'English'],
      phone: '031-987-6543',
      coordinates: { lat: -29.9689, lng: 30.8794 }
    },
    {
      id: 3,
      name: 'Pinetown Women\'s Health Clinic',
      distance: '5.3 km',
      address: '789 Main Road, Pinetown',
      hours: 'Mon-Fri: 8:00-16:30',
      services: ['Prenatal Care', 'Mental Health', 'Women\'s Health'],
      languages: ['English', 'Zulu', 'Afrikaans'],
      phone: '031-702-1234',
      coordinates: { lat: -29.8294, lng: 30.8786 }
    },
    {
      id: 4,
      name: 'Chatsworth District Hospital',
      distance: '7.2 km',
      address: '321 Chatsworth Centre, Chatsworth',
      hours: '24/7 Emergency, Outpatient: 8:00-16:00',
      services: ['HIV Testing', 'Mental Health', 'Emergency Care'],
      languages: ['English', 'Tamil', 'Zulu'],
      phone: '031-404-5678',
      coordinates: { lat: -29.9017, lng: 30.8603 }
    },
    {
      id: 5,
      name: 'Phoenix Primary Healthcare',
      distance: '12.5 km',
      address: '654 Phoenix Highway, Phoenix',
      hours: 'Mon-Fri: 7:30-16:00, Sat: 8:00-12:00',
      services: ['Prenatal Care', 'HIV Testing', 'Family Planning'],
      languages: ['English', 'Zulu', 'Hindi'],
      phone: '031-500-9876',
      coordinates: { lat: -29.7025, lng: 31.0119 }
    }
  ];

  const filteredClinics = clinics.filter(clinic => {
    if (selectedFilter === 'all') return true;
    return clinic.services.some(service => 
      service.toLowerCase().includes(selectedFilter === 'prenatal' ? 'prenatal' : 
        selectedFilter === 'hiv' ? 'hiv' : 'mental')
    );
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          setUserLocation({ lat: -29.8587, lng: 31.0218 });
        }
      );
    }
  }, []);

  const generateQRCode = () => {
    const mapUrl = `https://maps.google.com/maps?q=${filteredClinics.map(c => `${c.coordinates.lat},${c.coordinates.lng}`).join('|')}`;
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
          {filters.map((filter) => (
            <div key={filter.id} className="col-6 col-lg-3">
              <button
                onClick={() => setSelectedFilter(filter.id)}
                className={`btn w-100 rounded-pill d-flex align-items-center justify-content-center py-2 text-decoration-none whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'text-white'
                    : 'btn-outline-secondary'
                }`}
                style={{
                  background: selectedFilter === filter.id 
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' 
                    : 'transparent',
                  border: selectedFilter === filter.id ? 'none' : '1px solid #dee2e6'
                }}
              >
                <div className="w-4 h-4 d-flex align-items-center justify-content-center me-2">
                  <i className={filter.icon}></i>
                </div>
                <span className="small">{filter.label}</span>
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
              onClick={() => setShowMap(false)}
              className={`btn ${!showMap ? 'btn-primary' : 'btn-outline-primary'} rounded-start-pill text-decoration-none whitespace-nowrap`}
            >
              <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                <i className="ri-list-check"></i>
              </div>
              List View
            </button>
            <button
              onClick={() => setShowMap(true)}
              className={`btn ${showMap ? 'btn-primary' : 'btn-outline-primary'} rounded-end-pill text-decoration-none whitespace-nowrap`}
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
      {showMap && (
        <div className="container mb-4">
          <div className="card border-0 rounded-4 overflow-hidden">
            <div style={{ height: '400px', position: 'relative' }}>
              <iframe
                src={`https://maps.google.com/maps?q=${filteredClinics.map(c => `${c.coordinates.lat},${c.coordinates.lng}`).join('|')}&output=embed&z=12`}
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

      {/* Clinics List */}
      <div className="container pb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-semibold mb-0">
            {filteredClinics.length} clinic{filteredClinics.length !== 1 ? 's' : ''} found
          </h5>
          <small className="text-muted">Sorted by distance</small>
        </div>

        <div className="row g-3">
          {filteredClinics.map((clinic) => (
            <div key={clinic.id} className="col-12">
              <div className="card border-0 rounded-4 card-hover">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{clinic.name}</h6>
                      <p className="small text-muted mb-1">
                        <i className="ri-map-pin-line me-1"></i>
                        {clinic.address}
                      </p>
                      <p className="small text-muted mb-0">
                        <i className="ri-time-line me-1"></i>
                        {clinic.hours}
                      </p>
                    </div>
                    <span className="badge rounded-pill" style={{ backgroundColor: 'var(--primary-purple)', color: 'white' }}>
                      {clinic.distance}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h6 className="small fw-semibold mb-2">Services Available:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {clinic.services.map((service, index) => (
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
                      {clinic.languages.map((language, index) => (
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
                      href={`tel:${clinic.phone}`}
                      className="btn btn-outline-primary btn-sm rounded-pill flex-grow-1 text-decoration-none whitespace-nowrap"
                    >
                      <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                        <i className="ri-phone-line"></i>
                      </div>
                      Call Now
                    </a>
                    <a 
                      href={`https://maps.google.com/maps?q=${clinic.coordinates.lat},${clinic.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm rounded-pill text-white text-decoration-none whitespace-nowrap"
                      style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}
                    >
                      <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                        <i className="ri-navigation-line"></i>
                      </div>
                      Directions
                    </a>
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