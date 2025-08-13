import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "imbokodo-b6624.firebaseapp.com",
  projectId: "imbokodo-b6624",
  storageBucket: "imbokodo-b6624.appspot.com",
  messagingSenderId: "339522771147",
  appId: "1:339522771147:web:d75757b21786aa4723234e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 