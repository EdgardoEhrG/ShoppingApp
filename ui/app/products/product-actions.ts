'use server';

import axios from 'axios';
import API_URL from '../constants/api';
import { Product } from '../types';

export const createProduct = async (product: FormData) => {
  return await axios.post(`${API_URL}/products`, product);
};

export const getProducts = async (): Promise<Product[]> => {
  return await axios.get(`${API_URL}/products`);
};
