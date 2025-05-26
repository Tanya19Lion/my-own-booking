import HostingCard from "./hosting-card";
import H2 from "./h2";
import PaginationControls from "./pagination-controls";
import { getHostings } from "@/lib/server-utils";
import { HostingWithOwner } from "@/lib/types";

type HostingsListProps = {
	place: string; 
	page?: number;
	maxGuests: number;
	startDate?: Date;
	endDate?: Date;
};

export default async function HostingsList({ place, page = 1, maxGuests, startDate, endDate }: HostingsListProps) {	
	const { hostings, totalCount } = await getHostings({
		city: place,
		page: page ?? 1,
		guests: maxGuests,
		startDate: startDate?.toISOString(), 
		endDate: endDate?.toISOString(),    
	});

	const previousPath =  page > 1 ? `/hostings/${place}?page=${page - 1}` : '';
	const nextPath = (totalCount > 6 * page) ? `/hostings/${place}?page=${page + 1}` : '';

	return (
		<section className="flex flex-wrap justify-center gap-10 max-w-[1100px]">
			{
				hostings.length !== 0 
					? hostings.map((hosting) => (
						<HostingCard
							key={hosting.id}
							hosting={{
								...hosting,
								availability: hosting.availability === null ? undefined : hosting.availability,
							} as HostingWithOwner}
						/>
					))
					: <H2 className="text-muted-foreground">Sorry, no hostings found with the entered data</H2>
			}	

			<PaginationControls previousPath={previousPath} nextPath={nextPath}/>
		</section>
	)
}
