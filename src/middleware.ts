// import { auth } from './lib/auth';

// export const config = {
// 	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// export default auth;
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ["/owner/:path*"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value || 
                request.cookies.get('__Secure-next-auth.session-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}