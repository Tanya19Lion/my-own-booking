"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Pin, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HostingCardImages from './hosting-card-images';
import OwnerAvatar from './owner-avatar';
import { Separator } from '@/components/ui/separator';
import { HostingWithOwner } from "@/lib/types";

type HostingCardProps = {
	hosting: HostingWithOwner;
};

const MotionLink = motion(Link);

export default function HostingCard({ hosting }: HostingCardProps) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["0 1", "1.5 1"],
	});
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

	const { id, name, slug, location, price, maxGuests, owner } = hosting;

	return (
		<MotionLink
			ref={ref} 
			href="/hosting/[slug]" as={`/hosting/${slug}`}
			className="flex-1 basis-80 max-w-[500px] w-[100%] state-effects"
			style={{
				//@ts-ignore
				scale: scaleProgress,
				//@ts-ignore
				opacity: opacityProgress,				
			}}
			initial={{ scale: 0.8, opacity: 0 }}
		>
			<Card 
				className="w-full h-full min-h-[380px] flex flex-col justify-between bg-white/[3%] rounded-xl overflow-hidden relative transition pb-6" 
				key={id}
			>
				<div className="relative ">
					<HostingCardImages hosting={hosting} />
					{/* <ListingFavouriteButton id={id} className="absolute top-4 right-4 z-10"/>				
					<ListingRatingStars listing={listing} className="absolute bottom-4 left-4 z-10"/> */}
				</div>	
				<CardContent className="flex flex-col flex-1 items-start gap-y-2">					
					<h2 className="mb-2 mt-6 text-xl font-semibold color-white">{name}</h2>
					<div className="flex items-center gap-2">
						<DollarSign className="h-4 w-4 text-foreground"/>
						<span className="text-muted-foreground">
							<span className="font-bold text-foreground">{price} </span>
							/night
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Pin className="h-4 w-4 text-foreground" />
						<span className="text-muted-foreground">{location}</span>
					</div>
					<div className="flex items-center gap-2">
						<Users className="h-4 w-4 text-foreground" />
						<span className="text-muted-foreground">{maxGuests} guests</span>
					</div>	

					<div className="mt-auto w-full">				
						<Separator className="mb-3 mt-3" />	
						{owner && <OwnerAvatar owner={owner} className="w-10 h-10"/>}		
					</div>
				</CardContent>									
			</Card>	
		</MotionLink>
	)
}
