import axios from 'axios';

export const checkout = async (productId: number) => {
  return await axios.post('checkout/session', { productId });
};
