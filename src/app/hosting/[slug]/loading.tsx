import Skeleton from '@/components/skeleton';

export default function Loading() {
	return (
		<div className="flex flex-col items-center py-24 gap-y-4 px-3">
			<Skeleton className="h-4 w-[550px]" />
			<Skeleton className="h-4 w-[400px]" />
			<Skeleton className="h-4 w-[430px]" />
		</div>
	);
}