import H1 from "@/components/h1";
import { capitalizePlaceName } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import HostingsList from "@/components/hostings-list";

type Props = {
	params: {
		place: string;
	}
};
type HostingsPageProps = Props & {
	searchParams: {
		[key: string]: string | string[] | undefined;
	}
};

export default function HostingsPage({ params, searchParams }: HostingsPageProps) {
	const place = capitalizePlaceName(params.place);
	const page = searchParams.page ?? 1;

	return (
		<main className="w-[100%] flex flex-col items-center pb-12 pt-28">
			<H1 className="text-center px-3 mb-16">
				{place === 'All' && 'All hostings'}
				{place !== 'All' && `Hostings in ${place}`}
			</H1>

			<Suspense fallback={<Loading />}>
				<HostingsList place={place} page={+page}/>
			</Suspense>
		</main>
	);
}

export function generateMetadata({ params }: Props): Metadata {
	const { place } = params;

	return {	
		title: place === 'all' ? 'All hostings' : `Hostings in ${capitalizePlaceName(place)}`,
	};
}
