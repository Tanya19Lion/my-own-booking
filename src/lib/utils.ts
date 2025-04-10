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

export async function getHostings(place: string, page: number = 1) {	
	const hostings: HostingWithOwner[] = await prisma.hosting.findMany({
		where: {
			location: place === 'All' ? undefined : {
				contains: capitalizePlaceName(place),
			}
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
		},
		take: 6,
		skip: (+page - 1) * 6,
	});

	let totalCount = 0;
	if (place === 'All') {
		totalCount = await prisma.hosting.count();
	} else {
		totalCount = await prisma.hosting.count({
			where: {
				location: {
					contains: capitalizePlaceName(place),
				}				
			},
		});
	}

	return { 
		hostings,
		totalCount
	};
};

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