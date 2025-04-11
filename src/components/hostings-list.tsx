import HostingCard from "./hosting-card";
import PaginationControls from "./pagination-controls";
import { getHostings } from "@/lib/utils";
import { HostingWithOwner } from "@/lib/types";

type HostingsListProps = {
	place: string; 
	page?: number;
	maxGuests: number;
	startDate?: Date;
	endDate?: Date;
};

export default async function HostingsList({ place, page = 1, maxGuests, startDate, endDate }: HostingsListProps) {	
	const { hostings, totalCount } = await getHostings(place, page, maxGuests, startDate, endDate);
	const hostingsByCity = (hostings as HostingWithOwner[]).filter((hosting) => hosting.location === place);

	const previousPath =  page > 1 ? `/hostings/${place}?page=${page - 1}` : '';
	const nextPath = (totalCount > 6 * page) ? `/hostings/${place}?page=${page + 1}` : '';

	return (
		<section className="flex flex-wrap justify-center gap-10 max-w-[1100px]">
			{hostingsByCity.length !== 0 && hostingsByCity.map((hosting: HostingWithOwner) => <HostingCard key={hosting.id} hosting={hosting} />)}
			{hostingsByCity.length === 0 && hostings.map((hosting: HostingWithOwner) => <HostingCard key={hosting.id} hosting={hosting} />)}

			<PaginationControls previousPath={previousPath} nextPath={nextPath}/>
		</section>
	)
}
