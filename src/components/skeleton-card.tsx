import Skeleton from "./skeleton";

// Mirrors HostingCard: same outer width, card chrome, 200px photo and content rhythm,
// so swapping skeletons for cards does not shift the layout.
export default function SkeletonCard() {
	return (
		<div className="flex-1 basis-80 max-w-[500px] w-full">
			<div className="min-h-[380px] flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[3%] pb-6">
				<Skeleton className="h-[200px] w-full rounded-none" />
				{/* Same gap and margins as HostingCard's CardContent; each bar is the height of the line it stands for. */}
				<div className="flex flex-1 flex-col gap-y-2 px-6">
					<Skeleton className="mb-1 mt-6 h-7 w-2/3" />
					<Skeleton className="h-5 w-1/2" />
					<Skeleton className="mt-1 h-8 w-1/3" />
					<div className="mt-auto">
						<div className="my-3 h-px bg-white/10" />
						<div className="flex items-center gap-2">
							<Skeleton className="size-10 rounded-full" />
							<Skeleton className="h-4 w-1/3" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
