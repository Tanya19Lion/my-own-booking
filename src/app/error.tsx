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
		<main className="main-container">
			<H1 className="flex gap-4 items-center justify-center mb-12">
				<span>Sorry, something went wrong</span>
				<span><FrownIcon size={40} /></span>
			</H1>
			<Button	onClick={reset} className="common-btn hover:bg-accent focus:bg-accent active:bg-accent">
				Try again
			</Button>
		</main>
	);
}