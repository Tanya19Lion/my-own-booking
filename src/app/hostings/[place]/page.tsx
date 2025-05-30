import H1 from "@/components/h1";
import { clearAndCapitalizeCity } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import HostingsList from "@/components/hostings-list";
import { Metadata } from "next";

type HostingsPageProps = {
	params: Promise<{ place: string;}>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HostingsPage({ params, searchParams }: HostingsPageProps) {
	const resolvedParams = await params;
	const resolvedsearchParams = await searchParams;
	const place = resolvedParams.place;
	const page = resolvedsearchParams.page ?? 1;
	const maxGuests = resolvedsearchParams.guests ? +resolvedsearchParams.guests : 1;
	const startDate = resolvedsearchParams.startDate ? new Date(resolvedsearchParams.startDate as string) : undefined;
	const endDate = resolvedsearchParams.endDate ? new Date(resolvedsearchParams.endDate as string) : undefined;

	return (
		<main className="main-container min-h-screen">
			<H1 className="text-center px-3 mb-16">
				{place === 'favorites' && 'Your favourite hostings'}
				{place === 'all' && 'All hostings'}
				{place !== 'all' && place !== 'favorites' && `Hostings in ${clearAndCapitalizeCity(decodeURIComponent(place))}`}
			</H1>

			<Suspense fallback={<Loading />} key={place + page}>
				<HostingsList place={place} page={+page} maxGuests={maxGuests} startDate={startDate} endDate={endDate} />
			</Suspense>
		</main>
	);
}

export async function generateMetadata(props: { params: Promise<{ place: string }>}): Promise<Metadata> {
    const params = await props.params;
    return {	
		title: params.place === 'all' 
			? 'All hostings' 
			: `Hostings in ${clearAndCapitalizeCity(decodeURIComponent(params.place))}`,
	};
}

