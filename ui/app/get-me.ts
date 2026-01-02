'use server';

import axios from 'axios';
import API_URL from './constants/api';
import { cookies } from 'next/headers';

export default async function getMe() {
  const me = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  return me.data;
}
