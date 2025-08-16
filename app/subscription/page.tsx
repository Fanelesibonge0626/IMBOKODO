'use client';

import { useState, useEffect } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { subscriptionPlans, getPopularPlan } from '../../lib/subscriptionPlans';

export default function SubscriptionPage() {
  const { user, loading, updateDocument } = useFirebase();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [paymentErrors, setPaymentErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    // Demo mode - payment system always ready
    console.log('Demo payment system ready');
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    if (!user) return;
    setShowPaymentModal(true);
  };

  const handlePaymentFormChange = (field: string, value: string) => {
    setPaymentFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (paymentErrors[field as keyof typeof paymentErrors]) {
      setPaymentErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePaymentForm = () => {
    const errors = {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };

    // Validate card number (16 digits)
    if (!paymentFormData.cardNumber || paymentFormData.cardNumber.length !== 16) {
      errors.cardNumber = 'Card number must be 16 digits';
    }

    // Validate expiry date (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!paymentFormData.expiryDate || !expiryRegex.test(paymentFormData.expiryDate)) {
      errors.expiryDate = 'Please enter expiry date in MM/YY format';
    }

    // Validate CVV (3 digits)
    if (!paymentFormData.cvv || paymentFormData.cvv.length !== 3) {
      errors.cvv = 'CVV must be 3 digits';
    }

    setPaymentErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handlePaymentSubmit = async () => {
    if (validatePaymentForm()) {
      // Simulate payment processing
      setTimeout(async () => {
        setShowPaymentModal(false);
        setPaymentSuccess(true);
        // Reset form
        setPaymentFormData({ cardNumber: '', expiryDate: '', cvv: '' });
        
        // Update user subscription status in Firebase
        if (user) {
          try {
            // Update user document
            await updateDocument('users', user.uid, {
              subscriptionStatus: 'premium',
              subscriptionPlan: selectedPlan,
              subscriptionDate: new Date().toISOString(),
              isPremium: true
            });

            // Create subscription document (required by SubscriptionService)
            await updateDocument('subscriptions', user.uid, {
              userId: user.uid,
              planId: selectedPlan,
              status: 'active',
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
              autoRenew: true,
              paymentMethod: 'card',
              lastPaymentDate: new Date().toISOString(),
              nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              transactionId: 'demo_' + Date.now()
            });
          } catch (error) {
            console.error('Failed to update subscription status:', error);
          }
        }
        
        // Hide success message after 5 seconds and redirect to dashboard
        setTimeout(() => {
          setPaymentSuccess(false);
          router.push('/dashboard?subscription=success');
        }, 5000);
      }, 1500);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentFormData({ cardNumber: '', expiryDate: '', cvv: '' });
    setPaymentErrors({ cardNumber: '', expiryDate: '', cvv: '' });
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

  const popularPlan = getPopularPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Unlock premium features and get access to private doctors, personalized insights, and exclusive pregnancy resources
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300 ${
                selectedPlan === plan.id ? 'ring-4 ring-purple-400 scale-105' : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-6xl font-bold text-purple-600 mb-2">
                  R{plan.price}
                </div>
                <div className="text-gray-600 capitalize">
                  per {plan.interval}
                </div>
                {plan.popular && (
                  <div className="text-sm text-green-600 font-medium mt-2">
                    Save R199.98 with annual plan
                  </div>
                )}
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                        <i className="fas fa-check text-green-600 text-sm"></i>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Complete Your Subscription
            </h3>

            <div className="space-y-4">
              <button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Subscribe Now - R{subscriptionPlans.find(p => p.id === selectedPlan)?.price}
              </button>
            </div>

            <div className="mt-6 text-center text-white/70 text-sm">
              <p>🔒 Secure payment powered by YOCO</p>
              <p>💳 All major cards accepted</p>
              <p>🔄 Cancel anytime, no questions asked</p>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Dashboard
          </Link>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-credit-card text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h3>
                <p className="text-gray-600">
                  Subscribe to {subscriptionPlans.find(p => p.id === selectedPlan)?.name} - 
                  R{subscriptionPlans.find(p => p.id === selectedPlan)?.price}
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handlePaymentSubmit(); }} className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentFormData.cardNumber}
                    onChange={(e) => handlePaymentFormChange('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      paymentErrors.cardNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    maxLength={16}
                  />
                  {paymentErrors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{paymentErrors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentFormData.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 2) {
                          handlePaymentFormChange('expiryDate', value);
                        } else if (value.length <= 4) {
                          handlePaymentFormChange('expiryDate', value.slice(0, 2) + '/' + value.slice(2));
                        }
                      }}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        paymentErrors.expiryDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                      maxLength={5}
                    />
                    {paymentErrors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.expiryDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentFormData.cvv}
                      onChange={(e) => handlePaymentFormChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        paymentErrors.cvv ? 'border-red-300' : 'border-gray-300'
                      }`}
                      maxLength={3}
                    />
                    {paymentErrors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Pay R{subscriptionPlans.find(p => p.id === selectedPlan)?.price}
                </button>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={closePaymentModal}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </form>

              <div className="mt-6 text-center text-gray-500 text-sm">
                <p>🔒 Secure payment processing</p>
                <p>💳 All major cards accepted</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {paymentSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-check text-green-600 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Payment Successful!</h3>
              <p className="text-gray-600 mb-6">Your subscription is now active.</p>
              <button
                onClick={() => setPaymentSuccess(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
