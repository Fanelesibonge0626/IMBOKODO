import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Only initialize Firebase on the client side
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

console.log('Firebase initialization starting...');
console.log('Window object exists:', typeof window !== 'undefined');
console.log('API Key exists:', !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log('API Key value:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Not set');

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.log('Initializing Firebase...');
  
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "myweb-c4c25.firebaseapp.com",
    projectId: "myweb-c4c25",
    storageBucket: "myweb-c4c25.appspot.com",
    messagingSenderId: "413167663570",
    appId: "1:413167663570:web:d755c70c18babd728b700b"
  };

  console.log('Firebase config:', { ...firebaseConfig, apiKey: 'HIDDEN' });

  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized successfully');

    // Initialize Firebase services
    auth = getAuth(app);
    console.log('Firebase auth initialized:', !!auth);
    
    db = getFirestore(app);
    console.log('Firebase Firestore initialized:', !!db);
    
    storage = getStorage(app);
    console.log('Firebase storage initialized:', !!storage);
    
    console.log('Firebase initialization complete!');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.log('Firebase not initialized - missing requirements');
  if (typeof window === 'undefined') {
    console.log('Reason: Not in browser environment');
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.log('Reason: Missing NEXT_PUBLIC_FIREBASE_API_KEY');
  }
}

export { auth, db, storage };
export default app; 