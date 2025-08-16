import { SubscriptionPlan } from './types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Premium',
    price: 99.99,
    interval: 'monthly',
    features: [
      'Access to private doctors & specialists',
      'Gynecologist directory with ratings',
      'Personalized pregnancy insights',
      'Priority booking system',
      '24/7 health consultation support',
      'Exclusive pregnancy resources',
      'Advanced health tracking',
      'Direct messaging with doctors'
    ]
  },
  {
    id: 'annual',
    name: 'Annual Premium',
    price: 999.99,
    interval: 'annual',
    popular: true,
    features: [
      'All monthly features included',
      '2 months free (save R199.98)',
      'Priority customer support',
      'Exclusive wellness workshops',
      'Personalized nutrition plans',
      'Advanced analytics dashboard',
      'Family health management',
      'Emergency consultation access'
    ]
  }
];

export const getPopularPlan = () => subscriptionPlans.find(plan => plan.popular);
export const getMonthlyPlan = () => subscriptionPlans.find(plan => plan.interval === 'monthly');
export const getAnnualPlan = () => subscriptionPlans.find(plan => plan.interval === 'annual');
