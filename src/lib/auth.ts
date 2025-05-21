import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { logInSchema } from './validations';

const config = {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedAuthData = logInSchema.safeParse(credentials);
                if (!validatedAuthData.success) {
                    return null;
                }

                const { email, password } = validatedAuthData.data;

                const user = await prisma.owner.findUnique({
                    where: { email },
                });

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
               return true
            }

            if (isLoggedIn && !isTryingToAccessOwnerPage) {                          
                return Response.redirect(new URL('/owner/dashboard', request.nextUrl));   
            }

            if (!isLoggedIn && !isTryingToAccessOwnerPage) {
                return true;
            }

            return false;
        },  
        jwt: ({ token, user }) => {
            if (user) {
                token.ownerId = Number(user.id);
            }
    
            return token;
        },
        session: ({ session, token }) => {
            if (session.user) {
                session.user.id = Number(token.ownerId);
            }      
    
            return session;
        },      
    },
    
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(config);