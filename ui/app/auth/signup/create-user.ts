'use server';

import API_URL from '@/app/constants/api';
import { FormError } from '@/app/types';
import { getErrorMessage } from '@/app/utils/error';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default async function createUser(
  _prevState: FormError,
  formData: FormData
) {
  const res = await axios.post(
    `${API_URL}/users`,
    JSON.stringify(Object.fromEntries(formData))
  );

  if (res.status !== 200) {
    return { error: getErrorMessage(res) };
  }

  redirect('/');
}
