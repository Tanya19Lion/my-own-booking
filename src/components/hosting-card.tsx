"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Pencil, Pin, Trash2, Users } from "lucide-react";
import { useRef } from "react";
import HostingButton from "./hosting-button";
import HostingCardImages from './hosting-card-images';
import OwnerAvatar from './owner-avatar';
import { Separator } from '@/components/ui/separator';
import { HostingWithOwner } from "@/lib/types";
import FavouriteHostingsButton from "./favourite-hostings-button";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { deleteHosting } from "@/actions/hosting-actions";

type HostingCardProps = {
	hosting: HostingWithOwner;
	onFavouriteChange?: () => void;
};

export default function HostingCard({ hosting, onFavouriteChange }: HostingCardProps) {
	const [isPending, startTransition] = useTransition();
	const activePathname = usePathname();
	const ref = useRef(null);

	const { id, name, slug, location, price, maxGuests, description, owner } = hosting;

	const innerCardContent = (
		<Card 
			className="w-full h-full min-h-[380px] flex flex-col justify-between bg-white/[3%] rounded-xl overflow-hidden relative transition pb-6" 
			key={id}
		>
			<div className="relative ">
				{hosting && <HostingCardImages hosting={hosting} />}
				{
					!activePathname.includes("owner") && (<FavouriteHostingsButton 
															id={id} 
															className="absolute top-4 right-4 z-10 border-slate-950" 
															onChange={onFavouriteChange} 
														/>)
				}	
				{
					activePathname.includes("owner") && (
						<div className="absolute top-4 right-4 z-10 flex gap-2">
							<HostingButton actionType='edit' hosting={hosting} className="border border-slate-950">
								<Pencil size={24} />
							</HostingButton> 
							<HostingButton 
								actionType='delete'
								disabled={isPending}
								className="border border-slate-950"
								onClick={async () => startTransition(async () => { await deleteHosting(+hosting.id); })}
							>
								<Trash2 size={24} />
							</HostingButton>
						</div>
					)
				}			
			</div>	
			<CardContent className="flex flex-col flex-1 items-start gap-y-2">					
				<h2 className="mb-2 mt-6 text-xl font-semibold color-white">{name}</h2>
				<div className="flex items-center gap-2">
					<DollarSign className="h-4 w-4 text-foreground"/>
					<span className="text-muted-foreground">
						<span className="font-bold text-foreground">{price} </span>
						/night
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
				{	
					activePathname.includes("owner") && (
						<>
							<Separator className="my-4"/>
							<p className="text-muted-foreground text-sm">{description}</p>
						</>
					)
				}
				{
					!activePathname.includes("owner") && (
						<div className="mt-auto w-full">				
							<Separator className="mb-3 mt-3" />	
							{owner && <OwnerAvatar owner={owner} className="w-10 h-10"/>}		
						</div>
					)
				}					
			</CardContent>									
		</Card>	
	);

	return activePathname.includes("owner") ? (
		<div className="flex-1 basis-80 max-w-[500px] w-full state-effects">
			{innerCardContent}
		</div>
	) : (
		<Link 
			href="/hosting/[slug]" as={`/hosting/${slug}`}
			ref={ref}
			className="flex-1 basis-80 max-w-[500px] w-full state-effects"
		>
			{innerCardContent}
		</Link>
	);
}


