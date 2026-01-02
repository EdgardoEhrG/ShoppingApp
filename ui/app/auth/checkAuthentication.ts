import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '../constants';

export default async function checkAuthentication() {
  return !!(await cookies()).get(AUTH_COOKIE)?.value;
}
