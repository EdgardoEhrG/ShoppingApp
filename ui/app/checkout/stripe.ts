import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE } from '../constants';

let stripePromise: Stripe | null = null;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(STRIPE!);
  }

  return stripePromise;
};

export default getStripe;
