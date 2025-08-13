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
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, additionalData?: any) => {
    if (!auth || !db) {
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save additional user data to Firestore
      if (additionalData && result.user) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          createdAt: new Date(),
          ...additionalData
        });
      }
      
      return { success: true, user: result.user };
    } catch (error: any) {
      return { success: false, error: error.message };
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