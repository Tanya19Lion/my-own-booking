"use server";

import { redirect } from 'next/navigation';

export async function searchHosting(formData: FormData) {
    const city = formData.get('city') as string;
    const guests = Number(formData.get('guests'));
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    
    if (!city.trim() || !guests ) {
        throw new Error('Missing search parameters');
    }

    const searchParams = new URLSearchParams({
        guests: guests.toString(),
        city: city,
        startDate: startDate,
        endDate: endDate,
    });
    
    redirect(`/hostings/${searchParams.get('city')}` + '?' + searchParams.toString());
}