'use server';

import axios from 'axios';
import API_URL from '../constants/api';
import { Product } from '../types';

export const createProduct = async (product: FormData, file?: File) => {
  const res = await axios.post(`${API_URL}/products`, product);

  if (file) {
    await uploadProductImg(res.data.id, file);
  }

  return res;
};

export const getProducts = async (): Promise<Product[]> => {
  return await axios.get(`${API_URL}/products`);
};

export const getProductsById = async (productId: number): Promise<Product> => {
  return await axios.get(`${API_URL}/products/${productId}`);
};

export const getProductImg = (productId: number) => {
  return `${API_URL}/products/${productId}.jpg`;
};

export const uploadProductImg = async (productId: number, file: File) => {
  const formData: FormData = new FormData();
  formData.append('image', file);
  return await axios.post(`${API_URL}/products/${productId}/image`, formData);
};
