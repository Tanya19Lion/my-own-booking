import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Session } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: DefaultSession["user"] & {
			id: number;
		};
	}

	interface User extends DefaultUser {
		id: number;
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		ownerId?: number;
	}
}

