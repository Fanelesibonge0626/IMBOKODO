
'use client';

import { useState, useEffect } from 'react';
import FirebaseAuth from '../../components/FirebaseAuth';

export default function AuthPage() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Error boundary for the component
    const handleError = (error: ErrorEvent) => {
      console.error('Auth page error:', error);
      setError(error.error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Auth</h1>
            <p className="text-gray-600 mb-4">There was an error loading the authentication page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <FirebaseAuth />;
}
