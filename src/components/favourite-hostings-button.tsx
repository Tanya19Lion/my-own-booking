"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCAL_STORAGE_KEY } from "./favourite-hostings-list";
import { cn } from "@/lib/utils";

type FavouriteHostingsButtonProps = {
	id: number;
	className?: string;
	onChange?: () => void;
};

export default function FavouriteHostingsButton({ id, className, onChange }: FavouriteHostingsButtonProps) {
	const [isFavourite, setIsFavourite] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		const favIds = stored ? JSON.parse(stored) : [];

		if (favIds.includes(id)) {
			setIsFavourite(true);
		}
	}, [id]);

	const handleFavouriteHosting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		let favIds: number[] = stored ? JSON.parse(stored) : [];

		if (favIds.includes(id)) {
			favIds = favIds.filter((favId) => favId !== id);
			setIsFavourite(false);
		} else {
			favIds.push(id);
			setIsFavourite(true);
		}

		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favIds));

		onChange?.();
	};

	return (
		<Button 
			onClick={handleFavouriteHosting} 
			className={cn("border", className)} 
			variant="secondary" 
		>
			<Heart size={24} className={cn("transition", {"text-slate-950": !isFavourite, "fill-red-500 text-red-500": isFavourite})} />
		</Button>
	);
}
