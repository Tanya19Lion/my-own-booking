import { DollarSign, Pin, Users } from "lucide-react";
import { Hosting } from "@prisma/client";
import { Card } from "@/components/ui";
import HostingDetailsCardImages from "./hosting-details-card-images";
import ListingFavouriteButton from "./hosting-favourite-button";
// import UserAvatar from "./user-avatar";
// import useUsersQuery from "@/hooks/queries/useUsersQuery";
// import ListingRatingStars from "./listing-rating-stars";

type HostingDetailsCardProps = {
	hosting: Hosting;
};

export default function ListingDetailsCard({ hosting }: HostingDetailsCardProps) {
	// const { data: { data: users } = {} } = useUsersQuery();
	const { id, name, price, location, maxGuests, description, ownerId } = hosting;
	// const hostingOwner = users[userId - 1];

	return (			
		<Card className="mx-auto p-4">
			<HostingDetailsCardImages hosting={hosting} />
			{/* <Separator className="mb-4" /> */}

			<div className="flex justify-between gap-4">
				<div className="flex flex-col gap-4">
					<h1 className="mb-2 text-2xl font-bold">{name}</h1>

					<div className="flex items-center gap-2">
						<DollarSign className="h-4 w-4 text-foreground" />
						<span className="text-muted-foreground">
							<span className="font-bold text-foreground">{price} </span>
							/ night
						</span>
					</div>					

					<div className="flex items-center gap-2">
						<Pin className="h-4 w-4 text-foreground" />
						<span className="text-muted-foreground">{location}</span>
					</div>

					<div className="flex items-center gap-2">
						<Users className="h-4 w-4 text-foreground" />
						<span className="text-muted-foreground">{maxGuests} guests</span>
					</div>
				</div>

				{/* <div>
					<ListingRatingStars listing={listing} className="mr-2 bg-transparent px-0 py-0" />
					<ListingFavouriteButton id={id} />
				</div> */}
			</div>
			{/* <Separator className="my-4"/>
			{listingUser && (
				<>
					<UserAvatar user={listingUser} className="w-10 h-10"/>
					<Separator className="my-4"/>
				</>
			)}	 */}
			<div className="whitespace-pre-line">{description}</div>
		</Card>
	)
}
