import { NextRequest } from 'next/server';
import checkAuthentication from './app/auth/checkAuthentication';
import { unAuthenticatedRoutes } from './app/utils/routes';

export async function middleware(request: NextRequest) {
  const auth = await checkAuthentication();

  if (
    !auth &&
    unAuthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route.path)
    )
  ) {
    return Response.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
