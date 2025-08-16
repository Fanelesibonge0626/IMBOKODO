import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile,
  deleteUser
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state error:', error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error: any) {
      console.error('Sign in error:', error);
      let errorMessage = 'Sign in failed';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network connection failed. Please check your internet connection.';
      } else {
        errorMessage = error.message || 'Sign in failed. Please try again';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string, additionalData?: any) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save additional user data to Firestore
      if (additionalData && result.user) {
        try {
          await setDoc(doc(db, 'users', result.user.uid), {
            email: result.user.email,
            createdAt: new Date(),
            ...additionalData
          });
        } catch (firestoreError: any) {
          console.error('Firestore error:', firestoreError);
        }
      }
      
      return { success: true, user: result.user };
    } catch (error: any) {
      console.error('Sign up error:', error);
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
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const createDocument = async (collectionName: string, data: any) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { success: true, id: docRef.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateDocument = async (collectionName: string, id: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), data);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const getDocument = async (collectionName: string, id: string) => {
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

  const updateUserProfile = async (profileData: { displayName?: string; phoneNumber?: string }) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      // Update Firebase Auth profile
      if (profileData.displayName) {
        await updateProfile(user, {
          displayName: profileData.displayName
        });
      }

      // Update additional data in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        ...profileData,
        updatedAt: new Date()
      });

      return { success: true };
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const deleteAccount = async () => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      // Delete user data from Firestore first
      await setDoc(doc(db, 'users', user.uid), {
        deletedAt: new Date(),
        deleted: true
      });

      // Delete the user account
      await deleteUser(user);
      
      return { success: true };
    } catch (error: any) {
      console.error('Account deletion error:', error);
      throw new Error(error.message || 'Failed to delete account');
    }
  };

  return { 
    user, 
    loading, 
    signIn, 
    signUp, 
    logout, 
    createDocument, 
    updateDocument, 
    getDocument, 
    queryDocuments,
    updateUserProfile,
    deleteAccount
  };
}; 