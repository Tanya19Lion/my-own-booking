import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  	return twMerge(clsx(inputs))
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

export const formatDateForInput = (date?: string | Date | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
};

export function isDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
}

export const absoluteUrl = (path: string) => `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}${path}`;

export const changeImageUrl = (image: string) => {
    return `/assets/${image}`;
}; 