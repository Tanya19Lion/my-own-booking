import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type PaginationControlsProps = {
	previousPath: string;
	nextPath: string;
};

const btnStyles = "text-white px-5 py-3 bg-white/5 rounded-md flex gap-x-2 items-center opacity-75 hover:opacity-100 transition text-sm";

export default function PaginationControls({ previousPath, nextPath }: PaginationControlsProps) {
	return (
		<section className="w-full flex justify-between gap-5 mt-5">
			{
				previousPath ? (
					<Link href={previousPath} className={btnStyles}>
						<ArrowLeftIcon />
						Previous
					</Link>
				) : <div />
			}		
			{
				nextPath && (
					<Link href={nextPath} className={btnStyles}>
						Next
						<ArrowRightIcon />
					</Link>			
				)
			}				
		</section>
	)
}
