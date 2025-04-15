import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  	return twMerge(clsx(inputs))
};

export const getImageUrl = (filename: string) => {
	return `/assets/${filename}`;
};

export function clearAndCapitalizeCity(city: string) {
    const trimmedCity = city.trim();
    const normalizedCity = trimmedCity.replace(/\s+/g, " ");
    const capitalizedCity = normalizedCity
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

    return capitalizedCity;
};