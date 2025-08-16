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

if (typeof window !== 'undefined') {
  console.log('Initializing Firebase...');
  
  const firebaseConfig = {
    apiKey: "AIzaSyB8pveRiKbJZShCVnW5WlxNbsTOAIFhsq4",
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
  console.log('Firebase not initialized - not in browser environment');
}

export { auth, db, storage };
export default app; 