import "server-only";

import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { clearAndCapitalizeCity } from "./utils";
import { searchSchema } from "@/lib/validations";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

export const getHostings = unstable_cache( async (rawParams: unknown) => {
	const result = searchSchema.safeParse(rawParams);
	if (!result.success) {
		throw new Error("Invalid search parameters");
	}
	const { city, guests, page = 1, startDate, endDate } = result.data;

	const startDateObj = startDate ? new Date(startDate) : undefined;
	const endDateObj = endDate ? new Date(endDate) : undefined;

	const shouldFilterByAvailability = !!startDateObj && !!endDateObj;

    const normalizedCity = clearAndCapitalizeCity(decodeURIComponent(city));

	const hostings = await prisma.hosting.findMany({
		where: {
			location: city === 'all' ? undefined : {
				contains: normalizedCity,	
    		},
			maxGuests: {
				gte: guests,
			},
			...(shouldFilterByAvailability && {
				availability: {
					from: {
						lte: startDate,
					},
					to: {
						gte: endDate,
					},
				},
			}),
		},
		include: {
			owner: {
				select: {
					email: true,
					firstName: true,
					lastName: true,
					bio: true,
					avatarUrl: true,
				},
			},
		},
	  	take: 6,
	  	skip: (page - 1) * 6,
	});
  
	let totalCount = 0;
  
	const whereForCount = {
		location: city === 'all' ? undefined : {
			contains: normalizedCity,
		},
		maxGuests: {
			gte: guests,
		},
		...(shouldFilterByAvailability && {
			availability: {
				from: {
					lte: startDate,
				},
				to: {
					gte: endDate,
				},
			},
		}),
	};
  
	totalCount = await prisma.hosting.count({
		where: whereForCount,
	});
  
	return {
		hostings,
		totalCount,
	};
});  

export const getHostingsByIds = unstable_cache(async (ids: number[]) => {
	if (!ids || ids.length === 0) {
		return [];
	}

	const hostings = await prisma.hosting.findMany({
		where: {
			id: {
				in: ids,
			},
		},
		include: {
			owner: {
				select: {
					email: true,
					firstName: true,
					lastName: true,
					bio: true,
					avatarUrl: true,
				},
			},
		},
	});

	if (!hostings) {
		return notFound();
	}

	return hostings;
});

export const getHosting = unstable_cache(async (slug: string) => {
	const hosting  = await prisma.hosting.findUnique({
		where: {
			slug	
		},
		include: {
			owner: {
				select: {
					email: true,
					firstName: true,
					lastName: true,
					bio: true,
					avatarUrl: true,
				}
			},
		}
	});

	if (!hosting) {
		return notFound();
	}

	return hosting;
});