import H1 from "@/components/h1";
import { capitalizePlaceName } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import HostingsList from "@/components/hostings-list";

type HostingsPageProps = {
	params: {
		place: string
	}
};

export function generateMetadata({ params }: HostingsPageProps): Metadata {
	const { place } = params;

	return {	
		title: place === 'all' ? 'All hostings' : `Hostings in ${capitalizePlaceName(place)}`,
	};
}

export default function HostingsPage({ params }: HostingsPageProps) {
	const place = capitalizePlaceName(params.place);

	return (
		<main className="w-[100%] flex flex-col items-center pb-12 pt-28">
			<H1 className="text-center px-3 mb-16">
				{place === 'All' && 'All hostings'}
				{place !== 'All' && `Hostings in ${place}`}
			</H1>

			<Suspense fallback={<Loading />}>
				{/* <HostingsList place={place} page={parsedPage.data}/> */}
				<HostingsList place={place} />
			</Suspense>
		</main>
	);
}

