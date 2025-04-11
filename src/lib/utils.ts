import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient, Hosting, Owner, Availability } from "@prisma/client";
import { HostingWithOwner } from "./types";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export function cn(...inputs: ClassValue[]) {
  	return twMerge(clsx(inputs))
};

export function capitalizePlaceName(place: string) {
  	return place.charAt(0).toUpperCase() + place.slice(1).toLowerCase();
};

export const getImageUrl = (filename: string) => {
	return `/assets/${filename}`;
};



export async function getHostings(place: string, page: number = 1, maxGuests: number, startDate?: Date,	endDate?: Date) {
	const shouldFilterByAvailability = !!startDate && !!endDate;
console.log(maxGuests, startDate, endDate);
	const hostings = await prisma.hosting.findMany({
		where: {
			location: place === 'All' ? undefined : {
				contains: capitalizePlaceName(place),		
			},
			maxGuests: {
				gte: maxGuests,
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
		location: place === 'All' ? undefined : {
			contains: capitalizePlaceName(place),
		},
		maxGuests: {
			gte: maxGuests,
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
}  

export async function getHosting(slug: string) {
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
};