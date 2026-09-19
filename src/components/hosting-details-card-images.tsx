"use client";

import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Hosting } from "../../prisma/app/generated/prisma-client";
import Image from "next/image";
import { changeImageUrl, cn } from "@/lib/utils";

type HostingDetailsCardImagesProps = {
	hosting: Hosting;
};

// Hero + four tiles; anything beyond that is reached through the lightbox.
const GRID_SIZE = 5;

export default function HostingDetailsCardImages({ hosting }: HostingDetailsCardImagesProps) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const imageArray: string[] = (Array.isArray(hosting.images)
		? hosting.images
		: JSON.parse(hosting.images as string)
	).map((image: string) => image.startsWith("http") ? image : changeImageUrl(image));

	const gridImages = imageArray.slice(0, GRID_SIZE);
	const hiddenCount = imageArray.length - GRID_SIZE;
	// With fewer than five photos the tiles would leave holes, so the hero takes the full width.
	const hasTiles = imageArray.length >= GRID_SIZE;

	return (
		<>
			{/* Desktop: fixed-ratio grid. 3fr hero in a 5:2 box is exactly 3:2. */}
			<div
				className={cn(
					"hidden md:grid aspect-[5/2] gap-2 overflow-hidden rounded-xl",
					hasTiles && "grid-cols-[3fr_1fr_1fr] grid-rows-2"
				)}
			>
				{(hasTiles ? gridImages : gridImages.slice(0, 1)).map((image, index) => (
					<button
						key={image + index}
						type="button"
						onClick={() => setLightboxIndex(index)}
						className={cn(
							"group relative overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-focus",
							index === 0 && "row-span-2"
						)}
						aria-label={`Open photo ${index + 1} of ${imageArray.length}`}
					>
						<Image
							src={image}
							alt={index === 0 ? hosting.name : ""}
							fill
							priority={index === 0}
							sizes={index === 0 ? "(max-width: 1280px) 60vw, 700px" : "(max-width: 1280px) 20vw, 240px"}
							className="object-cover transition duration-300 group-hover:brightness-90"
						/>
						{index === GRID_SIZE - 1 && hiddenCount > 0 && (
							<span className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-2xl font-semibold">
								+{hiddenCount}
							</span>
						)}
					</button>
				))}
			</div>

			{/* Mobile: swipe through every photo. */}
			<Carousel className="md:hidden">
				<CarouselContent>
					{imageArray.map((image, index) => (
						<CarouselItem key={image + index}>
							<div className="relative aspect-[3/2] overflow-hidden rounded-xl">
								<Image
									src={image}
									alt={`${hosting.name}, photo ${index + 1} of ${imageArray.length}`}
									fill
									// Eager rather than `priority`: priority adds a <link preload> that desktop would fetch and never use.
									loading={index === 0 ? "eager" : "lazy"}
									fetchPriority={index === 0 ? "high" : "auto"}
									// Hidden from md up, so desktop should fetch the smallest variant, not a full-width one.
									sizes="(max-width: 767px) 100vw, 1px"
									className="object-cover"
								/>
								<span className="absolute right-3 bottom-3 rounded-full bg-slate-950/70 px-2 py-0.5 text-xs tabular-nums">
									{index + 1} / {imageArray.length}
								</span>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
				<DialogContent aria-describedby={undefined} className="border-white/10 bg-slate-950 p-4 text-white sm:max-w-5xl">
					<DialogTitle className="sr-only">{hosting.name} photos</DialogTitle>
					<Carousel opts={{ startIndex: lightboxIndex ?? 0 }} className="mx-12">
						<CarouselContent>
							{imageArray.map((image, index) => (
								<CarouselItem key={image + index}>
									<div className="relative aspect-[3/2]">
										<Image
											src={image}
											alt={`${hosting.name}, photo ${index + 1} of ${imageArray.length}`}
											fill
											sizes="(max-width: 1024px) 90vw, 1000px"
											className="object-contain"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="arrow-color border-white/30 hover:bg-white/15" />
						<CarouselNext className="arrow-color border-white/30 hover:bg-white/15" />
					</Carousel>
				</DialogContent>
			</Dialog>
		</>
	);
}
