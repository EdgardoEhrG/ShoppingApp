import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '../constants';

export default async function checkAuthentication(withValue = true) {
  if (withValue) {
    return !!(await cookies()).get(AUTH_COOKIE)?.value;
  } else {
    return !!(await cookies()).get(AUTH_COOKIE);
  }
}
