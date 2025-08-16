'use client';

import { useFirebase } from '../../hooks/useFirebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Booking {
  id: string;
  providerName: string;
  providerType: string;
  providerPhone: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export default function MyBookingsPage() {
  const { user, loading } = useFirebase();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadUserBookings();
    }
  }, [user]);

  useEffect(() => {
    filterBookings();
  }, [bookings, statusFilter]);

  const loadUserBookings = () => {
    try {
      setLoadingBookings(true);
      // Load bookings from localStorage
      const storedBookings = localStorage.getItem('shecare-bookings');
      console.log('Stored bookings:', storedBookings);
      
      if (storedBookings) {
        const allBookings: Booking[] = JSON.parse(storedBookings);
        console.log('All bookings:', allBookings);
        console.log('Current user email:', user?.email);
        
        // Filter bookings for the current user (by email)
        const userBookings = allBookings.filter(
          booking => booking.patientEmail === user?.email
        );
        console.log('User bookings:', userBookings);
        setBookings(userBookings);
      } else {
        console.log('No stored bookings found');
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const filterBookings = () => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === statusFilter));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'fas fa-check-circle';
      case 'pending':
        return 'fas fa-clock';
      case 'cancelled':
        return 'fas fa-times-circle';
      case 'completed':
        return 'fas fa-check-double';
      default:
        return 'fas fa-question-circle';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (loading || loadingBookings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading your bookings...</p>
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
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
            <p className="text-white/80">Manage your clinic appointments</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/clinics"
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Book New Appointment
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-white mb-2">{bookings.length}</div>
            <div className="text-white/80">Total Bookings</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-white/80">Confirmed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div className="text-white/80">Pending</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {bookings.filter(b => b.status === 'completed').length}
            </div>
            <div className="text-white/80">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-white font-medium">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="all" className="text-gray-800">All Bookings</option>
              <option value="pending" className="text-gray-800">Pending</option>
              <option value="confirmed" className="text-gray-800">Confirmed</option>
              <option value="completed" className="text-gray-800">Completed</option>
              <option value="cancelled" className="text-gray-800">Cancelled</option>
            </select>
            <button
              onClick={loadUserBookings}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <i className="fas fa-sync-alt mr-2"></i>
              Refresh
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No Bookings Found</h3>
              <p className="text-white/80 mb-6">
                {statusFilter === 'all' 
                  ? "You haven't made any clinic appointments yet."
                  : `No ${statusFilter} bookings found.`
                }
              </p>
              <Link
                href="/clinics"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Book Your First Appointment
              </Link>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {booking.providerName}
                        </h3>
                        <p className="text-white/80 mb-1">
                          <i className="fas fa-calendar mr-2 text-purple-400"></i>
                          {formatDate(booking.appointmentDate)}
                        </p>
                        <p className="text-white/80 mb-1">
                          <i className="fas fa-clock mr-2 text-purple-400"></i>
                          {formatTime(booking.appointmentTime)}
                        </p>
                        <p className="text-white/80">
                          <i className="fas fa-stethoscope mr-2 text-purple-400"></i>
                          {booking.reason}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          <i className={`${getStatusIcon(booking.status)} mr-2`}></i>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 lg:flex-row">
                    <a
                      href={`tel:${booking.providerPhone}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      Call Clinic
                    </a>
                    <Link
                      href={`/clinics`}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-center"
                    >
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      View Clinic
                    </Link>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
                    <div>
                      <span className="font-medium">Booking ID:</span> {booking.id}
                    </div>
                    <div>
                      <span className="font-medium">Booked on:</span> {formatDate(booking.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
