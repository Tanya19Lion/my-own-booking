import Skeleton from '@/components/skeleton';

// Mirrors page.tsx box for box — same container, gallery ratio and two columns — so the
// footer does not jump up under the header while the place loads, and nothing shifts after.
export default function Loading() {
	return (
		<main className="main-container min-h-screen">
			<article className="w-full max-w-6xl" aria-busy="true" aria-label="Loading place">
				<div className="mb-6 flex items-start justify-between gap-4">
					<div className="flex-1">
						{/* On phones a name wraps to two 36px lines: 32 + 8 + 32 keeps the same 72px. */}
						<div className="space-y-2 sm:space-y-0">
							<Skeleton className="h-8 w-full sm:h-9 sm:w-2/3 lg:h-10"/>
							<Skeleton className="h-8 w-1/2 sm:hidden"/>
						</div>
						<Skeleton className="mt-2 h-6 w-40"/>
					</div>
					<Skeleton className="size-9 shrink-0"/>
				</div>

				{/* Same geometry as the gallery: a 3fr hero and four tiles in a 5:2 box. */}
				<div className="hidden md:grid aspect-[5/2] grid-cols-[3fr_1fr_1fr] grid-rows-2 gap-2 overflow-hidden rounded-xl">
					<Skeleton className="row-span-2 h-full w-full rounded-none"/>
					{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-full w-full rounded-none"/>)}
				</div>
				<Skeleton className="aspect-[3/2] h-auto w-full rounded-xl md:hidden"/>

				<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
					<div>
						<Skeleton className="h-7 w-48"/>
						<div className="mt-4 space-y-3">
							<Skeleton className="w-full"/>
							<Skeleton className="w-full"/>
							<Skeleton className="w-11/12"/>
							<Skeleton className="w-3/5"/>
						</div>

						<div className="my-8 h-px bg-white/10"/>

						<div className="flex items-center gap-3">
							<Skeleton className="size-12 rounded-full"/>
							<Skeleton className="w-48"/>
						</div>
						<div className="mt-4 space-y-3">
							<Skeleton className="w-full"/>
							<Skeleton className="w-4/5"/>
						</div>
					</div>

					{/* Price panel: first on mobile, like the real one. */}
					<div className="order-first self-start rounded-xl border border-white/10 bg-white/[3%] p-6 lg:order-none">
						<Skeleton className="h-9 w-40"/>
						{/* h-5: the height of a text-sm line, so the panel matches the real one. */}
						<Skeleton className="mt-4 h-5 w-56 max-w-full"/>
						<Skeleton className="mt-6 h-9 w-full"/>
						<Skeleton className="mx-auto mt-3 h-5 w-36"/>
					</div>
				</div>
			</article>
		</main>
	);
}
