import { PaymentIntent } from './types';

const YOCO_PUBLIC_KEY = 'pk_test_3c793c39JvqDA8d40074';
const YOCO_SECRET_KEY = 'sk_test_eeff4f67Q4AQxLpe3c942a19b57b';

export class YocoPaymentService {
  private static instance: YocoPaymentService;
  private yoco: any = null;

  private constructor() {
    // Don't initialize YOCO SDK immediately - wait for script to load
  }

  public static getInstance(): YocoPaymentService {
    if (!YocoPaymentService.instance) {
      YocoPaymentService.instance = new YocoPaymentService();
    }
    return YocoPaymentService.instance;
  }

  private async ensureYocoLoaded(): Promise<void> {
    if (this.yoco) {
      return; // Already initialized
    }

    if (typeof window === 'undefined') {
      throw new Error('YOCO SDK can only be used in browser environment');
    }

    // Check if YOCO script is loaded
    if (!(window as any).Yoco) {
      await YocoPaymentService.loadYocoScript();
    }

    // Initialize YOCO SDK
    try {
      this.yoco = new (window as any).Yoco({
        publicKey: YOCO_PUBLIC_KEY,
      });
    } catch (error) {
      console.error('Failed to initialize YOCO SDK:', error);
      throw new Error('Failed to initialize payment system');
    }
  }

  async createPaymentIntent(amount: number, currency: string = 'ZAR'): Promise<PaymentIntent> {
    try {
      // Ensure YOCO is loaded before proceeding
      await this.ensureYocoLoaded();
      
      // In a real app, this would call your backend to create a payment intent
      // For now, we'll simulate the payment intent creation
      const paymentIntent: PaymentIntent = {
        id: `pi_${Date.now()}`,
        amount: amount * 100, // Convert to cents
        currency,
        status: 'requires_payment_method',
        clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`
      };

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async processPayment(paymentMethod: any, amount: number): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      // Ensure YOCO is loaded before proceeding
      await this.ensureYocoLoaded();
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (90% success rate for testing)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return {
          success: true,
          transactionId
        };
      } else {
        return {
          success: false,
          error: 'Payment failed. Please try again.'
        };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Payment processing failed. Please try again.'
      };
    }
  }

  getPublicKey(): string {
    return YOCO_PUBLIC_KEY;
  }

  // Method to load YOCO script
  static loadYocoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as any).Yoco) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.yoco.com/v1/';
      script.async = true;
      script.onload = () => {
        console.log('YOCO script loaded successfully');
        resolve();
      };
      script.onerror = () => {
        console.error('Failed to load YOCO script');
        reject(new Error('Failed to load YOCO script'));
      };
      document.head.appendChild(script);
    });
  }
}

export default YocoPaymentService;
