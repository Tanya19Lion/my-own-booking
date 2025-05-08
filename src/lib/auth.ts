import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const config = {
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials;

                const owner = await prisma.owner.findUnique({
                    where: { email },
                });

                if (!owner) {
                    console.log('No owner found with the email address');
                    return null;
                }
                
                const passwordMatch = await bcrypt.compare(password, owner.password);
                if (!passwordMatch) {
                    console.log('Invalid credentials!');
                    return null;
                }

                return owner;
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
                return Response.redirect(new URL('/owner', request.nextUrl));   
            }

            if (!isLoggedIn && !isTryingToAccessOwnerPage) {
                return true;
            }

            return false;
        },        
    },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);