import Link from "next/link";
import { Suspense } from "react";
import SearchForm from "@/components/search-form";
import MainBackground from '../../public/assets/background-img-13.jpg';
import H1 from "@/components/h1";
import H2 from "@/components/h2";
import HeroBackground from "@/components/hero-background";
import HostingCard from "@/components/hosting-card";
import SkeletonGrid from "@/components/skeleton-grid";
import { getFeaturedHostings } from "@/lib/server-utils";

export default function Home() {
	return (
		<main className="flex flex-1 flex-col">
			{/* Keeps the height it had when it was the whole page (viewport minus 69px header and 49px
			    footer): the photo box below is a percentage of it, so the house would jump up otherwise.
			    On phones the content is already taller than that. */}
			<section className="main-container relative md:min-h-[calc(100svh-118px)]">
				{/* 170% tall and clipped: pushes the lit house below all the text, into the page's empty band.
				    On phones the stacked form fills that band, so the house goes lower still and the crop
				    shifts right to centre it (it sits right of centre in the photo). */}
				<HeroBackground src={MainBackground} className="h-[170%] max-sm:h-[185%] max-sm:[&_img]:object-[56%_0%]"/>
				<H1 className="text-center">Find a cozy place to stay</H1>

				<ViewSection>
					<p>
						<span className="font-bold text-brand">8,000 places</span> to choose from
					</p>
				</ViewSection>

				<SearchForm />

				<section className="mt-4 mb-16 flex gap-x-4 text-sm text-white/65">
					<p>Popular cities: </p>
					<div className="space-x-2 font-semibold">
						<Link href="/hostings/kyiv">Kyiv</Link>
						<Link href="/hostings/london">London</Link>
						<Link href="/hostings/barcelona">Barcelona</Link>
					</div>
				</section>

				<ViewSection>
					<p>
						Have a place to share?
					</p>
					<p>
						<Link href="/login" className="text-brand underline font-medium">List your place</Link>
					</p>
				</ViewSection>
			</section>

			<section className="flex flex-col items-center px-3 pb-16 sm:px-4">
				<div className="mb-6 flex w-full max-w-[1100px] items-baseline justify-between gap-4">
					<H2 className="mb-0">Top rated</H2>
					<Link href="/hostings/all" className="text-sm font-medium text-white/70 hover:text-white">
						All places →
					</Link>
				</div>
				<Suspense fallback={<SkeletonGrid count={3}/>}>
					<FeaturedHostings />
				</Suspense>
			</section>
		</main>
	);
}

async function FeaturedHostings() {
	const hostings = await getFeaturedHostings();

	return (
		<div className="flex w-full max-w-[1100px] flex-wrap justify-center gap-10">
			{hostings.map((hosting) => <HostingCard key={hosting.id} hosting={hosting}/>)}
		</div>
	);
}

type ViewSectionProps = {
	children: React.ReactNode;
};
const ViewSection = ({ children }: ViewSectionProps ) => {
	return (
		<section className="mb-8 mt-7 text-xl sm:text-2xl lg:text-3xl text-white/75 text-center space-y-2">
			{children}
		</section>
	);
};
