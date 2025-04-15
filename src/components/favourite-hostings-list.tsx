'use client';

import { useEffect, useState } from "react";
import H2 from "./h2";
import HostingCard from './hosting-card';
import { HostingWithOwner } from "@/lib/types";

export const LOCAL_STORAGE_KEY = "favouriteHostings";

export default function FavouriteHostingsList() {
    const [hostings, setHostings] = useState<HostingWithOwner[]>([]);

    const loadFavourites = async () => {
		try {
			const favIds: number[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]').reverse();

			if (!Array.isArray(favIds) || favIds.length === 0) {
				setHostings([]);
				return;
			}

			const res = await fetch('/api/favourites', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ids: favIds }),
			});

			if (!res.ok) {
				throw new Error(`Failed to fetch: ${res.status}`);
			}

			const data = await res.json();
			setHostings(data);
		} catch (error) {
			console.error('Failed to load favourite hostings:', error);
		}
	};

	useEffect(() => {
		loadFavourites();
	}, []);

    return (
        <section className="flex flex-wrap justify-center gap-10 max-w-[1100px]">
            {
                hostings.length !== 0 
                    ? hostings.map((hosting: HostingWithOwner) => <HostingCard key={hosting.id} hosting={hosting} onFavouriteChange={loadFavourites} />) 
                    : <H2 className="text-muted-foreground">You don't have any favourite hostings yet</H2>
            }	         
        </section>
    )
}

