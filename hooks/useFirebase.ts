import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  updateDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export const useFirebase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run auth state listener if Firebase is initialized
    if (!auth) {
      console.log('Firebase auth not initialized');
      setLoading(false);
      return;
    }

    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'No user');
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state error:', error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('SignIn called with email:', email);
    
    if (!auth) {
      console.error('Firebase auth not initialized');
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      console.log('Attempting Firebase signin...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase signin successful:', result.user.uid);
      return { success: true, user: result.user };
    } catch (error: any) {
      console.error('Firebase signin error:', error);
      let errorMessage = 'Sign in failed';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      } else {
        errorMessage = error.message || 'Sign in failed. Please try again';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string, additionalData?: any) => {
    console.log('SignUp called with email:', email);
    
    if (!auth || !db) {
      console.error('Firebase not initialized - auth:', !!auth, 'db:', !!db);
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      console.log('Attempting Firebase user creation...');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Firebase user created successfully:', result.user.uid);
      
      // Save additional user data to Firestore
      if (additionalData && result.user) {
        try {
          console.log('Saving user data to Firestore...');
          await setDoc(doc(db, 'users', result.user.uid), {
            email: result.user.email,
            createdAt: new Date(),
            ...additionalData
          });
          console.log('User data saved to Firestore successfully');
        } catch (firestoreError: any) {
          console.error('Firestore error:', firestoreError);
          // Don't fail the signup if Firestore fails, just log it
        }
      }
      
      return { success: true, user: result.user };
    } catch (error: any) {
      console.error('Firebase signup error:', error);
      let errorMessage = 'Sign up failed';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Use at least 6 characters';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled. Please contact support';
      } else {
        errorMessage = error.message || 'Sign up failed. Please try again';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    if (!auth) {
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const createDocument = async (collectionName: string, data: any) => {
    if (!db) {
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { success: true, id: docRef.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateDocument = async (collectionName: string, id: string, data: any) => {
    if (!db) {
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      await updateDoc(doc(db, collectionName, id), data);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const getDocument = async (collectionName: string, id: string) => {
    if (!db) {
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      const docSnap = await getDoc(doc(db, collectionName, id));
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const queryDocuments = async (collectionName: string, field: string, operator: any, value: any) => {
    if (!db) {
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      const q = query(collection(db, collectionName), where(field, operator, value));
      const querySnapshot = await getDocs(q);
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return { user, loading, signIn, signUp, logout, createDocument, updateDocument, getDocument, queryDocuments };
}; 