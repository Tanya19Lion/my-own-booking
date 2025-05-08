import "server-only";

import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { clearAndCapitalizeCity } from "./utils";
import { searchSchema } from "@/lib/validations";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

// const passwords = [
// 	hello@demo.com "helloworld", $2b$10$M6hHJWqb/gvU/u09YirT9uN3egjd1vQhtQD6EdduagTHiJ1h1bQRi
// 	sarah@demo.com "password123", $2b$10$gfpouFLCsmPOehfI8A0YRODxKq8w5r/kyx9mduAZ67usQjGBy27.y
// 	mark@demo.com "securepassword", $2b$10$6sgduNlNUKph0qLyN4lwEOuWPa2nZEHPWXkyzSus0PcZ/8PIDDjEi
// 	jessica@demo.com "guestpass", $2b$10$F8hJuBq931405hn.E9Lxw.803Assjbn6dnWlN4.CDrTqWu5Lkgy/a
// 	tom@demo.com "simplepassword", $2b$10$pQokb4y6xQM5I8kcQ3Mx.eHpgEKww5DiY6YdBG0quclSNpCd6AF8S
// 	olivia@demo.com "anothersecurepassword", $2b$10$OK/3/qWOyM7IpQ1OO0CPBu6uOk0mMc25YzRuHuVtFdCVYsOIlEVYu
// 	ethan@demo.com"yetanotherpassword", $2b$10$KZ5nn33eNoRR4qney3I8OeZ/mHnUsCn0QCf8aLwkCp1iSAfcVKUM.
//   ];

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