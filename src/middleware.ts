import { auth } from './lib/auth';

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth;


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export const config = {
//   matcher: [
//     '/owner/:path*', 
//     '/login',        
//     '/signup'        
//   ],
// };

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('next-auth.session-token')?.value ||
//                 request.cookies.get('__Secure-next-auth.session-token')?.value;

//   const isAuth = Boolean(token);
//   const { pathname } = request.nextUrl;

//   const isProtectedRoute = pathname.startsWith('/owner');
//   const isAuthPage = pathname === '/login' || pathname === '/signup';

//   if (!isAuth && isProtectedRoute) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (isAuth && isAuthPage) {
//     return NextResponse.redirect(new URL('/owner/dashboard', request.url));
//   }

//   return NextResponse.next();
// }