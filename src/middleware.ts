import { auth } from './lib/auth';

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth;

