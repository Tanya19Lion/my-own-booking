// import { NextRequest, NextResponse } from "next/server";
import { auth } from './lib/auth';

// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/hostings/all', request.url));
// }

// export const config = {
//     matcher: ['/hostings'],
// };

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth;
