"use server";

import { redirect } from 'next/navigation';
import { searchSchema } from '@/lib/validations';
import { clearAndCapitalizeCity } from '@/lib/utils';
import { getHostingsByIds } from '@/lib/server-utils';
import { signIn, signOut } from '@/lib/auth';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function searchHosting(formData: FormData) {
	const rawData = {
		city: formData.get('city'),
		guests: formData.get('guests'),
		startDate: formData.get('startDate'),
		endDate: formData.get('endDate'),
	};

	const parsed = searchSchema.safeParse(rawData);

	if (!parsed.success) {
		console.error(parsed.error.flatten());
		throw new Error('Invalid input data');
	}

	const { city, guests, startDate, endDate } = parsed.data;
    const normalizedCity = clearAndCapitalizeCity(city);

    const searchParams = new URLSearchParams();

    searchParams.set('city', city);
    searchParams.set('guests', guests.toString());
    
    if (startDate) {
        searchParams.set('startDate', startDate);
    }
    
    if (endDate) {
        searchParams.set('endDate', endDate);
    }
    
    redirect(`/hostings/${encodeURIComponent(normalizedCity)}` + '?' + searchParams.toString());
}


export async function fetchFavouritesByIds(ids: number[]) {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const hostings = await getHostingsByIds(ids);
	
    return hostings;
}

// ---------- Owner ---------- //
export const logIn = async (formData: FormData) => {
    const authData = Object.fromEntries(formData.entries()) as {email: string, password: string};

    await signIn('credentials', authData);
};

export const logOut = async () => {
    await signOut({ redirectTo: '/' });
};

export const signUp = async (formData: FormData) => {
    const hashedPassword = await bcrypt.hash(formData.get("password") as string, 10);

    await prisma.owner.create({
        data: {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            password: hashedPassword,
            bio: formData.get("bio") as string,
            avatarUrl: formData.get("photo") as string,
        },
    });

    const credentialsData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    await signIn('credentials', credentialsData);   
};