"use client";

import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Hosting } from "@prisma/client";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

type HostingDetailsCardImagesProps = {
	hosting: Hosting;
};

export default function HostingDetailsCardImages({ hosting }: HostingDetailsCardImagesProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);	

	const imageArray = JSON.parse(hosting.images as string) as string[];

	return (
        <>
			<Image 
				className="mb-4 h-[650px] rounded-md object-contain"
				src={getImageUrl(imageArray[currentImageIndex])}
				alt={hosting.name}
				sizes="(max-width: 1280px) 100wv, 1280px" 
				width={1280}	
				height={650}
			/>
			<Carousel className="mx-auto mb-4 w-[90%] flex justify-center">
				<CarouselContent className="flex justify-center gap-4 w-full">
					{imageArray.map((image, index) => (
						<CarouselItem 
							key={image+index} 
							className="basis-1/3 cursor-pointer gap-2"
							onClick={() => setCurrentImageIndex(index)}
							isSelected={index === currentImageIndex}
						>
							<Image 
								src={getImageUrl(image)}  
								alt={`${hosting.name} Image ${index+1}`} 
								className="w-[90%] h-52 object-cover shadow-sm rounded-md" 
								width={480} 
								height={280}
							/> 
						</CarouselItem>
					))}
				</CarouselContent>	

				<CarouselPrevious className="arrow-color" />
				<CarouselNext className="arrow-color" />
			</Carousel>
        </>
	);
}