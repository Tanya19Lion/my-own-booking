import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import HostingDetailsCardImages from "@/components/hosting-details-card-images";
import { getHosting } from "@/lib/server-utils";
import { DollarSign, Pin, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import OwnerAvatar from "@/components/owner-avatar";
import FavouriteHostingsButton from "@/components/favourite-hostings-button";

type HostingPageProps = {
	params: {
		slug: string;
	}
};

export default async function HostingPage({ params }: HostingPageProps) {
	const { slug } = params;
	const hosting = await getHosting(slug);

	if (!hosting) {
		throw new Error("Hosting not found");
	}

	const { id, name, price, location, maxGuests, description, owner } = hosting;

	return (		
		<main className="w-[100%] flex flex-col items-center pt-18 pb-18 px-3 sm:px-4">
			<Card className="mx-auto p-6" key={id}>
				{hosting && <HostingDetailsCardImages hosting={hosting} />}
				<Separator className="mt-4 mb-6" />

				<div className="flex justify-between gap-4">
					<div className="flex flex-col gap-4">
						<h1 className="mb-2 text-2xl font-bold">{name}</h1>
						<div className="whitespace-pre-line">{description}</div>

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

					<div>
						<FavouriteHostingsButton id={id} className="heart-color"/>
					</div>
				</div>

				<Separator className="my-4"/>

				{owner && <OwnerAvatar owner={owner} className="w-10 h-10"/>}	
				<p className="mt-5">{owner.bio}</p>
				<a href={`mailto:${owner.email}`} className="mt-5">Contacts: <strong>{owner.email}</strong></a>
			</Card>
		</main>	
	);
}

export async function generateMetadata(props: Promise<HostingPageProps>): Promise<Metadata> {
	const { params } = await props;
	const { slug } = params;
	const hosting = await getHosting(slug);

	if (!hosting) {
		throw new Error("Hosting not found");
	}

	return {
		title: `${hosting.name}`,
		description: 'It is a perfect place for your vacation',
	};
} 