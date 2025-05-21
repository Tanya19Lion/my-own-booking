"use server";

import { redirect } from 'next/navigation';
import { searchFormSchema, hostingFormSchema } from '@/lib/validations';
import { clearAndCapitalizeCity } from '@/lib/utils';
import { checkAuth, getHostingsByIds } from '@/lib/server-utils';
import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from "@/lib/prisma";

export async function searchHosting(formData: unknown) {
    if (!formData || !(formData instanceof FormData)) {
        console.error('Invalid form data');
        return {
            message: "Invalid form data. Please try again.",
        };
    }
    const formDataEntries = Object.fromEntries(formData.entries());
    const validatedFormData = searchFormSchema.safeParse(formDataEntries);

	if (!validatedFormData.success) {
		console.error(validatedFormData.error.flatten());
        return {
            message: "Invalid input data. Please try again.",
        };
	}

	const { city, guests, startDate, endDate } = validatedFormData.data;
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

export async function addNewHosting(formData: unknown) {
    if (!formData || !(formData instanceof FormData)) {
        console.error('Invalid form data');
        return {
            message: "Invalid form data. Please try again.",
        };
    }

    const session = await checkAuth();

    const formDataEntries = Object.fromEntries(formData.entries());
    const validatedHostingData = hostingFormSchema.safeParse(formDataEntries);

	if (!validatedHostingData.success) {
		console.error(validatedHostingData.error.flatten());
		return {
            message: "Invalid hosting data. Please try again.",
        };
	}

    const fromDate = validatedHostingData.data.availableFrom?.toString();
    const toDate = validatedHostingData.data.availableTo?.toString();

    const hostingData = {
        ...validatedHostingData.data,
        slug: typeof validatedHostingData.data.name === 'string' ? validatedHostingData.data.name.toLowerCase().replace(/\s+/g, '-') : '',
        guestFavorite: false,
        rating: Number((Math.random() * (5.0 - 2.5) + 2.5).toFixed(1)),
        ownerId: Number(session.user.id),
    };

    try {
        const hosting = await prisma.hosting.create({
            data: hostingData,
        });

        await prisma.availability.create({
            data: {
                hostingId: hosting.id,
                from: fromDate ? new Date(fromDate) : null,
                to: toDate ? new Date(toDate) : null,
            },
        });
    } catch (error) {
        console.error('Error creating hosting or availability:', error);
        return {
            message: 'Failed to create hosting or availability'
        };
    }

    revalidatePath('/owner/dashboard');    
    revalidateTag('get-hostings');
};

export async function editHosting(selectedHostingId: number, formData: unknown) {
    const session = await checkAuth();

    if (typeof selectedHostingId !== 'number') {
        console.error('Invalid hosting ID');
        return {
            message: 'Invalid hosting ID'
        };
    }

    if (!formData || !(formData instanceof FormData)) {
        console.error('Invalid form data');
        return {
            message: "Invalid form data. Please try again.",
        };
    }

    const hosting = await prisma.hosting.findUnique({
        where: {
            id: Number(selectedHostingId),
        }
    });
    if (!hosting) {
        console.error('Hosting not found');
        return {
            message: 'Hosting not found'
        };
    }

    if (hosting.ownerId !== session.user.id) {
        console.error('Unauthorized action');
        return {
            message: 'Unauthorized action'
        };
    }

    const formDataEntries = Object.fromEntries(formData.entries());
    const validatedHostingData = hostingFormSchema.safeParse(formDataEntries);

	if (!validatedHostingData.success) {
		console.error(validatedHostingData.error.flatten());
		return {
            message: "Invalid hosting data. Please try again.",
        };
	}

    const hostingData = {
        ...validatedHostingData.data,
        slug: typeof validatedHostingData.data.name === 'string' ? validatedHostingData.data.name.toLowerCase().replace(/\s+/g, '-') : '',
    };

    const fromDate = validatedHostingData.data.availableFrom?.toString();
    const toDate = validatedHostingData.data.availableTo?.toString();

    try {
        await prisma.hosting.update({
            where: {
                id: Number(selectedHostingId),
            },
            data: hostingData,
        });

        await prisma.availability.update({
            where: {
                hostingId: Number(selectedHostingId),
            },
            data: {
                from: fromDate ? new Date(fromDate) : null,
                to: toDate ? new Date(toDate) : null,
            },
        });
    } catch (error) {
        console.error('Error updating hosting or availability:', error);
        return {
            message: 'Failed to update hosting or availability'
        };
    }

    revalidatePath('/owner/dashboard');    
    revalidateTag('get-hostings');
};

export async function deleteHosting(selectedHostingId: number) {
    const session = await checkAuth();

    if (typeof selectedHostingId !== 'number') {
        console.error('Invalid hosting ID');
        return {
            message: 'Invalid hosting ID'
        };
    }

    const hosting = await prisma.hosting.findUnique({
        where: {
            id: Number(selectedHostingId),
        }
    });
    if (!hosting) {
        console.error('Hosting not found');
        return {
            message: 'Hosting not found'
        };
    }

    if (hosting.ownerId !== session.user.id) {
        console.error('Unauthorized action');
        return {
            message: 'Unauthorized action'
        };
    }
    
    try {
        await prisma.hosting.delete({
            where: {
                id: Number(selectedHostingId),
            },
        });
    } catch (error) {
        console.error('Error deleting hosting:', error);
        return {
            message: 'Failed to delete hosting'
        };
    }

    revalidatePath('/owner/dashboard');    
    revalidateTag('get-hostings');
};


