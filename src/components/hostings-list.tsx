import HostingCard from "./hosting-card";
import PaginationControls from "./pagination-controls";
import { getHostings } from "@/lib/utils";
// import { Hosting } from "@prisma/client";
import { HostingWithOwner } from "@/lib/types";

type HostingsListProps = {
	place: string; 
	page?: number;
};

export default async function HostingsList({ place, page = 1 }: HostingsListProps) {	
	// const { hostings, totalCount } = await getHostings(place, page);
	const hostings = await getHostings();
	const hostingsByCity = (hostings as HostingWithOwner[]).filter((hosting) => hosting.location === place);

	// const previousPath =  page > 1 ? `/events/${city}?page=${page - 1}` : '';
	// const nextPath = (totalCount > 6 * page) ? `/events/${city}?page=${page + 1}` : '';

	return (
		<section className="flex flex-wrap justify-center gap-10 max-w-[1100px]">
			{hostingsByCity.length !== 0 && hostingsByCity.map((hosting: HostingWithOwner) => <HostingCard key={hosting.id} hosting={hosting} />)}
			{hostingsByCity.length === 0 && hostings.map((hosting: HostingWithOwner) => <HostingCard key={hosting.id} hosting={hosting} />)}

			{/* <PaginationControls previousPath={previousPath} nextPath={nextPath}/> */}
		</section>
	)
}
