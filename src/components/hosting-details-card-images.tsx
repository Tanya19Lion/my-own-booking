"use client";

import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Hosting } from "../../prisma/app/generated/prisma-client";
import Image from "next/image";

type HostingDetailsCardImagesProps = {
	hosting: Hosting;
};

export default function HostingDetailsCardImages({ hosting }: HostingDetailsCardImagesProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);	

	const imageArray: string[] = Array.isArray(hosting.images)
		? hosting.images
		: JSON.parse(hosting.images as string);

	return (
        <>
			<div className="mb-4 w-full">
				<Image
					className="w-full max-h-[650px] rounded-md object-contain"
					src={imageArray[currentImageIndex].startsWith("http") ? imageArray[currentImageIndex] : `assets/${imageArray[currentImageIndex]}`}
					alt={hosting.name}
					sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
					width={1280}
					height={650}
				/>
			</div>
			<Carousel className="mx-auto mb-4 w-[95%]">
				<CarouselContent className="flex gap-4 md:justify-center">
					{imageArray.map((image, index) => (
						<CarouselItem
							key={image + index}
							className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 cursor-pointer"
							onClick={() => setCurrentImageIndex(index)}
						>
						<Image
							src={image.startsWith("http") ? image : `assets/${image}`}
							alt={`${hosting.name} Image ${index + 1}`}
							className={`w-full h-32 sm:h-40 md:h-44 object-cover rounded-md transition-opacity ${
								currentImageIndex === index
									? "ring-2 ring-primary"
									: "opacity-50 hover:opacity-100"
								}`}
							width={480}
							height={280}
						/>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="hidden md:block">
					<CarouselPrevious className="arrow-color" />
					<CarouselNext className="arrow-color" />
				</div>
			</Carousel>
        </>
	);
}