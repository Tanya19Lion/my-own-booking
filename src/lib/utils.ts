import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient, Hosting, Owner, Availability } from "@prisma/client";
import { HostingWithOwner } from "./types";

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

export async function getHostings() {	
	const hostings: HostingWithOwner[] = await prisma.hosting.findMany({
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

	return hostings;
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

	return hosting;
};