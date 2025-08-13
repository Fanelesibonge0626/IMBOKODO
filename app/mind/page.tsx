'use client';

import { useState, useEffect } from 'react';

export default function MindPage() {
  const [stressLevel, setStressLevel] = useState(5);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showSOS, setShowSOS] = useState(false);
  const [currentExercise, setCurrentExercise] = useState('breathing');

  const stressEmojis = ['😌', '🙂', '😐', '😟', '😰', '😱', '😭', '💔', '🆘', '🔥'];
  const stressLabels = [
    'Very Calm', 'Relaxed', 'Neutral', 'Slightly Stressed', 
    'Stressed', 'Very Stressed', 'Overwhelmed', 'Panic', 'Crisis', 'Emergency'
  ];

  const quotes = [
    {
      text: "You are stronger than you think, braver than you feel, and more loved than you know.",
      author: "Mama Winnie Mandela's spirit"
    },
    {
      text: "Sawubona Sisi, your feelings are valid. Take it one breath at a time.",
      author: "Ubuntu Wisdom"
    },
    {
      text: "Like the African sunrise, each day brings new hope and possibilities.",
      author: "Ancient Proverb"
    },
    {
      text: "Uyakwazi - You are capable. Your ancestors' strength flows through you.",
      author: "Zulu Wisdom"
    },
    {
      text: "Even the strongest trees bend in the wind, but they don't break.",
      author: "Nature's Teaching"
    },
    {
      text: "Your mental health matters. Seeking help is a sign of wisdom, not weakness.",
      author: "Modern Ubuntu"
    }
  ];

  const helplines = [
    { name: 'SADAG Crisis Line', number: '0800 567 567', description: '24/7 Mental Health Support', icon: 'ri-phone-line' },
    { name: 'Lifeline', number: '0861 322 322', description: 'Crisis Counselling', icon: 'ri-heart-pulse-line' },
    { name: 'Women\'s Line', number: '0800 150 150', description: 'Women-specific Support', icon: 'ri-women-line' },
    { name: 'Stop Gender Violence', number: '0800 150 150', description: 'Gender-based Violence', icon: 'ri-shield-check-line' },
    { name: 'Childline', number: '116', description: 'Child Protection Services', icon: 'ri-heart-line' },
    { name: 'Emergency Services', number: '10111', description: 'Police Emergency', icon: 'ri-alarm-warning-line' }
  ];

  const exercises = [
    {
      id: 'breathing',
      title: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8',
      icon: 'ri-lungs-line',
      color: 'gradient-purple'
    },
    {
      id: 'meditation',
      title: 'Mindful Meditation',
      description: 'Focus on the present moment',
      icon: 'ri-mind-map',
      color: 'gradient-pink'
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding',
      description: 'Use your senses to stay present',
      icon: 'ri-plant-line',
      color: 'gradient-mixed'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathingTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathingTimer(0);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setBreathingTimer(0);
  };

  const generateNewQuote = () => {
    const newIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(newIndex);
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return '#10B981';
    if (level <= 6) return '#F59E0B';
    return '#EF4444';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-vh-100">
      {/* Modern Hero Section */}
      <div className="gradient-mixed position-relative overflow-hidden" style={{ minHeight: '60vh' }}>
        {/* Floating Elements */}
        <div className="position-absolute" style={{ top: '15%', right: '10%', opacity: '0.1' }}>
          <i className="ri-brain-line" style={{ fontSize: '6rem' }}></i>
        </div>
        <div className="position-absolute" style={{ bottom: '20%', left: '8%', opacity: '0.1' }}>
          <i className="ri-heart-pulse-line" style={{ fontSize: '5rem' }}></i>
        </div>
        
        <div className="container position-relative">
          <div className="row align-items-center min-vh-60">
            <div className="col-12 col-lg-8 text-white">
              <div className="mb-4">
                <span className="badge badge-modern glass-card text-purple-600 mb-3">
                  🧠 Mental Wellness Hub
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4 lh-1">
                Your Mind
                <span className="d-block">Matters</span>
              </h1>
              <p className="lead mb-4 fs-5 opacity-90">
                Impilo yengqondo yakho ibalulekile. Take care of your mental health with guided exercises and support.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <button 
                  onClick={startBreathing}
                  className="btn btn-modern glass-card text-white text-decoration-none px-4 py-3 fw-semibold"
                >
                  <i className="ri-lungs-line me-2"></i>
                  Start Breathing Exercise
                </button>
                <button 
                  onClick={() => setShowSOS(true)}
                  className="btn btn-modern btn-glass text-decoration-none px-4 py-3"
                >
                  <i className="ri-phone-line me-2"></i>
                  Get Support
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-4 d-none d-lg-block">
              <div className="position-relative">
                <img 
                  src="https://readdy.ai/api/search-image?query=Peaceful%20African%20woman%20meditating%20in%20serene%20natural%20setting%2C%20soft%20morning%20light%2C%20wellness%20and%20mindfulness%20theme%2C%20purple%20and%20pink%20color%20scheme%2C%20modern%20minimalist%20style%2C%20calming%20atmosphere%2C%20mental%20health%20wellness%20concept&width=500&height=600&seq=mind-hero&orientation=portrait"
                  alt="Mental wellness"
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Modern Mood Check-in */}
        <div className="modern-card p-5 mb-5">
          <div className="text-center mb-4">
            <span className="badge badge-modern gradient-purple text-white mb-3">
              ✨ Daily Check-in
            </span>
            <h3 className="fw-bold mb-3">How are you feeling today?</h3>
            <p className="text-muted">Your emotional well-being matters to us</p>
          </div>
          
          <div className="row align-items-center">
            <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
              <div 
                className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center glass-card shadow-lg"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  backgroundColor: getStressColor(stressLevel),
                  fontSize: '3.5rem'
                }}
              >
                {stressEmojis[stressLevel - 1]}
              </div>
              <h5 className="fw-bold" style={{ color: getStressColor(stressLevel) }}>
                {stressLabels[stressLevel - 1]}
              </h5>
            </div>
            
            <div className="col-12 col-md-8">
              <div className="mb-4">
                <input
                  type="range"
                  className="form-range mb-3"
                  min="1"
                  max="10"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(Number(e.target.value))}
                  style={{ accentColor: getStressColor(stressLevel) }}
                />
                <div className="d-flex justify-content-between text-muted">
                  <small className="d-flex align-items-center">
                    <span className="me-1">😌</span> Very Calm
                  </small>
                  <small className="d-flex align-items-center">
                    <span className="me-1">🔥</span> Emergency
                  </small>
                </div>
              </div>

              {stressLevel >= 8 && (
                <div className="glass-card p-3 border-danger border border-opacity-25">
                  <div className="d-flex align-items-center text-danger">
                    <i className="ri-alarm-warning-line me-2"></i>
                    <strong>You seem to be in distress.</strong>
                  </div>
                  <p className="mb-0 mt-2 small">Consider reaching out for support or using emergency resources below.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modern Wellness Exercises */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge badge-modern gradient-mixed text-white mb-3">
              🌱 Wellness Toolkit
            </span>
            <h3 className="fw-bold mb-3">Choose Your Exercise</h3>
            <p className="text-muted">Select what feels right for you today</p>
          </div>

          <div className="row g-3 mb-4">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="col-12 col-md-4">
                <button
                  onClick={() => setCurrentExercise(exercise.id)}
                  className={`modern-card text-start w-100 border-0 p-4 h-100 ${
                    currentExercise === exercise.id ? exercise.color + ' text-white' : ''
                  }`}
                >
                  <div className="d-flex align-items-center mb-3">
                    <div className={`rounded-3 p-3 me-3 ${
                      currentExercise === exercise.id ? 'glass-card' : 'bg-light'
                    }`}>
                      <i className={`${exercise.icon} fs-4`}></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">{exercise.title}</h6>
                      <small className={currentExercise === exercise.id ? 'opacity-75' : 'text-muted'}>
                        {exercise.description}
                      </small>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Breathing Exercise Interface */}
          {currentExercise === 'breathing' && (
            <div className="modern-card p-5 text-center gradient-purple text-white">
              <h4 className="fw-bold mb-4">Guided Breathing Exercise</h4>
              
              <div 
                className={`rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center glass-card ${isBreathing ? 'breathing-animation' : ''}`}
                style={{ 
                  width: '180px', 
                  height: '180px'
                }}
              >
                <div className="text-center">
                  <i className="ri-lungs-line fs-1 mb-2"></i>
                  {isBreathing && (
                    <div className="fw-bold">
                      {formatTime(breathingTimer)}
                    </div>
                  )}
                </div>
              </div>

              <p className="mb-4 fs-5 opacity-90">
                {isBreathing 
                  ? "Inhale for 4 counts, hold for 7, exhale for 8. Follow the rhythm."
                  : "Take a moment to center yourself with conscious breathing"
                }
              </p>

              <div className="d-flex gap-3 justify-content-center">
                {!isBreathing ? (
                  <button
                    onClick={startBreathing}
                    className="btn btn-modern glass-card text-white text-decoration-none px-5 py-3 fw-semibold"
                  >
                    <i className="ri-play-circle-line me-2"></i>
                    Begin Session
                  </button>
                ) : (
                  <button
                    onClick={stopBreathing}
                    className="btn btn-modern btn-glass text-decoration-none px-5 py-3"
                  >
                    <i className="ri-stop-circle-line me-2"></i>
                    End Session
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modern Inspiration Section */}
        <div className="modern-card p-5 mb-5 text-center">
          <span className="badge badge-modern gradient-pink text-white mb-4">
            💫 Daily Inspiration
          </span>
          
          <div className="position-relative">
            <div className="glass-card p-5 rounded-4">
              <i className="ri-double-quotes-l fs-1 text-purple-500 mb-4"></i>
              <blockquote className="h5 fw-normal mb-4 text-dark lh-base">
                "{quotes[currentQuote].text}"
              </blockquote>
              <cite className="text-muted fs-6">— {quotes[currentQuote].author}</cite>
            </div>
          </div>

          <button
            onClick={generateNewQuote}
            className="btn btn-modern gradient-mixed text-white mt-4 text-decoration-none px-4 py-2"
          >
            <i className="ri-refresh-line me-2"></i>
            New Inspiration
          </button>
        </div>

        {/* Modern Emergency Support */}
        <div className="modern-card p-5 mb-5">
          <div className="text-center mb-4">
            <span className="badge badge-modern bg-danger text-white mb-3">
              🆘 Emergency Support
            </span>
            <h3 className="fw-bold mb-3 text-danger">Immediate Help Available</h3>
            <p className="text-muted">If you're in crisis, reach out immediately. You're not alone.</p>
          </div>
          
          <div className="text-center mb-4">
            <button
              onClick={() => setShowSOS(!showSOS)}
              className="btn btn-danger btn-lg rounded-4 text-decoration-none px-5 py-3 fw-semibold shadow-lg"
            >
              <i className="ri-phone-line me-2"></i>
              {showSOS ? 'Hide' : 'Show'} Emergency Contacts
            </button>
          </div>

          {showSOS && (
            <div className="row g-3">
              {helplines.map((helpline, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <div className="glass-card p-4 border border-danger border-opacity-25 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-danger text-white rounded-3 p-2 me-3">
                        <i className={helpline.icon}></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{helpline.name}</h6>
                        <small className="text-muted">{helpline.description}</small>
                      </div>
                    </div>
                    <a 
                      href={`tel:${helpline.number}`}
                      className="btn btn-danger w-100 rounded-3 text-decoration-none fw-semibold"
                    >
                      <i className="ri-phone-line me-2"></i>
                      {helpline.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modern Wellness Tips */}
        <div className="modern-card p-5">
          <div className="text-center mb-4">
            <span className="badge badge-modern gradient-mixed text-white mb-3">
              🌟 Wellness Tips
            </span>
            <h3 className="fw-bold mb-3">Daily Self-Care Practices</h3>
            <p className="text-muted">Small steps that make a big difference</p>
          </div>
          
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-purple text-white rounded-3 p-3 me-3">
                    <i className="ri-sun-line fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Morning Mindfulness</h6>
                    <small className="text-muted">Start each day with intention and gratitude</small>
                  </div>
                </div>
                <p className="small text-muted mb-0">Take 5 minutes each morning to set positive intentions for your day.</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-pink text-white rounded-3 p-3 me-3">
                    <i className="ri-walk-line fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Move Your Body</h6>
                    <small className="text-muted">Physical activity boosts mental health</small>
                  </div>
                </div>
                <p className="small text-muted mb-0">Even 10 minutes of walking can improve your mood significantly.</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-mixed text-white rounded-3 p-3 me-3">
                    <i className="ri-group-line fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Stay Connected</h6>
                    <small className="text-muted">Nurture your relationships and community</small>
                  </div>
                </div>
                <p className="small text-muted mb-0">Reach out to friends, family, or support groups regularly.</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="gradient-purple text-white rounded-3 p-3 me-3">
                    <i className="ri-moon-line fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Quality Sleep</h6>
                    <small className="text-muted">Rest is essential for mental wellness</small>
                  </div>
                </div>
                <p className="small text-muted mb-0">Aim for 7-8 hours of quality sleep each night for optimal mental health.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}