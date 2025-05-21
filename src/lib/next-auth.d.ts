import { User } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: User & {
			id: number; 
		};
  	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		ownerId?: number;
	}
}

