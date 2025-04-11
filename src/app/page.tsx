// import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import SearchForm from "@/components/search-form";
import H1 from "@/components/h1";

export default function Home() {
	return (
		<main className="flex flex-col items-center h-screen pt-36 px-3">
			<H1>Find nice and cozy hosting to stay</H1>	
					
			<p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
				Browse more than <span className="font-bold italic underline text-accent">8.000 hostings</span> for you
			</p>
			
			<SearchForm />			

			<section className="mt-4 flex gap-x-4 text-sm text-white/50">
				<p>Popular cities: </p>
				<div className="space-x-2 font-semibold">
					<Link href="/hostings/kyiv">Kyiv</Link>
					<Link href="/hostings/London">London</Link>
					<Link href="/hostings/barcelona">Barcelona</Link>
				</div>
			</section>
		</main>
	)
}