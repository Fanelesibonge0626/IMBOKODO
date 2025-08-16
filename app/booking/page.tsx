'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface BookingForm {
  providerName: string;
  providerType: string;
  providerPhone: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  reason: string;
  preferredLanguage: string;
}

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<BookingForm>({
    providerName: '',
    providerType: '',
    providerPhone: '',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceType: '',
    reason: '',
    preferredLanguage: 'English'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Get provider details from URL parameters
    const provider = searchParams.get('provider');
    const type = searchParams.get('type');
    const phone = searchParams.get('phone');

    if (provider && type && phone) {
      setFormData(prev => ({
        ...prev,
        providerName: decodeURIComponent(provider),
        providerType: type,
        providerPhone: phone
      }));
    }
  }, [searchParams]);

  const serviceTypes = [
    'Prenatal Care',
    'Family Planning',
    'Reproductive Health',
    'General Consultation',
    'Ultrasound',
    'Vaccination',
    'Counselling',
    'Emergency Care',
    'Follow-up Visit',
    'Other'
  ];

  const languages = [
    'English',
    'isiZulu',
    'isiXhosa',
    'Afrikaans',
    'Sesotho',
    'Setswana',
    'siSwati',
    'Tshivenda',
    'Xitsonga',
    'isiNdebele',
    'Sepedi'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save booking to localStorage (in a real app, this would go to a database)
      const bookings = JSON.parse(localStorage.getItem('shecare-bookings') || '[]');
      const newBooking = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      bookings.push(newBooking);
      localStorage.setItem('shecare-bookings', JSON.stringify(bookings));
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <i className="fas fa-check text-green-600 text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your appointment request has been submitted successfully. The clinic will contact you within 24 hours to confirm your appointment.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 text-left">
              <p className="text-sm text-gray-600">Provider</p>
              <p className="font-semibold text-gray-900">{formData.providerName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-left">
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-semibold text-gray-900">
                {new Date(formData.appointmentDate).toLocaleDateString()} at {formData.appointmentTime}
              </p>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <Link
              href="/clinics"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Back to Clinics
            </Link>
            <Link
              href="/dashboard"
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/community"
                className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-4 hover:bg-white/30 transition-colors"
              >
                <i className="fas fa-arrow-left text-white"></i>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Book Appointment</h1>
                <p className="text-white/80">Schedule your healthcare visit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Provider Info Card */}
          {formData.providerName && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
              <div className="flex items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                  <i className="fas fa-clinic-medical text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{formData.providerName}</h2>
                  <p className="text-white/80 capitalize">{formData.providerType}</p>
                  <p className="text-white/60">{formData.providerPhone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="patientPhone"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="patientEmail"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      required
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="appointmentTime"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Visit
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Please describe your reason for visiting (optional)"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language
                    </label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {languages.map((language) => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Book Appointment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/clinics"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Clinics
        </Link>
      </div>
    </div>
  );
}
