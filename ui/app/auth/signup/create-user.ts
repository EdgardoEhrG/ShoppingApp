'use server';

import API_URL from '@/app/constants/api';
import { getErrorMessage } from '@/app/utils/error';
import axios from 'axios';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function createUser(_prevState: any, formData: FormData) {
  const res = await axios.post(`${API_URL}/users`, formData);

  if (res.status !== 200) {
    return { error: getErrorMessage(res) };
  }

  redirect('/');
}
