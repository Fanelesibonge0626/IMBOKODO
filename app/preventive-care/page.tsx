
'use client';

import { useState, useEffect } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  progress: number;
  target: number;
  unit: string;
  badge: string;
  points: number;
  icon: string;
  color: string;
  isCompleted: boolean;
  streak: number;
  tips: string[];
}

interface UserStats {
  totalPoints: number;
  completedChallenges: number;
  currentStreak: number;
  level: number;
  badges: string[];
}

export default function PreventiveCarePage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    completedChallenges: 0,
    currentStreak: 0,
    level: 1,
    badges: []
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  const categories = [
    { id: 'All', label: 'All Challenges', icon: 'fas fa-trophy' },
    { id: 'Exercise', label: 'Exercise', icon: 'fas fa-running' },
    { id: 'Nutrition', label: 'Nutrition', icon: 'fas fa-apple-alt' },
    { id: 'Mental Health', label: 'Mental Health', icon: 'fas fa-brain' },
    { id: 'Sleep', label: 'Sleep', icon: 'fas fa-moon' },
    { id: 'Screenings', label: 'Health Screenings', icon: 'fas fa-stethoscope' }
  ];

  useEffect(() => {
    // Load user data and challenges
    loadUserData();
    loadChallenges();
  }, []);

  const loadUserData = () => {
    const savedStats = localStorage.getItem('preventiveCareStats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  };

  const loadChallenges = () => {
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: '10,000 Steps Daily',
        description: 'Walk 10,000 steps every day to maintain cardiovascular health',
        category: 'Exercise',
        duration: 'Monthly',
        progress: 23,
        target: 30,
        unit: 'days',
        badge: '🚶‍♀️ Step Master',
        points: 100,
        icon: 'fas fa-walking',
        color: 'from-green-400 to-green-600',
        isCompleted: false,
        streak: 5,
        tips: [
          'Take the stairs instead of elevators',
          'Park farther away from entrances',
          'Take walking breaks during work',
          'Walk while talking on the phone'
        ]
      },
      {
        id: '2',
        title: 'Drink 8 Glasses of Water',
        description: 'Stay hydrated by drinking at least 8 glasses of water daily',
        category: 'Nutrition',
        duration: 'Monthly',
        progress: 18,
        target: 30,
        unit: 'days',
        badge: '💧 Hydration Hero',
        points: 80,
        icon: 'fas fa-tint',
        color: 'from-blue-400 to-blue-600',
        isCompleted: false,
        streak: 3,
        tips: [
          'Keep a water bottle with you',
          'Set hourly water reminders',
          'Eat water-rich fruits and vegetables',
          'Drink water before each meal'
        ]
      },
      {
        id: '3',
        title: 'Practice Mindfulness',
        description: 'Spend 10 minutes daily on meditation or mindfulness exercises',
        category: 'Mental Health',
        duration: 'Monthly',
        progress: 15,
        target: 30,
        unit: 'sessions',
        badge: '🧘‍♀️ Mindful Warrior',
        points: 120,
        icon: 'fas fa-leaf',
        color: 'from-purple-400 to-purple-600',
        isCompleted: false,
        streak: 7,
        tips: [
          'Start with just 5 minutes',
          'Use guided meditation apps',
          'Focus on your breathing',
          'Practice gratitude journaling'
        ]
      },
      {
        id: '4',
        title: 'Quality Sleep Routine',
        description: 'Get 7-8 hours of quality sleep every night',
        category: 'Sleep',
        duration: 'Monthly',
        progress: 30,
        target: 30,
        unit: 'nights',
        badge: '😴 Sleep Champion',
        points: 150,
        icon: 'fas fa-bed',
        color: 'from-indigo-400 to-indigo-600',
        isCompleted: true,
        streak: 12,
        tips: [
          'Maintain consistent sleep schedule',
          'Avoid screens 1 hour before bed',
          'Keep bedroom cool and dark',
          'Practice relaxation techniques'
        ]
      },
      {
        id: '5',
        title: 'Eat 5 Servings of Fruits & Vegetables',
        description: 'Include at least 5 servings of fruits and vegetables in your daily diet',
        category: 'Nutrition',
        duration: 'Monthly',
        progress: 12,
        target: 30,
        unit: 'days',
        badge: '🥬 Nutrition Champion',
        points: 90,
        icon: 'fas fa-carrot',
        color: 'from-orange-400 to-orange-600',
        isCompleted: false,
        streak: 2,
        tips: [
          'Add fruits to your breakfast',
          'Include vegetables in every meal',
          'Try different colored produce',
          'Make smoothies with leafy greens'
        ]
      },
      {
        id: '6',
        title: 'Monthly Health Check',
        description: 'Complete your monthly self-examination and health assessment',
        category: 'Screenings',
        duration: 'Monthly',
        progress: 1,
        target: 1,
        unit: 'check',
        badge: '🩺 Health Guardian',
        points: 200,
        icon: 'fas fa-clipboard-check',
        color: 'from-red-400 to-red-600',
        isCompleted: true,
        streak: 1,
        tips: [
          'Schedule regular check-ups',
          'Keep health records updated',
          'Monitor blood pressure',
          'Track any changes in health'
        ]
      }
    ];

    setChallenges(mockChallenges);
    
    // Calculate user stats
    const completedCount = mockChallenges.filter(c => c.isCompleted).length;
    const totalPoints = mockChallenges.reduce((sum, c) => sum + (c.isCompleted ? c.points : 0), 0);
    const badges = mockChallenges.filter(c => c.isCompleted).map(c => c.badge);
    
    setUserStats(prev => ({
      ...prev,
      totalPoints,
      completedChallenges: completedCount,
      badges
    }));
  };

  const updateProgress = (challengeId: string, increment: number) => {
    setChallenges(prev => 
      prev.map(challenge => {
        if (challenge.id === challengeId) {
          const newProgress = Math.min(challenge.progress + increment, challenge.target);
          const isNowCompleted = newProgress >= challenge.target;
          
          if (isNowCompleted && !challenge.isCompleted) {
            // Challenge just completed
            setUserStats(prevStats => ({
              ...prevStats,
              totalPoints: prevStats.totalPoints + challenge.points,
              completedChallenges: prevStats.completedChallenges + 1,
              badges: [...prevStats.badges, challenge.badge]
            }));
          }
          
          return {
            ...challenge,
            progress: newProgress,
            isCompleted: isNowCompleted,
            streak: isNowCompleted ? challenge.streak + 1 : challenge.streak
          };
        }
        return challenge;
      })
    );
  };

  const filteredChallenges = challenges.filter(challenge => {
    const categoryMatch = selectedCategory === 'All' || challenge.category === selectedCategory;
    const completedMatch = !showCompletedOnly || challenge.isCompleted;
    return categoryMatch && completedMatch;
  });

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  const getUserLevel = (points: number) => {
    return Math.floor(points / 500) + 1;
  };

  const getPointsToNextLevel = (points: number) => {
    const currentLevel = getUserLevel(points);
    return (currentLevel * 500) - points;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <i className="fas fa-gamepad text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Preventive Care Challenges</h1>
                <p className="text-white/80">Gamify your health journey with fun challenges</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userStats.totalPoints}</div>
              <div className="text-white/80 text-sm">Total Points</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* User Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-trophy text-2xl"></i>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">Level {getUserLevel(userStats.totalPoints)}</div>
            <div className="text-gray-600 text-sm">
              {getPointsToNextLevel(userStats.totalPoints)} points to next level
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-check-circle text-2xl"></i>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{userStats.completedChallenges}</div>
            <div className="text-gray-600 text-sm">Challenges Completed</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-fire text-2xl"></i>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">{userStats.currentStreak}</div>
            <div className="text-gray-600 text-sm">Day Streak</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-medal text-2xl"></i>
            </div>
            <div className="text-3xl font-bold text-pink-600 mb-1">{userStats.badges.length}</div>
            <div className="text-gray-600 text-sm">Badges Earned</div>
          </div>
        </div>

        {/* Badges Section */}
        {userStats.badges.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Your Badges</h3>
            <div className="flex flex-wrap gap-3">
              {userStats.badges.map((badge, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${category.icon} mr-2`}></i>
                  {category.label}
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="completedOnly"
                checked={showCompletedOnly}
                onChange={(e) => setShowCompletedOnly(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="completedOnly" className="text-sm font-medium text-gray-700">
                Show completed only
              </label>
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-r ${challenge.color} text-white rounded-xl p-3 mr-4`}>
                      <i className={`${challenge.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{challenge.title}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                          {challenge.category}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {challenge.duration}
                        </span>
                        {challenge.streak > 0 && (
                          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                            🔥 {challenge.streak} day streak
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {challenge.isCompleted && (
                    <div className="bg-green-100 text-green-800 rounded-full p-2">
                      <i className="fas fa-check text-lg"></i>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-4">{challenge.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Progress: {challenge.progress}/{challenge.target} {challenge.unit}
                    </span>
                    <span className="text-sm font-medium text-purple-600">
                      {Math.round(getProgressPercentage(challenge.progress, challenge.target))}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${challenge.color} transition-all duration-300`}
                      style={{ width: `${getProgressPercentage(challenge.progress, challenge.target)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Tips to succeed:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {challenge.tips.slice(0, 2).map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-purple-600 mr-2">{challenge.points}</span>
                    <span className="text-sm text-gray-600">points</span>
                    {challenge.isCompleted && (
                      <span className="ml-3 text-sm text-green-600 font-semibold">
                        {challenge.badge}
                      </span>
                    )}
                  </div>
                  
                  {!challenge.isCompleted && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateProgress(challenge.id, 1)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                      >
                        <i className="fas fa-plus mr-1"></i>
                        Update Progress
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🌟 Keep Going, You're Amazing!</h3>
          <p className="text-lg mb-6 opacity-90">
            Every small step you take towards better health makes a difference. Your consistency and dedication are building a healthier, happier you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold">Set Goals</div>
              <div className="text-sm opacity-80">Define what health means to you</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold">Track Progress</div>
              <div className="text-sm opacity-80">Celebrate every victory, big or small</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-semibold">Earn Rewards</div>
              <div className="text-sm opacity-80">Unlock badges and achievements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
