'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '../constants';
import { redirect } from 'next/navigation';

export default async function logout() {
  (await cookies()).delete(AUTH_COOKIE);
  redirect('/auth/login');
}
