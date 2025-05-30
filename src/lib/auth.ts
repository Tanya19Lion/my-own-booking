import NextAuth, { NextAuthConfig, Session } from 'next-auth';
import type { JWT } from "@auth/core/jwt";
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { logInSchema } from './validations';
import { absoluteUrl } from './utils';

const config = {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedAuthData = logInSchema.safeParse(credentials);
                if (!validatedAuthData.success) {
                    return null;
                }

                const { email, password } = validatedAuthData.data;

                const user = await fetch(absoluteUrl('/api/auth/get-owner'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                }).then(res => res.ok ? res.json() : null);

                if (!user) {
                    console.log('No owner found with the email address');
                    return null;
                }
                
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    console.log('Invalid credentials!');
                    return null;
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    bio: user.bio,
                    avatarUrl: user.avatarUrl,
                };
            }
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: async ({ auth, request }) => {
            const isLoggedIn = Boolean(auth?.user);
            const isTryingToAccessOwnerPage = request.nextUrl.pathname.includes('/owner');

            if (!isLoggedIn && isTryingToAccessOwnerPage) {
                return false;
            } 

            if (isLoggedIn && isTryingToAccessOwnerPage) {
               return true;
            }

            if (isLoggedIn && !isTryingToAccessOwnerPage) {                          
                return Response.redirect(new URL('/owner/dashboard', request.nextUrl));   
            }

            if (!isLoggedIn && !isTryingToAccessOwnerPage) {
                return true;
            }

            return false;
        }, 
        session: ({ session, token }: { session: Session; token: JWT }) => {
            (session.user as { id: number }).id = token.ownerId as number;

            return session;
        },
        jwt: ({ token, user }) => {
            if (user) {
                token.ownerId = Number(user.id);
            }

            return token;
        },            
    },
    
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);