import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { capitalizePlaceName } from "./utils";
import { searchSchema } from "@/lib/validations";

const prisma = new PrismaClient();

export async function getHostings(rawParams: unknown) {
	const result = searchSchema.safeParse(rawParams);
	if (!result.success) {
		throw new Error("Invalid search parameters");
	}
	const { city, guests, page = 1, startDate, endDate } = result.data;

	const startDateObj = startDate ? new Date(startDate) : undefined;
	const endDateObj = endDate ? new Date(endDate) : undefined;

	const shouldFilterByAvailability = !!startDateObj && !!endDateObj;

	const hostings = await prisma.hosting.findMany({
		where: {
			location: city === 'all' ? undefined : {
				contains: capitalizePlaceName(city),		
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
			contains: capitalizePlaceName(city),
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