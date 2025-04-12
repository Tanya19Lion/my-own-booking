import { Prisma, PrismaClient, Hosting } from '@prisma/client';
import { OwnerEssential } from '@/lib/types'; 

const prisma = new PrismaClient();

async function main() {
	const numberOfHostings = 17;

	const locations = [
		'Kyiv',
		'New York',
		'Paris',
		'London',
		'Tokyo',
		'Berlin',
		'Sydney',
		'Rome',
		'Barcelona',
	];

	const adjectives = [
		'Cozy',
		'Charming',
		'Spacious',
		'Modern',
		'Elegant',
		'Stylish',
		'Bright',
		'Luxurious',
		'Sunny',
		'Trendy',
	];

	const propertyTypes = [
		'Apartment',
		'Studio',
		'House',
		'Loft',
		'Villa',
		'Condo',
		'Cottage',
		'Bungalow',
		'Penthouse',
		'Cabin',
	];

	const descriptionTemplates = [
		`This luxurious apartment is located in the heart of {{location}}, just moments away from the city's top attractions. With its sleek, contemporary design, it offers the perfect retreat for those looking for a stylish and comfortable stay. 
			The apartment boasts a spacious living room flooded with natural light, a fully equipped kitchen with modern appliances, and a cozy bedroom featuring premium bedding. The bathroom is chic, complete with a large shower and fresh towels.
			Enjoy the perfect combination of convenience, comfort, and luxury during your stay in {{location}}. Reserve now and discover the best of the city!`,
	
		`Nestled in the heart of {{location}}, this cozy studio is just a short walk from popular cafes, shops, and local hotspots. The studio is located on the third floor of a building with an elevator, featuring a comfortable living area with a pull-out sofa bed and a kitchenette for light cooking. 
			The bathroom is compact but functional, with a shower and toilet. Guests can enjoy in-room entertainment and do laundry with ease. A perfect spot for those who want to be close to the action!`,
	
		`This charming family house is situated in a peaceful area of {{location}}, a mere 10-minute walk from the nearest metro station. Inside, you'll find a spacious living room with a fireplace, a fully stocked kitchen, and a cozy dining area. 
			The house offers three comfortable bedrooms and two bathrooms. While the area is tranquil, you're still just a stone's throw away from shops, restaurants, and cafes. For added convenience, entertainment and laundry amenities are available.`,
	
		`This chic loft, located just minutes from the center of {{location}}, blends modern elegance with a relaxed, homely atmosphere. Situated on the third floor of a building with an elevator, the loft features an open-plan living area with a comfy sofa bed, a kitchenette, and a clean, modern bathroom.
			There are also options for staying entertained and taking care of laundry during your stay. It’s the perfect choice for those who want to enjoy the city's energy, with everything you need at your fingertips!`,
	
		`Located in the vibrant {{location}}, this sleek apartment is just a short walk from the nearest metro station, making it perfect for exploring the city. The spacious living room with a fireplace, a well-equipped kitchen, and dining area provide ample space for guests to relax.
			With two bedrooms and two bathrooms, the apartment offers a cozy and functional retreat. Its quiet, residential location is complemented by nearby shops, restaurants, and cafes. Entertainment options and laundry facilities are also included for your convenience.`,
	
		`This charming cottage is nestled in a quiet corner of {{location}}, just a few minutes from the bustling center. The cottage offers a serene atmosphere with cozy interiors, a living room with a sofa bed, and a kitchenette for your convenience. 
			The bathroom features a modern shower and toilet. Guests can enjoy modern comforts and have access to media and laundry solutions. Ideal for those looking for a peaceful getaway while being close to restaurants and shops!`,
	
		`This stunning villa is set in the heart of {{location}}, offering easy access to major landmarks and attractions. With an open, airy living space filled with natural light, a fully equipped kitchen, and a plush bedroom with premium linens, comfort is guaranteed. 
			The bathroom is modern and spacious, featuring a large shower. The villa’s central location makes it the perfect base for your adventures in {{location}}. In addition, the property offers entertainment and laundry amenities to make your stay even more convenient!`,
	
		`This unique houseboat is located in the heart of {{location}}, just minutes from the city's top attractions. The houseboat features a cozy living area with a sofa bed, a compact kitchenette, and a small bathroom with a shower and toilet. 
			Equipped with modern entertainment and laundry options, this houseboat provides all the comforts of home in a fun and quirky setting. Embrace a new kind of experience right in the heart of {{location}}!`,
	
		`This spacious apartment is ideally located in {{location}}, just a short walk from the metro station. It offers a spacious living room with a fireplace, a full kitchen, and a cozy dining area. With three bedrooms and two bathrooms, it’s perfect for families or groups.
			While in a quiet neighborhood, you're still close to the best restaurants, cafes, and shops. The apartment also offers modern conveniences such as entertainment options and laundry facilities.`,
	
		`This cozy studio offers a charming getaway in the heart of {{location}}, just a few steps from the city's best dining and shopping options. Located on the 3rd floor with an elevator, the studio features a spacious living area with a pull-out sofa bed, a compact kitchenette, and a modern bathroom with a shower.
			Guests can enjoy entertainment options and easily take care of laundry needs. Perfect for solo travelers or couples seeking a quiet, central retreat!`,
	
		`This stylish house, located in the heart of {{location}}, is perfect for those looking for comfort and convenience. The living room is spacious and inviting, complete with a fireplace, while the kitchen and dining area are ideal for preparing meals at home. 
			With three bedrooms and two bathrooms, there's plenty of space for families or groups. The house is situated in a quiet residential area, yet close to shopping and dining options. Entertainment and laundry amenities are available for your stay.`,
	
		`This charming loft offers a modern space in the heart of {{location}}, within walking distance of cafes, shops, and attractions. The loft features a cozy living area with a sofa bed, a functional kitchenette, and a bathroom with a shower.
			Guests can enjoy a variety of entertainment options and the convenience of laundry facilities, making it a great choice for short stays. A peaceful escape in the middle of the city!`,
	
		`This contemporary apartment is located in the lively heart of {{location}}, steps away from vibrant restaurants and shops. The open-plan living area is bright and welcoming, and the modern kitchen and king-sized bedroom make for a comfortable stay. 
			Ideal for solo travelers or couples, the apartment offers the convenience of being in a lively neighborhood while still providing a cozy retreat. We’re excited to host you in {{location}}, with everything you need for a relaxing stay!`,
	
		`This elegant villa is tucked away in a quiet corner of {{location}}, yet just a short drive from the bustling city center. With a spacious open-plan living and dining area, a modern kitchen, and four tastefully decorated bedrooms, it’s the perfect choice for families.
			Relax in the private garden or enjoy the pool after a day of exploring. The villa is also equipped with entertainment and laundry facilities to ensure you have a comfortable stay in {{location}}.`,
	
		`This picturesque cottage is located in the serene countryside of {{location}}, surrounded by nature while being just a short drive from the city. The cottage features a cozy living room with a wood-burning stove, a well-equipped kitchen, and two bedrooms designed for relaxation.
			With ample outdoor space to enjoy the beautiful views, the cottage also provides convenient entertainment and laundry options for guests. It’s the perfect retreat for those seeking tranquility in the heart of nature.`
	];

	const getDescription = (location: string) => {
		const template = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
		return template.replaceAll('{{location}}', location);
	};

	const getHostingName = (location: string) => {
		const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
		const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
		return `${adjective} ${propertyType} in ${location}`;
	};

	const ownersData: OwnerEssential[] = [
		{
			avatarUrl: 'https://i.pravatar.cc/150?img=32',
			bio: `Hello, I am Emily, your friendly host. I have been hosting for over 5 years and I absolutely love it. Meeting new people and making their stay comfortable and memorable is my passion.
				I am a local here and have extensive knowledge about the city and its hidden gems. I can guide you to the best restaurants, parks, and attractions. I am always available to answer any questions or provide assistance, ensuring you have a smooth and enjoyable stay.
				My home is a cozy and welcoming place, meticulously maintained and equipped with all the amenities for your convenience. I believe in creating a homely atmosphere for my guests where they can relax and feel at home.
				I am looking forward to hosting you and providing you the best experience. Welcome to our city and enjoy your stay!`,
			email: 'hello@demo.com',
			firstName: 'Emily',
			lastName: 'Robinson',
			password: 'helloworld',
		},
		{
			avatarUrl: 'https://i.pravatar.cc/150?img=5',
			bio: `Hi there, I'm Sarah! I've been hosting for 3 years now, and I love meeting travelers from all walks of life. Whether it's giving you insider tips on local spots or offering you a cozy place to rest, I'm here to make sure your visit is unforgettable.
				I pride myself on creating a friendly, laid-back atmosphere where you can truly unwind. I'm always around to help you feel at ease and ensure you have everything you need to enjoy your stay to the fullest.
				Can't wait to host you and show you around!`,
			email: 'sarah@demo.com',
			firstName: 'Sarah',
			lastName: 'Johnson',
			password: 'password123',
		},
		{
			avatarUrl: 'https://i.pravatar.cc/150?img=3',
			bio: `Greetings! I'm Mark, a seasoned host with over 7 years of experience. My goal is to create an environment that feels like a second home. From local tours to personalized recommendations, I’m here to ensure your trip is smooth and enjoyable.
				Whether you're traveling for work or leisure, I offer a place where you can feel safe, comfortable, and relaxed. My home is well-kept and has everything you need for a perfect stay.
				I’m excited to meet you and help make your visit special!`,
			email: 'mark@demo.com',
			firstName: 'Mark',
			lastName: 'Taylor',
			password: 'securepassword',
		},
		{
			avatarUrl: 'https://i.pravatar.cc/150?img=9',
			bio: `Hey, I’m Jessica! I’ve been hosting for 4 years and love sharing my home with guests from all over the world. I am passionate about travel, and I love helping people discover new places and experiences.				
				My home is a peaceful retreat, and I believe in offering a warm, welcoming space where guests feel at ease. I’m always happy to share my favorite spots in the city and provide you with local recommendations to make your stay extra special.				
				I look forward to hosting you and making your visit truly memorable!`,
			email: 'jessica@demo.com',
			firstName: 'Jessica',
			lastName: 'Williams',		
			password: 'guestpass',
		},
		{
			avatarUrl: 'https://i.pravatar.cc/150?img=12',
			bio: `Hello! I'm Tom, a proud host with a passion for making guests feel at home. I’ve been hosting for 2 years now and love the opportunity to help travelers explore the area while staying in a comfortable and well-equipped space.				
				My home is designed for relaxation, and I’m always happy to offer suggestions for local events, restaurants, and activities. If you have any questions or need recommendations, don’t hesitate to reach out!				
				I can’t wait to welcome you to the city and ensure your stay is everything you want it to be.`,
			email: 'tom@demo.com',
			firstName: 'Tom',
			lastName: 'Harris',	
			password: 'simplepassword',
		},
		{
			avatarUrl: "https://i.pravatar.cc/150?img=27",
			bio: `Hello! I'm Olivia, a passionate traveler who loves to share my home with fellow explorers. I’ve been hosting for over 5 years, and my goal is to provide a comfortable and memorable stay. I’m always available for any questions or tips about the local area. Looking forward to hosting you in my cozy place!`,
			email: "olivia@demo.com",
			firstName: "Olivia",
			lastName: "Brown",
			password: "anothersecurepassword"
		},
		{
			avatarUrl: "https://i.pravatar.cc/150?img=60",
			bio: `Hi there! I'm Ethan, an avid lover of hosting and meeting new people from all over the world. I've been running an Airbnb for the past 6 years and know how important it is to create a welcoming environment. I’m here to ensure you have a relaxing stay and enjoy everything the city has to offer!`,
			email: "ethan@demo.com",
			firstName: "Ethan",
			lastName: "Smith",
			password: "yetanotherpassword"
		}
	];

	for (const owner of ownersData) {
		await prisma.owner.upsert({
			where: { email: owner.email },
			update: {}, 
			create: owner,
		});
	}

	const allOwners = await prisma.owner.findMany({
		select: { id: true, email: true },
	});

	const emailToIdMap = Object.fromEntries(allOwners.map(o => [o.email, o.id]));

	const images = [];
	for (let i = 1; i <= 12; i++) {
		for (let j = 1; j <= 7; j++) {
			images.push(`hosting${i}-${j}.jpg`);
		}
	}
	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]; 
		}
	}
	shuffleArray(images);
	const arraysOfImages = [];
	let imageIndex = 0;
	for (let k = 0; k < numberOfHostings; k++) {
		const subset = [];
		for (let j = 0; j < 7; j++) {
			subset.push(images[imageIndex]);
			imageIndex = (imageIndex + 1) % images.length; 
		}
		arraysOfImages.push(subset);
	}

	const hostingsData: Prisma.HostingCreateManyInput[] = [];

	function slugify(name: string) {
		return name
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')     // Remove special characters
			.replace(/\s+/g, '-')         // Replace spaces with dashes
			.replace(/--+/g, '-')         // Replace multiple dashes with one
			.trim();
	}

	for (let i = 0; i < numberOfHostings; i++) {
		const ownerEmail = ownersData[i % ownersData.length].email;
		const ownerId = emailToIdMap[ownerEmail];
		const location = locations[i % locations.length];
		const description = getDescription(location);
		let name: string;
		let slug: string;
		const usedSlugs = new Set<string>();

		do {
			name = getHostingName(location);
			slug = slugify(name);
		} while (usedSlugs.has(slug));

		usedSlugs.add(slug);
		
		hostingsData.push({
			slug,
			name,
			description: description,
			location: location,
			images: JSON.stringify(arraysOfImages[i]), 
			price: Math.floor(Math.random() * 901) + 100,
			maxGuests: Math.floor(Math.random() * 12) + 1,
			guestFavorite: false,
			rating: Number((Math.random() * (5.0 - 2.5) + 2.5).toFixed(1)),		
			ownerId,
		});	
	}

	await prisma.hosting.createMany({
		data: hostingsData,
	});

	const createdHostings = await prisma.hosting.findMany({
		where: {
			id: {
				in: hostingsData.map((_, i) => i + 1), 
			},
		},
	});

	const hostingsWithIds = await prisma.hosting.findMany({
		select: { id: true },  
	});

	if (hostingsWithIds.length === 0) {
		console.error("No hostings found, skipping availability creation!");
		return; 
	}

	const createdAvailabilitiesData = hostingsWithIds.map((hosting, i) => ({
		from: new Date(),
		to: new Date(new Date().getTime() + (i + 7) * 24 * 60 * 60 * 1000),
		hostingId: hosting.id,  
   }));

	await prisma.availability.createMany({
		data: createdAvailabilitiesData, 
	});

	const hostingIds = hostingsData
		.map((hosting) => hosting.id) 
		.filter((id): id is number => id !== undefined); 

	const createdAvailabilities = await prisma.availability.findMany({
		where: {
			hostingId: { in: hostingIds }, 
		},
	});

	await Promise.all(
		createdHostings.map((hosting: Hosting, i: number) => {
			return prisma.hosting.update({
				where: { id: hosting.id },  
				data: {
					availability: { 
						connect: { id: createdAvailabilities[i].id }, 
					  },
				},
			});
		})
	);

	console.log('Seed data has been successfully added!');
}

main()
  	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});