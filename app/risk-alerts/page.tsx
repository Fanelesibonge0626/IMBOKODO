
'use client';

import { useState, useEffect } from 'react';

interface RiskAlert {
  id: string;
  title: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  category: string;
  timestamp: Date;
  source: string;
  recommendation: string;
  isRead: boolean;
}

export default function RiskAlertsPage() {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [filterUrgency, setFilterUrgency] = useState<string>('All');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  useEffect(() => {
    // Simulate risk alerts data
    const mockAlerts: RiskAlert[] = [
      {
        id: '1',
        title: 'Elevated Heart Rate Pattern Detected',
        description: 'Your wearable device has detected consistently elevated heart rate (>100 BPM) during rest periods over the past 3 days.',
        urgency: 'High',
        category: 'Cardiovascular',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        source: 'Wearable Device Data',
        recommendation: 'Please consult with your healthcare provider today. Monitor your symptoms and avoid strenuous activities.',
        isRead: false
      },
      {
        id: '2',
        title: 'Irregular Sleep Pattern Alert',
        description: 'Sleep tracking shows significant disruption in your sleep cycles with less than 4 hours of deep sleep over the past week.',
        urgency: 'Medium',
        category: 'Sleep Health',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        source: 'Sleep Monitoring',
        recommendation: 'Consider sleep hygiene improvements and stress management techniques. Schedule a check-up if patterns continue.',
        isRead: false
      },
      {
        id: '3',
        title: 'Missed Prenatal Appointment Reminder',
        description: 'You have a scheduled prenatal appointment in 2 days. Regular check-ups are crucial during pregnancy.',
        urgency: 'Medium',
        category: 'Maternal Health',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        source: 'Health Calendar',
        recommendation: 'Confirm your appointment or reschedule if needed. Prepare questions for your healthcare provider.',
        isRead: true
      },
      {
        id: '4',
        title: 'Hydration Level Warning',
        description: 'Based on your activity and environmental data, you may be at risk of dehydration today.',
        urgency: 'Low',
        category: 'Wellness',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        source: 'Activity Tracker',
        recommendation: 'Increase water intake. Aim for 8-10 glasses throughout the day, especially during physical activity.',
        isRead: true
      },
      {
        id: '5',
        title: 'Blood Pressure Trend Concern',
        description: 'Manual blood pressure readings show an upward trend over the past 2 weeks (average 145/92).',
        urgency: 'High',
        category: 'Cardiovascular',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        source: 'Manual Entry',
        recommendation: 'Schedule an urgent appointment with your healthcare provider. Monitor daily and avoid high-sodium foods.',
        isRead: false
      },
      {
        id: '6',
        title: 'Preventive Care Reminder',
        description: 'It\'s time for your annual cervical screening. Early detection saves lives.',
        urgency: 'Low',
        category: 'Preventive Care',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        source: 'Health Calendar',
        recommendation: 'Schedule your screening appointment. Regular screenings help detect issues early.',
        isRead: true
      }
    ];
    
    setAlerts(mockAlerts);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'from-red-500 to-red-600';
      case 'Medium': return 'from-orange-500 to-orange-600';
      case 'Low': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'fas fa-exclamation-triangle';
      case 'Medium': return 'fas fa-exclamation-circle';
      case 'Low': return 'fas fa-info-circle';
      default: return 'fas fa-bell';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cardiovascular': return 'fas fa-heartbeat';
      case 'Sleep Health': return 'fas fa-moon';
      case 'Maternal Health': return 'fas fa-baby';
      case 'Wellness': return 'fas fa-leaf';
      case 'Preventive Care': return 'fas fa-shield-alt';
      default: return 'fas fa-clipboard-list';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => {
    const urgencyMatch = filterUrgency === 'All' || alert.urgency === filterUrgency;
    const readMatch = !showOnlyUnread || !alert.isRead;
    return urgencyMatch && readMatch;
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const highUrgencyCount = alerts.filter(alert => alert.urgency === 'High' && !alert.isRead).length;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <i className="fas fa-bell text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Risk Alerts</h1>
                <p className="text-white/80">Stay informed about your health status</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{unreadCount}</div>
              <div className="text-white/80 text-sm">Unread alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Summary */}
      {highUrgencyCount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="container mx-auto">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-3"></i>
              <div>
                <h3 className="text-red-800 font-semibold">Urgent Attention Required</h3>
                <p className="text-red-700">
                  You have {highUrgencyCount} high-priority health alert{highUrgencyCount !== 1 ? 's' : ''} that need immediate attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by urgency:</label>
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Levels</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="unreadOnly"
                checked={showOnlyUnread}
                onChange={(e) => setShowOnlyUnread(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="unreadOnly" className="text-sm font-medium text-gray-700">
                Show unread only
              </label>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-check-circle text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-600">No active health alerts matching your filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 overflow-hidden transition-all duration-300 hover:shadow-md ${
                  alert.urgency === 'High' ? 'border-red-500' :
                  alert.urgency === 'Medium' ? 'border-orange-500' : 'border-blue-500'
                } ${!alert.isRead ? 'bg-blue-50' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`bg-gradient-to-r ${getUrgencyColor(alert.urgency)} text-white rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
                          <i className={`${getUrgencyIcon(alert.urgency)} text-sm`}></i>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold text-lg ${!alert.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                              {alert.title}
                            </h3>
                            {!alert.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <i className={`${getCategoryIcon(alert.category)} mr-1`}></i>
                            <span className="mr-4">{alert.category}</span>
                            <span className="mr-4">{formatTimeAgo(alert.timestamp)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              alert.urgency === 'High' ? 'bg-red-100 text-red-800' :
                              alert.urgency === 'Medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.urgency} Priority
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {alert.description}
                      </p>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                          Recommendation
                        </h4>
                        <p className="text-gray-700">{alert.recommendation}</p>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        <i className="fas fa-info-circle mr-1"></i>
                        Source: {alert.source}
                      </div>

                      <div className="flex items-center space-x-3">
                        {!alert.isRead && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <i className="fas fa-check mr-2"></i>
                            Mark as Read
                          </button>
                        )}
                        
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <i className="fas fa-times mr-2"></i>
                          Dismiss
                        </button>

                        {alert.urgency === 'High' && (
                          <a
                            href="tel:0800567567"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <i className="fas fa-phone mr-2"></i>
                            Call Support
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-500 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Medical Emergency?
          </h3>
          <p className="mb-4">If you're experiencing a medical emergency, don't wait for alerts.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="tel:10111"
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-phone mr-2"></i>
              Emergency: 10111
            </a>
            <a
              href="tel:0800567567"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <i className="fas fa-headset mr-2"></i>
              Health Hotline: 0800 567 567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
