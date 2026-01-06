'use client';

import { Button } from '@mui/material';
import { checkout } from './actions';
import getStripe from './stripe';

interface CheckoutProps {
  productId: number;
}

export default function Checkout({ productId }: CheckoutProps) {
  const handleCheckout = async () => {
    const session = await checkout(productId);
    const stripe = await getStripe();

    // ToDo: create a func with redirect url for stripe session, because a method redirectToCheckout was removed from stripe
  };

  return (
    <Button
      className="max-w-[25%]"
      variant="contained"
      onClick={handleCheckout}
    >
      Buy Now
    </Button>
  );
}
