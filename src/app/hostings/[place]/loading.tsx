import SkeletonCard from '@/components/skeleton-card';

export default function Loading() {
    return (
        <div className='flex flex-wrap max-w-[1100px] mx-auto py-24 px-[20px] gap-20'>
            {
                Array.from({length: 6}).map((_, i) => <SkeletonCard key={i}/>)
            }
        </div>
    );
}
