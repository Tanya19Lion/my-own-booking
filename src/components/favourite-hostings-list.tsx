'use client';

import { useEffect, useState } from "react";
import H2 from "./h2";
import HostingCard from './hosting-card';
import { HostingWithOwner } from "@/lib/types";
import { fetchFavouritesByIds } from "@/actions/hosting-actions";

export const LOCAL_STORAGE_KEY = "favouriteHostings";

export default function FavouriteHostingsList() {
    const [favouriteHostings, setFavouriteHostings] = useState<HostingWithOwner[]>([]);

    const loadFavourites = async () => {
		try {
            const favIds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]').reverse();

            if (!Array.isArray(favIds) || favIds.length === 0) {
                setFavouriteHostings([]);
                return;
            }

            const data = await fetchFavouritesByIds(favIds);
			setFavouriteHostings(data);
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
                favouriteHostings.length !== 0 
                    ? favouriteHostings.map((hosting: HostingWithOwner) => <HostingCard key={hosting.id} hosting={hosting} onFavouriteChange={loadFavourites} />) 
                    : <H2 className="text-muted-foreground">You have no favourite hostings yet</H2>
            }	         
        </section>
    )
}

