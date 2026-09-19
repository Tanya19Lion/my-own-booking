import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
	src: StaticImageData;
	// Sizes the photo box. Making it taller than the page (e.g. h-[170%]) moves the subject down.
	className?: string;
};

// Full-bleed photo behind a page. Must sit inside a `relative` element under the `@container`
// wrapper in layout.tsx: it is 100cqw wide, because 100vw would include the scrollbar and overflow.
export default function HeroBackground({ src, className }: HeroBackgroundProps) {
	return (
		<section className="absolute inset-y-0 left-1/2 z-[-1] w-[100cqw] -translate-x-1/2 overflow-hidden">
			<div className={cn("absolute inset-x-0 top-0 h-full", className)}>
				<Image src={src} fill priority className="object-cover object-top" alt="" sizes="100vw"/>
			</div>
			{/* Dark behind the headline, clear through the middle, dissolving into the page at the bottom. */}
			<div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(2_6_24/0.7),transparent_40%,transparent_92%,rgb(2_6_24))]"/>
		</section>
	);
}
