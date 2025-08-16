
'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: string;
}

export default function AIHealthPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General Support');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'maternal', label: 'Maternal', icon: 'fas fa-baby', color: 'from-pink-500 to-pink-600' },
    { id: 'preventive', label: 'Preventive', icon: 'fas fa-shield-alt', color: 'from-purple-500 to-purple-600' },
    { id: 'general', label: 'General Support', icon: 'fas fa-heartbeat', color: 'from-blue-500 to-blue-600' }
  ];

  const quickActions = [
    { text: "I'm experiencing unusual fatigue and dizziness", category: 'general' },
    { text: "I'm 12 weeks pregnant and have morning sickness", category: 'maternal' },
    { text: "I want to start a preventive health routine", category: 'preventive' },
    { text: "I have concerns about irregular periods", category: 'general' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: "Sawubona! I'm your AI Health Assistant. I'm here to help you with health questions and concerns. Please remember that I provide general guidance only - for urgent issues, please contact emergency services or your healthcare provider immediately. How can I help you today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const generateAIResponse = (userMessage: string, category: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Maternal health responses
    if (category === 'maternal' || lowerMessage.includes('pregnan') || lowerMessage.includes('baby') || lowerMessage.includes('morning sickness')) {
      if (lowerMessage.includes('morning sickness') || lowerMessage.includes('nausea')) {
        return "Morning sickness is common in early pregnancy. Try eating small, frequent meals, ginger tea, and avoiding strong smells. If you're unable to keep fluids down or losing weight, please contact your healthcare provider immediately. Remember to take your prenatal vitamins when you can tolerate them.";
      }
      if (lowerMessage.includes('kick') || lowerMessage.includes('movement')) {
        return "Baby movements are a good sign! You should feel regular movements daily after 28 weeks. If you notice a significant decrease in movements, contact your healthcare provider. Try lying on your left side and having a cold drink to encourage movement if you're concerned.";
      }
      return "During pregnancy, it's important to attend all prenatal appointments, take prenatal vitamins, eat nutritious foods, stay hydrated, and get adequate rest. Please contact your healthcare provider for any concerns during pregnancy. Regular check-ups help ensure both you and baby are healthy.";
    }
    
    // Preventive care responses
    if (category === 'preventive' || lowerMessage.includes('prevent') || lowerMessage.includes('routine') || lowerMessage.includes('check')) {
      if (lowerMessage.includes('routine') || lowerMessage.includes('start')) {
        return "Great initiative! A preventive health routine should include: regular exercise (30min, 5 days/week), balanced nutrition with fruits/vegetables, adequate sleep (7-8 hours), stress management, regular health screenings, and staying up-to-date with vaccinations. Start small and build healthy habits gradually.";
      }
      return "Preventive care is key to staying healthy! Regular screenings, vaccinations, healthy lifestyle choices, and annual check-ups can help detect and prevent health issues early. Consider joining our gamified preventive care challenges to make healthy habits fun and sustainable.";
    }
    
    // General health responses
    if (lowerMessage.includes('fatigue') || lowerMessage.includes('tired') || lowerMessage.includes('dizzy')) {
      return "Fatigue and dizziness can have many causes including dehydration, low blood sugar, anemia, or stress. Make sure you're drinking enough water, eating regular meals, and getting adequate sleep. If symptoms persist or worsen, please consult with a healthcare provider for proper evaluation.";
    }
    
    if (lowerMessage.includes('period') || lowerMessage.includes('menstr') || lowerMessage.includes('cycle')) {
      return "Irregular periods can be caused by stress, weight changes, hormones, or underlying conditions. Track your cycles to identify patterns. If you miss periods for 3+ months, have very heavy bleeding, or severe pain, please consult a healthcare provider. Our cycle tracking feature can help monitor patterns.";
    }
    
    if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('ache')) {
      return "Pain should not be ignored. For mild pain, rest, gentle stretching, and over-the-counter pain relievers may help. However, severe, persistent, or unusual pain requires medical attention. If you're experiencing chest pain, severe abdominal pain, or any concerning symptoms, seek immediate medical care.";
    }
    
    // Default response
    return "Thank you for your question. While I can provide general health information, I recommend consulting with a healthcare professional for personalized medical advice. If this is urgent, please contact emergency services. Is there a specific aspect of your health concern you'd like me to help you understand better?";
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date(),
      category: selectedCategory
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowQuickActions(false);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(textToSend, selectedCategory.toLowerCase()),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <i className="fas fa-brain text-2xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Health Assistant</h1>
                <p className="text-white/80 text-sm">Your personal health companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 w-3 h-3 rounded-full"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap mr-2">Category:</span>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.label)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.label
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              <div className={`flex items-end ${message.type === 'user' ? 'order-1 mr-3' : 'order-2 ml-3'}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  }`}
                >
                  <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} text-sm`}></i>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="mb-6 flex justify-start">
              <div className="flex items-end">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center mr-3">
                  <i className="fas fa-robot text-sm"></i>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && messages.length <= 1 && (
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-3">Quick questions to get started:</p>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action.text)}
                    className="block w-full text-left p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-800">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms or ask a health question..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span>Category: {selectedCategory}</span>
          </div>
        </div>
      </div>

      {/* Emergency Banner - Removed */}
    </div>
  );
}
