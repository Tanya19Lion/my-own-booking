import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  	return twMerge(clsx(inputs))
};

export function capitalizePlaceName(place: string) {
  	return place.charAt(0).toUpperCase() + place.slice(1).toLowerCase();
};

export const getImageUrl = (filename: string) => {
	return `/assets/${filename}`;
};
