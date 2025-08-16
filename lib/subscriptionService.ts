import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserSubscription, SubscriptionPlan } from './types';

export class SubscriptionService {
  private static instance: SubscriptionService;

  private constructor() {}

  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    try {
      const subscriptionDoc = await getDoc(doc(db, 'subscriptions', userId));
      if (subscriptionDoc.exists()) {
        const data = subscriptionDoc.data();
        return {
          ...data,
          startDate: data.startDate instanceof Timestamp ? data.startDate.toDate() : new Date(),
          endDate: data.endDate instanceof Timestamp ? data.endDate.toDate() : new Date(),
          lastPaymentDate: data.lastPaymentDate instanceof Timestamp ? data.lastPaymentDate.toDate() : undefined,
          nextBillingDate: data.nextBillingDate instanceof Timestamp ? data.nextBillingDate.toDate() : undefined
        } as UserSubscription;
      }
      return null;
    } catch (error) {
      console.error('Error getting user subscription:', error);
      return null;
    }
  }

  async createSubscription(userId: string, planId: string, transactionId: string): Promise<boolean> {
    try {
      const plan = this.getPlanById(planId);
      if (!plan) {
        throw new Error('Invalid plan ID');
      }

      const subscription = {
        userId,
        planId,
        status: 'active',
        startDate: serverTimestamp(),
        endDate: serverTimestamp(),
        autoRenew: true,
        paymentMethod: 'card',
        lastPaymentDate: serverTimestamp(),
        nextBillingDate: serverTimestamp(),
        transactionId
      };

      await setDoc(doc(db, 'subscriptions', userId), subscription);

      // Create or update user profile
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', userId), {
            email: auth.currentUser?.email,
            createdAt: serverTimestamp(),
            subscriptionStatus: 'premium',
            lastUpdated: serverTimestamp()
          });
        } else {
          await updateDoc(doc(db, 'users', userId), {
            subscriptionStatus: 'premium',
            lastUpdated: serverTimestamp()
          });
        }
      } catch (profileError) {
        console.error('Error updating user profile:', profileError);
      }

      return true;
    } catch (error) {
      console.error('Error creating subscription:', error);
      return false;
    }
  }

  async createMockSubscription(userId: string): Promise<boolean> {
    try {
      const subscription = {
        userId,
        planId: 'monthly',
        status: 'active',
        startDate: serverTimestamp(),
        endDate: serverTimestamp(),
        autoRenew: true,
        paymentMethod: 'mock',
        lastPaymentDate: serverTimestamp(),
        nextBillingDate: serverTimestamp(),
        transactionId: 'mock_' + Date.now()
      };

      await setDoc(doc(db, 'subscriptions', userId), subscription);

      // Create or update user profile
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', userId), {
            email: auth.currentUser?.email,
            createdAt: serverTimestamp(),
            subscriptionStatus: 'premium',
            lastUpdated: serverTimestamp()
          });
        } else {
          await updateDoc(doc(db, 'users', userId), {
            subscriptionStatus: 'premium',
            lastUpdated: serverTimestamp()
          });
        }
      } catch (profileError) {
        console.error('Error updating user profile:', profileError);
      }

      return true;
    } catch (error) {
      console.error('Error creating mock subscription:', error);
      return false;
    }
  }

  async cancelSubscription(userId: string): Promise<boolean> {
    try {
      await updateDoc(doc(db, 'subscriptions', userId), {
        status: 'cancelled',
        autoRenew: false,
        cancelledAt: serverTimestamp()
      });

      await updateDoc(doc(db, 'users', userId), {
        subscriptionStatus: 'free',
        lastUpdated: serverTimestamp()
      });

      return true;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return false;
    }
  }

  async updateSubscription(userId: string, updates: Partial<UserSubscription>): Promise<boolean> {
    try {
      await updateDoc(doc(db, 'subscriptions', userId), {
        ...updates,
        lastUpdated: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating subscription:', error);
      return false;
    }
  }

  async isSubscriptionActive(userId: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        return false;
      }

      const now = new Date();
      const isActive = subscription.status === 'active' && subscription.endDate > now;
      
      return isActive;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  }

  async getSubscriptionExpiryDate(userId: string): Promise<Date | null> {
    try {
      const subscription = await this.getUserSubscription(userId);
      return subscription?.endDate || null;
    } catch (error) {
      console.error('Error getting subscription expiry:', error);
      return null;
    }
  }

  private getPlanById(planId: string): SubscriptionPlan | undefined {
    const plans = [
      { 
        id: 'monthly', 
        name: 'Monthly Premium', 
        price: 99, 
        interval: 'monthly' as const,
        features: ['Access to private doctors', 'Specialist directory', 'Personalized insights']
      },
      { 
        id: 'annual', 
        name: 'Annual Premium', 
        price: 999, 
        interval: 'annual' as const,
        features: ['Access to private doctors', 'Specialist directory', 'Personalized insights', 'Priority support']
      }
    ];
    return plans.find(plan => plan.id === planId);
  }
}

export default SubscriptionService;
