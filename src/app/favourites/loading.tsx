import Skeleton from '@/components/skeleton';
import SkeletonGrid from '@/components/skeleton-grid';

// Next shows this in place of the whole page while navigating, so it brings the page's own
// spacing and a slot for the title. Inside the page, the Suspense fallback is SkeletonGrid alone.
export default function Loading() {
	return (
		<main className="main-container">
			<div className="mb-16 w-full max-w-[1100px]">
				<Skeleton className="h-9 w-64 lg:h-[60px] lg:w-96" />
			</div>
			<SkeletonGrid />
		</main>
	);
}
