'use client';

import { useState, useEffect } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { subscriptionPlans, getPopularPlan } from '../../lib/subscriptionPlans';
import { YocoPaymentService } from '../../lib/yocoPayment';
import SubscriptionService from '../../lib/subscriptionService';

export default function SubscriptionPage() {
  const { user, loading } = useFirebase();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSystemStatus, setPaymentSystemStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [processingStep, setProcessingStep] = useState<string>('');
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  useEffect(() => {
    // Load YOCO script when component mounts
    if (typeof window !== 'undefined') {
      YocoPaymentService.loadYocoScript()
        .then(() => {
          console.log('YOCO script loaded successfully');
          setPaymentSystemStatus('ready');
        })
        .catch((error) => {
          console.error('Failed to load YOCO script:', error);
          setPaymentSystemStatus('error');
        });
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setPaymentError('');
  };

  const handleCancelSubscription = () => {
    if (abortController) {
      abortController.abort();
    }
    setIsProcessing(false);
    setProcessingStep('');
    setPaymentError('Operation cancelled by user');
  };

  const handleSubscribe = async () => {
    if (!user) return;

    setIsProcessing(true);
    setPaymentError('');
    setProcessingStep('Initializing payment...');
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const plan = subscriptionPlans.find(p => p.id === selectedPlan);
      if (!plan) throw new Error('Invalid plan selected');

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out after 30 seconds')), 30000);
      });

      const subscriptionPromise = (async () => {
        setProcessingStep('Creating payment intent...');
        const yocoService = YocoPaymentService.getInstance();
        const paymentIntent = await yocoService.createPaymentIntent(plan.price);

        setProcessingStep('Processing payment...');
        const paymentResult = await yocoService.processPayment(null, plan.price);

        if (paymentResult.success) {
          setProcessingStep('Creating subscription in Firebase...');
          const subscriptionService = SubscriptionService.getInstance();
          
          const success = await subscriptionService.createSubscription(
            user.uid,
            selectedPlan,
            paymentResult.transactionId!
          );

          if (success) {
            setProcessingStep('Subscription successful! Redirecting...');
            router.push('/dashboard?subscription=success');
          } else {
            throw new Error('Failed to create subscription');
          }
        } else {
          throw new Error(paymentResult.error || 'Payment failed');
        }
      })();

      await Promise.race([subscriptionPromise, timeoutPromise]);
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Subscription operation cancelled by user');
        return;
      }
      console.error('Subscription error:', error);
      
      if (error.message?.includes('timed out')) {
        setPaymentError('Operation timed out. Please check your internet connection and try again.');
      } else if (error.message?.includes('Database not available')) {
        setPaymentError('Database connection error. Please check your internet connection and try again.');
      } else if (error.message?.includes('permission')) {
        setPaymentError('Permission denied. Please contact support.');
      } else if (error.code === 'permission-denied') {
        setPaymentError('Access denied. Please contact support.');
      } else if (error.code === 'unavailable') {
        setPaymentError('Service temporarily unavailable. Please try again later.');
      } else if (error.message?.includes('Failed to load YOCO script')) {
        setPaymentError('Payment system temporarily unavailable. Please try again in a few moments.');
      } else if (error.message?.includes('Failed to initialize payment system')) {
        setPaymentError('Payment system initialization failed. Please try again.');
      } else if (error.message?.includes('Payment system unavailable')) {
        setPaymentError('Payment system unavailable. Please try again later.');
      } else {
        setPaymentError(`An error occurred: ${error.message || 'Please try again.'}`);
      }
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
      setAbortController(null);
    }
  };

  const handleMockSubscription = async () => {
    if (!user) return;

    setIsProcessing(true);
    setPaymentError('');
    setProcessingStep('Creating subscription...');
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const subscriptionService = SubscriptionService.getInstance();
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out after 30 seconds')), 30000);
      });
      
      const subscriptionPromise = (async () => {
        setProcessingStep('Creating mock subscription...');
        const success = await subscriptionService.createMockSubscription(user.uid);

        if (success) {
          setProcessingStep('Subscription successful! Redirecting...');
          router.push('/dashboard?subscription=success');
        } else {
          throw new Error('Failed to create mock subscription');
        }
      })();

      await Promise.race([subscriptionPromise, timeoutPromise]);

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Subscription operation cancelled by user');
        return;
      }
      console.error('Mock subscription error:', error);
      
      if (error.message?.includes('timed out')) {
        setPaymentError('Operation timed out. Please check your internet connection and try again.');
      } else if (error.message?.includes('Database not available')) {
        setPaymentError('Database connection error. Please check your internet connection and try again.');
      } else if (error.message?.includes('permission')) {
        setPaymentError('Permission denied. Please contact support.');
      } else if (error.code === 'permission-denied') {
        setPaymentError('Access denied. Please contact support.');
      } else if (error.code === 'unavailable') {
        setPaymentError('Service temporarily unavailable. Please try again later.');
      } else {
        setPaymentError(`An error occurred: ${error.message || 'Please try again.'}`);
      }
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
      setAbortController(null);
    }
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

            {/* Payment System Status */}
            <div className="mb-6 text-center">
              {paymentSystemStatus === 'loading' && (
                <div className="bg-blue-100 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                    <span>Loading payment system...</span>
                  </div>
                </div>
              )}
              
              {paymentSystemStatus === 'error' && (
                <div className="bg-yellow-100 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center justify-center">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    <span>Payment system temporarily unavailable. You can still test the subscription.</span>
                  </div>
                </div>
              )}
              
              {paymentSystemStatus === 'ready' && (
                <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center justify-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>Payment system ready</span>
                  </div>
                </div>
              )}
            </div>

            {paymentError && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {paymentError}
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleSubscribe}
                disabled={isProcessing || paymentSystemStatus === 'loading'}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {processingStep || 'Processing...'}
                  </div>
                ) : paymentSystemStatus === 'loading' ? (
                  'Loading Payment System...'
                ) : (
                  `Subscribe Now - R${subscriptionPlans.find(p => p.id === selectedPlan)?.price}`
                )}
              </button>

              {/* Development/Testing Button */}
              <button
                onClick={handleMockSubscription}
                disabled={isProcessing || paymentSystemStatus === 'loading'}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {processingStep || 'Processing...'}
                  </div>
                ) : (
                  '🧪 Test Subscription (Development)'
                )}
              </button>

              {/* Cancel Button - Only show when processing */}
              {isProcessing && (
                <button
                  onClick={handleCancelSubscription}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-700 transition-all"
                >
                  ❌ Cancel Operation
                </button>
              )}
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
      </div>
    </div>
  );
}
