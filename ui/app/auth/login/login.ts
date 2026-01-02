'use server';

import { AUTH_COOKIE } from '@/app/constants';
import API_URL from '@/app/constants/api';
import { FormError } from '@/app/types';
import { getErrorMessage } from '@/app/utils/error';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function login(_prevState: FormError, formData: FormData) {
  const res = await axios.post(
    `${API_URL}/auth/login`,
    JSON.stringify(Object.fromEntries(formData))
  );

  if (res.status !== 200) {
    return { error: getErrorMessage(res) };
  }

  setCookie(res.data);
  redirect('/');
}

const setCookie = async (response: Response) => {
  const cookieHeader = response.headers.get('Set-Cookie');

  if (cookieHeader) {
    const token = cookieHeader.split(';')[0].split('=')[1];
    (await cookies()).set({
      name: AUTH_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
