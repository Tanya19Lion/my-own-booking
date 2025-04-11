import { Heart } from "lucide-react";
import { useMemo } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/state";
// import { addFavouriteHosting, removeFavouriteHosting } from "@/store/Hostings/Hostings-slice";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HostingFavouriteButtonProps = {
	id: number;
	className?: string;
};

export default function HostingFavouriteButton({ id, className }: HostingFavouriteButtonProps) {
	// const dispatch = useDispatch();
	// const { favouritesIds } = useSelector((state: RootState) => state.Hostings);

	// const isFavourite = useMemo(() => favouritesIds.includes(id), [favouritesIds, id]);

	const handleFavouriteHosting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		// if (isFavourite) {
		// 	dispatch(removeFavouriteHosting(id));
		// } else {
		// 	dispatch(addFavouriteHosting(id));
		// }
	}

	return (
		<Button 
			onClick={(e) => handleFavouriteHosting(e)} 
			className={className}
			variant='outline'
		>
			{/* <Heart size={24} className={cn("text-white-500", { 'fill-primary text-primary': isFavourite })} /> */}
		</Button>
	)
}
