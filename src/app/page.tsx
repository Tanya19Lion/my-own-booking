// import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import SearchForm from "@/components/search-form";
import H1 from "@/components/h1";

export default function Home() {
	return (
		<main className="flex flex-col items-center h-screen pt-36 px-3">
			<H1>Find nice and cozy hosting to stay</H1>	

			<ViewSection>
				<p>
					Browse more than <span className="font-bold text-accent">8.000 hostings</span> for you
				</p>				
			</ViewSection>
			 
			<SearchForm />			

			<section className="mt-4 mb-16 flex gap-x-4 text-sm text-white/50">
				<p>Popular cities: </p>
				<div className="space-x-2 font-semibold">
					<Link href="/hostings/kyiv">Kyiv</Link>
					<Link href="/hostings/london">London</Link>
					<Link href="/hostings/barcelona">Barcelona</Link>
				</div>
			</section>		

			<ViewSection>
				<p>
					Want to share your hosting with the whole world? 
				</p>
				<p>
					Welcome to do that <Link href="/login" className="text-accent underline font-medium">here</Link>.
				</p>
			</ViewSection>	
		</main>
	);
}

type ViewSectionProps = {
	children: React.ReactNode;
};
const ViewSection = ({ children }: ViewSectionProps ) => {
	return (
		<section className="mb-8 mt-7 text-2xl lg:text-3xl opacity-75 text-center space-y-2">
			{children}			
		</section>
	);
};