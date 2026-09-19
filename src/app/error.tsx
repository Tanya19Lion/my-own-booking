"use client"; // Error components must be Client Components

import H1 from "@/components/h1";
import Link from "next/link";
import { useEffect } from "react";
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
			<H1 className="text-center">This page didn&apos;t load</H1>
			<p className="mt-4 max-w-lg text-balance text-center text-muted-foreground">
				It&apos;s usually temporary. Try again, or go back to the home page.
			</p>
			<div className="mt-8 flex items-center gap-6">
				<Button	onClick={reset} className="common-btn hover:bg-brand hover:text-slate-950 focus:bg-brand active:bg-brand">
					Try again
				</Button>
				<Link href="/" className="text-sm font-medium text-white/70 hover:text-white">
					Go to home page
				</Link>
			</div>
		</main>
	);
}
