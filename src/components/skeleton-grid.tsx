import SkeletonCard from "./skeleton-card";

// Same box as HostingsList / FavouriteHostingsList (one page = 6 places), so skeletons fill the
// exact slots the cards will take.
export default function SkeletonGrid({ count = 6 }: { count?: number }) {
	return (
		<section className="flex flex-wrap justify-center gap-10 max-w-[1100px] w-full">
			{Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
		</section>
	);
}
