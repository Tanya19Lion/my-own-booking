import H1 from "@/components/h1";
import { clearAndCapitalizeCity } from "@/lib/utils";
import { Suspense } from "react";
import SkeletonGrid from "@/components/skeleton-grid";
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
	// These come straight from the URL, so a typo must fall back to a default, not reach
	// getHostings (which throws on invalid params) or toISOString (which throws on an invalid date).
	const page = toPositiveInt(resolvedsearchParams.page);
	const maxGuests = toPositiveInt(resolvedsearchParams.guests);
	const startDate = toDate(resolvedsearchParams.startDate);
	const endDate = toDate(resolvedsearchParams.endDate);

	return (
		<main className="main-container min-h-screen">
			<H1 className="w-full max-w-[1100px] mb-16">
				{place === 'favorites' && 'Your favourite places'}
				{place === 'all' && 'All places'}
				{place !== 'all' && place !== 'favorites' && `Places in ${clearAndCapitalizeCity(decodeURIComponent(place))}`}
			</H1>

			<Suspense fallback={<SkeletonGrid />} key={place + page}>
				<HostingsList place={place} page={page} maxGuests={maxGuests} startDate={startDate} endDate={endDate} />
			</Suspense>
		</main>
	);
}

type SearchParam = string | string[] | undefined;

const toPositiveInt = (value: SearchParam) => {
	const number = Number(value);
	return Number.isInteger(number) && number >= 1 ? number : 1;
};

const toDate = (value: SearchParam) => {
	if (typeof value !== 'string') {
		return undefined;
	}
	const date = new Date(value);
	return isNaN(date.getTime()) ? undefined : date;
};

export async function generateMetadata(props: { params: Promise<{ place: string }>}): Promise<Metadata> {
    const params = await props.params;
    return {	
		title: params.place === 'all'
			? 'All places'
			: `Places in ${clearAndCapitalizeCity(decodeURIComponent(params.place))}`,
	};
}

