"use server";

import { redirect } from 'next/navigation';
import { searchSchema } from '@/lib/validations';

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

    const searchParams = new URLSearchParams();

    searchParams.set('city', city);
    searchParams.set('guests', guests.toString());
    
    if (startDate) {
        searchParams.set('startDate', startDate);
    }
    
    if (endDate) {
        searchParams.set('endDate', endDate);
    }
    
    redirect(`/hostings/${searchParams.get('city')?.toLowerCase()}` + '?' + searchParams.toString());
}