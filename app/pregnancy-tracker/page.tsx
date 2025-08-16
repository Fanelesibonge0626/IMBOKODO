'use client';

import { useState, useEffect } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useRouter } from 'next/navigation';

export default function PregnancyTrackerPage() {
  const { user, loading } = useFirebase();
  const router = useRouter();
  const [lmpDate, setLmpDate] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const calculatePregnancyWeek = (lmp: string) => {
    if (!lmp) return 0;
    
    const lmpDate = new Date(lmp);
    const today = new Date();
    const diffTime = today.getTime() - lmpDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.floor(diffDays / 7);
    
    return Math.min(Math.max(week, 0), 40);
  };

  const calculateDueDate = (lmp: string) => {
    if (!lmp) return '';
    
    const lmpDate = new Date(lmp);
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks = 280 days
    
    return dueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLMPChange = (date: string) => {
    setLmpDate(date);
    const week = calculatePregnancyWeek(date);
    setCurrentWeek(week);
    setDueDate(calculateDueDate(date));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-600">Loading pregnancy tracker...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const progressPercentage = (currentWeek / 40) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-3">Pregnancy Tracker</h1>
          <p className="text-xl text-blue-600">Your Week-by-Week Journey</p>
        </div>

        {/* LMP Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Calculate Your Pregnancy Week</h2>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Last Menstrual Period (LMP)
              </label>
              <input
                type="date"
                value={lmpDate}
                onChange={(e) => handleLMPChange(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <button
              onClick={() => handleLMPChange(lmpDate)}
              disabled={!lmpDate}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Progress Section */}
        {currentWeek > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-800 mb-2">
                Week {currentWeek} of 40
              </h2>
              <p className="text-blue-600 mb-4">
                Due Date: {dueDate}
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-blue-600 mb-2">
                <span>Week 1</span>
                <span>Week 40</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-blue-600">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Current Week Information */}
        {currentWeek > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                Week {currentWeek} Update
              </h2>
              <p className="text-blue-600">
                Baby is developing well!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Baby Development */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <i className="fas fa-baby text-blue-500 mr-2"></i>
                  Baby's Development
                </h3>
                <p className="text-blue-700">
                  Your baby is growing and developing rapidly this week. All major organs are forming and developing.
                </p>
              </div>

              {/* Mother's Changes */}
              <div className="bg-pink-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-pink-800 mb-3 flex items-center">
                  <i className="fas fa-heart text-pink-500 mr-2"></i>
                  Your Changes
                </h3>
                <p className="text-pink-700">
                  Your body is adapting to support your growing baby. You may experience various pregnancy symptoms.
                </p>
              </div>
            </div>

            {/* Doctor's Tip */}
            <div className="mt-6 bg-green-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <i className="fas fa-stethoscope text-green-500 mr-2"></i>
                Doctor's Tip
              </h3>
              <p className="text-green-700">
                Continue with regular prenatal care and maintain a healthy lifestyle. Stay hydrated and get plenty of rest.
              </p>
            </div>
          </div>
        )}

        {/* Emergency Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => {
              alert('Emergency contact feature coming soon. For immediate medical emergencies, call 10111 or visit your nearest hospital.');
            }}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
            title="Emergency Contact"
          >
            <i className="fas fa-phone text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
