import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request) {
  const token = request.cookies.get('token');
  if(!request.nextUrl.pathname.startsWith('/home')){
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/home')) {
    const decodedToken = await verifyToken(token.value); 

    if (!decodedToken) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    const userId = decodedToken.id;

    const response = NextResponse.next();

    response.cookies.set('user-id', userId, { httpOnly: true, secure: true, path: '/' });

    return response;
  }

  return NextResponse.next();
}
