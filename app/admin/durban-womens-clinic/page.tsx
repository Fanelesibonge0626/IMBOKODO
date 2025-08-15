'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminGuard from '../../../components/AdminGuard';

interface Booking {
  id: number;
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
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

type BookingStatus = 'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed';

function DurbanWomensClinicAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load all bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('shecare-bookings') || '[]');
    
    // Filter bookings for Durban Women's Health Clinic only
    const clinicBookings = allBookings.filter((booking: Booking) => 
      booking.providerName === 'Durban Women\'s Health Clinic'
    );
    
    setBookings(clinicBookings);
    setFilteredBookings(clinicBookings);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Filter bookings based on status and search term
    let filtered = bookings;

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.patientPhone.includes(searchTerm) ||
        booking.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, selectedStatus, searchTerm]);

  const updateBookingStatus = (bookingId: number, newStatus: Booking['status']) => {
    // Update local state
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);

    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem('shecare-bookings') || '[]');
    const updatedAllBookings = allBookings.map((booking: Booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    localStorage.setItem('shecare-bookings', JSON.stringify(updatedAllBookings));
  };

  const handleAdminLogout = () => {
    // Clear admin session
    localStorage.removeItem('shecare-admin-session');
    // Redirect to admin login
    router.push('/admin/login');
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'fas fa-clock';
      case 'confirmed': return 'fas fa-check-circle';
      case 'cancelled': return 'fas fa-times-circle';
      case 'completed': return 'fas fa-check-double';
      default: return 'fas fa-circle';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;

    return { total, pending, confirmed, completed, cancelled };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <i className="fas fa-hospital text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Durban Women's Health Clinic</h1>
                <p className="text-white/80">Administrative Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right mr-4">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-white/80 text-sm">Total Bookings</div>
              </div>
              <button
                onClick={handleAdminLogout}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                title="Admin Logout"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <i className="fas fa-calendar text-blue-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3 mr-4">
                <i className="fas fa-clock text-yellow-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <i className="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.confirmed}</div>
                <div className="text-sm text-gray-600">Confirmed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <i className="fas fa-check-double text-blue-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <i className="fas fa-times-circle text-red-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.cancelled}</div>
                <div className="text-sm text-gray-600">Cancelled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {(['all', 'pending', 'confirmed', 'cancelled', 'completed'] as BookingStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${getStatusIcon(status === 'all' ? 'pending' : status)} mr-2`}></i>
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Appointment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.patientName}</div>
                        <div className="text-sm text-gray-500">{booking.patientPhone}</div>
                        {booking.patientEmail && (
                          <div className="text-sm text-gray-500">{booking.patientEmail}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(booking.appointmentDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(booking.appointmentTime)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.serviceType}</div>
                        <div className="text-sm text-gray-500">{booking.preferredLanguage}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        <i className={`${getStatusIcon(booking.status)} mr-1`}></i>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                              title="Confirm"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="text-blue-600 hover:text-blue-900"
                            title="Mark as Completed"
                          >
                            <i className="fas fa-check-double"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'Try adjusting your filters or search terms'
                  : 'No bookings have been made yet'
                }
              </p>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-gray-900">{selectedBooking.patientName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone Number</label>
                      <p className="text-gray-900">{selectedBooking.patientPhone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email Address</label>
                      <p className="text-gray-900">{selectedBooking.patientEmail || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Preferred Language</label>
                      <p className="text-gray-900">{selectedBooking.preferredLanguage}</p>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date</label>
                      <p className="text-gray-900">{formatDate(selectedBooking.appointmentDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Time</label>
                      <p className="text-gray-900">{formatTime(selectedBooking.appointmentTime)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Service Type</label>
                      <p className="text-gray-900">{selectedBooking.serviceType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                        <i className={`${getStatusIcon(selectedBooking.status)} mr-1`}></i>
                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reason for Visit */}
                {selectedBooking.reason && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Reason for Visit</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedBooking.reason}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center space-x-3 pt-4 border-t">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking.id, 'confirmed');
                          setSelectedBooking(null);
                        }}
                        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <i className="fas fa-check mr-2"></i>
                        Confirm Appointment
                      </button>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking.id, 'cancelled');
                          setSelectedBooking(null);
                        }}
                        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <i className="fas fa-times mr-2"></i>
                        Cancel Appointment
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'confirmed' && (
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'completed');
                        setSelectedBooking(null);
                      }}
                      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <i className="fas fa-check-double mr-2"></i>
                      Mark as Completed
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <DurbanWomensClinicAdmin />
    </AdminGuard>
  );
}
