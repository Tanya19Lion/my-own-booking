"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
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
			className="w-full h-full min-h-[380px] flex flex-col justify-between bg-white/[3%] rounded-xl overflow-hidden relative transition-colors duration-500 pb-6 border-white/10 group-hover:border-white/25 group-focus-visible:border-white/25" 
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
							<HostingButton actionType='edit' hosting={hosting} className="border border-slate-950 bg-white text-slate-950 hover:bg-white/80">
								<Pencil size={24} />
							</HostingButton> 
							<HostingButton 
								actionType='delete'
								disabled={isPending}
								className="border border-slate-950 bg-white text-slate-950 hover:bg-white/80"
								onClick={async () => startTransition(async () => { await deleteHosting(+hosting.id); })}
							>
								<Trash2 size={24} />
							</HostingButton>
						</div>
					)
				}			
			</div>	
			<CardContent className="flex flex-col flex-1 items-start gap-y-2">					
				<h2 className="mb-1 mt-6 text-xl font-semibold">{name}</h2>
				<p className="text-sm text-muted-foreground">
					{location} · {maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}
				</p>
				<p className="mt-1 text-2xl font-semibold tabular-nums">
					${price.toLocaleString('en-US')}
					<span className="text-base font-normal text-muted-foreground"> / night</span>
				</p>
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
		<div className="flex-1 basis-80 max-w-[500px] w-full">
			{innerCardContent}
		</div>
	) : (
		<Link 
			href="/hosting/[slug]" as={`/hosting/${slug}`}
			ref={ref}
			className="group flex-1 basis-80 max-w-[500px] w-full state-effects"
		>
			{innerCardContent}
		</Link>
	);
}


