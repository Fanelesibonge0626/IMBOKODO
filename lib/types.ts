export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'annual';
  features: string[];
  popular?: boolean;
}

export interface UserSubscription {
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod?: string;
  lastPaymentDate?: Date;
  nextBillingDate?: Date;
}

export interface PrivateDoctor {
  id: string;
  name: string;
  specialization: string;
  qualifications: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  availability: string[];
  consultationFee: number;
  languages: string[];
  about: string;
  services: string[];
}

export interface DoctorReview {
  id: string;
  doctorId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiresSubscription: boolean;
  route: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}
