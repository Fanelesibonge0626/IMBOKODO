'use client';

import { useState, useEffect } from 'react';

interface CycleData {
  lastPeriodDate: string;
  cycleLength: number;
  nextPeriodDate: string;
  ovulationDate: string;
  currentPhase: string;
  daysUntilNext: number;
}

export default function CyclePage() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [showTips, setShowTips] = useState(false);

  const calculateCycle = () => {
    if (!lastPeriodDate) return;

    const lastPeriod = new Date(lastPeriodDate);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLength);

    const ovulation = new Date(lastPeriod);
    ovulation.setDate(lastPeriod.getDate() + Math.floor(cycleLength / 2));

    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const daysUntilNext = Math.floor((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let currentPhase = '';
    if (daysSinceLastPeriod <= 5) {
      currentPhase = 'Menstrual Phase';
    } else if (daysSinceLastPeriod <= 13) {
      currentPhase = 'Follicular Phase';
    } else if (daysSinceLastPeriod <= 16) {
      currentPhase = 'Ovulation Phase';
    } else {
      currentPhase = 'Luteal Phase';
    }

    const data: CycleData = {
      lastPeriodDate,
      cycleLength,
      nextPeriodDate: nextPeriod.toLocaleDateString(),
      ovulationDate: ovulation.toLocaleDateString(),
      currentPhase,
      daysUntilNext
    };

    setCycleData(data);
    localStorage.setItem('cycleData', JSON.stringify(data));
    setShowTips(true);
  };

  useEffect(() => {
    const savedData = localStorage.getItem('cycleData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setCycleData(data);
      setLastPeriodDate(data.lastPeriodDate);
      setCycleLength(data.cycleLength);
      setShowTips(true);
    }
  }, []);

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Menstrual Phase': return '#DC2626';
      case 'Follicular Phase': return '#059669';
      case 'Ovulation Phase': return '#7C3AED';
      case 'Luteal Phase': return '#EA580C';
      default: return '#6B7280';
    }
  };

  const getPhaseTips = (phase: string) => {
    const tips = {
      'Menstrual Phase': {
        nutrition: ['Iron-rich foods (spinach, red meat)', 'Warm herbal teas', 'Dark chocolate for magnesium'],
        exercise: ['Gentle yoga', 'Light walking', 'Stretching exercises'],
        selfCare: ['Use heating pads for cramps', 'Take warm baths', 'Get extra rest']
      },
      'Follicular Phase': {
        nutrition: ['Fresh fruits and vegetables', 'Lean proteins', 'Whole grains'],
        exercise: ['Cardio workouts', 'Strength training', 'High-energy activities'],
        selfCare: ['Plan new projects', 'Socialize more', 'Try new activities']
      },
      'Ovulation Phase': {
        nutrition: ['Antioxidant-rich foods', 'Healthy fats (avocado, nuts)', 'Plenty of water'],
        exercise: ['High-intensity workouts', 'Dancing', 'Team sports'],
        selfCare: ['Schedule important meetings', 'Express creativity', 'Connect with others']
      },
      'Luteal Phase': {
        nutrition: ['Complex carbohydrates', 'Calcium-rich foods', 'Reduce caffeine'],
        exercise: ['Moderate cardio', 'Pilates', 'Swimming'],
        selfCare: ['Practice mindfulness', 'Organize your space', 'Prepare for next cycle']
      }
    };
    return tips[phase as keyof typeof tips] || tips['Menstrual Phase'];
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div 
        className="text-white py-4"
        style={{ background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' }}
      >
        <div className="container">
          <h1 className="h3 fw-bold mb-1">HerCycle Tracker</h1>
          <p className="mb-0 opacity-90">Landela umjikelezo wakho wenyanga</p>
        </div>
      </div>

      <div className="container py-4">
        {/* Input Form */}
        {!cycleData && (
          <div className="card border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Let's Track Your Cycle</h5>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  When was your last period? / Kwakubani umjikelezo wakho wokugcina?
                </label>
                <input
                  type="date"
                  className="form-control form-control-lg rounded-3"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Average cycle length (days)
                </label>
                <div className="row align-items-center">
                  <div className="col-8">
                    <input
                      type="range"
                      className="form-range"
                      min="21"
                      max="35"
                      value={cycleLength}
                      onChange={(e) => setCycleLength(Number(e.target.value))}
                    />
                  </div>
                  <div className="col-4">
                    <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
                      {cycleLength} days
                    </span>
                  </div>
                </div>
                <small className="text-muted">Most cycles are 21-35 days long</small>
              </div>

              <button
                onClick={calculateCycle}
                disabled={!lastPeriodDate}
                className="btn btn-lg w-100 rounded-pill fw-semibold text-white text-decoration-none whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' }}
              >
                <div className="w-5 h-5 d-flex align-items-center justify-content-center me-2">
                  <i className="ri-calendar-check-line"></i>
                </div>
                Calculate My Cycle
              </button>
            </div>
          </div>
        )}

        {/* Cycle Overview */}
        {cycleData && (
          <>
            <div className="card border-0 rounded-4 mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold">Your Cycle Overview</h5>
                  <button
                    onClick={() => {
                      setCycleData(null);
                      setShowTips(false);
                      localStorage.removeItem('cycleData');
                    }}
                    className="btn btn-outline-secondary btn-sm rounded-pill text-decoration-none whitespace-nowrap"
                  >
                    <div className="w-4 h-4 d-flex align-items-center justify-content-center me-1">
                      <i className="ri-edit-line"></i>
                    </div>
                    Update
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-center p-3 rounded-3" style={{ backgroundColor: 'var(--light-purple)' }}>
                      <div className="h4 fw-bold" style={{ color: 'var(--primary-purple)' }}>
                        {cycleData.daysUntilNext > 0 ? cycleData.daysUntilNext : 'Today!'}
                      </div>
                      <small className="text-muted">Days until next period</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 rounded-3" style={{ backgroundColor: 'var(--light-pink)' }}>
                      <div className="h4 fw-bold" style={{ color: getPhaseColor(cycleData.currentPhase) }}>
                        {cycleData.currentPhase.split(' ')[0]}
                      </div>
                      <small className="text-muted">Current phase</small>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="row g-2 text-center">
                    <div className="col-6">
                      <small className="text-muted d-block">Next Period</small>
                      <span className="fw-semibold">{cycleData.nextPeriodDate}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Ovulation Date</small>
                      <span className="fw-semibold">{cycleData.ovulationDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase-based Tips */}
            {showTips && (
              <div className="card border-0 rounded-4 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">
                    <span 
                      className="badge rounded-pill me-2 px-3 py-2"
                      style={{ backgroundColor: getPhaseColor(cycleData.currentPhase), color: 'white' }}
                    >
                      {cycleData.currentPhase}
                    </span>
                    Health Tips for You
                  </h5>

                  <div className="row g-3">
                    <div className="col-12 col-md-4">
                      <div className="h-100 p-3 rounded-3 bg-light">
                        <h6 className="fw-semibold mb-2">
                          <div className="w-5 h-5 d-flex align-items-center justify-content-center me-2 d-inline-flex">
                            <i className="ri-restaurant-line" style={{ color: 'var(--primary-purple)' }}></i>
                          </div>
                          Nutrition
                        </h6>
                        <ul className="list-unstyled small">
                          {getPhaseTips(cycleData.currentPhase).nutrition.map((tip, index) => (
                            <li key={index} className="mb-1">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="h-100 p-3 rounded-3 bg-light">
                        <h6 className="fw-semibold mb-2">
                          <div className="w-5 h-5 d-flex align-items-center justify-content-center me-2 d-inline-flex">
                            <i className="ri-run-line" style={{ color: 'var(--primary-pink)' }}></i>
                          </div>
                          Exercise
                        </h6>
                        <ul className="list-unstyled small">
                          {getPhaseTips(cycleData.currentPhase).exercise.map((tip, index) => (
                            <li key={index} className="mb-1">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="h-100 p-3 rounded-3 bg-light">
                        <h6 className="fw-semibold mb-2">
                          <div className="w-5 h-5 d-flex align-items-center justify-content-center me-2 d-inline-flex">
                            <i className="ri-heart-line" style={{ color: 'var(--primary-purple)' }}></i>
                          </div>
                          Self-Care
                        </h6>
                        <ul className="list-unstyled small">
                          {getPhaseTips(cycleData.currentPhase).selfCare.map((tip, index) => (
                            <li key={index} className="mb-1">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cycle Calendar Visual */}
            <div className="card border-0 rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Cycle Calendar</h5>
                <div className="text-center">
                  <div 
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      background: `linear-gradient(135deg, ${getPhaseColor(cycleData.currentPhase)} 0%, ${getPhaseColor(cycleData.currentPhase)}80 100%)`,
                      color: 'white'
                    }}
                  >
                    <div className="text-center">
                      <div className="h3 fw-bold mb-0">
                        {cycleData.daysUntilNext > 0 ? cycleData.daysUntilNext : '0'}
                      </div>
                      <small>days left</small>
                    </div>
                  </div>
                  <p className="text-muted">
                    You are currently in your <strong>{cycleData.currentPhase.toLowerCase()}</strong>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}