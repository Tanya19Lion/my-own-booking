"use client"; // Error components must be Client Components

import H1 from "@/components/h1";
import { useEffect } from "react";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="text-center py-24">		
			<H1>{error.message}</H1>
			<button	onClick={reset}>
				Try again
			</button>
		</main>
	);
}