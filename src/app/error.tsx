"use client"; // Error components must be Client Components

import H1 from "@/components/h1";
import { useEffect } from "react";
import { FrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
			{/* <H1>{error.message}</H1> */}
			<H1 className="flex gap-4 items-center justify-center mb-12">
				<span>Sorry, something went wrong</span>
				<span><FrownIcon size={40} /></span>
			</H1>
			<Button	onClick={reset} >
				Try again
			</Button>
		</main>
	);
}