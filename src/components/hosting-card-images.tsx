"use client";

import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Hosting } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

type HostingCardImagesProps = {
	hosting : Hosting;
	className?: string;
};

export default function HostingCardImages({ hosting, className }: HostingCardImagesProps) {
	const [isHovered, setIsHovered] = useState(false);
	
	const imageArray: string[] = Array.isArray(hosting.images)
		? hosting.images
		: JSON.parse(hosting.images as string);

	return (
		<Carousel 
			className={cn( "w-full", className )}
			onMouseEnter={() => setIsHovered(true)} 
			onMouseLeave={() => setIsHovered(false)}
		>
			<CarouselContent className="ml-0">
				{imageArray.map((image, index) => (
					<CarouselItem key={image+index} className="pl-0 w-full h-[60%]">
						<Image					
							src={image}
							alt={`${hosting.name} Image ${index+1}`} 
							className="w-full h-[200px] object-cover rounded-md" 
							width={500}
							height={280}
						/> 
					</CarouselItem>
				))}
			</CarouselContent>	
			 {
				isHovered && (
					<>
						<CarouselPrevious className="absolute left-4 border-slate-950" size="lg"/>
						<CarouselNext className="absolute right-4 border-slate-950" size="lg"/>
					</>
				)
			}	 
	  	</Carousel>
	);
}