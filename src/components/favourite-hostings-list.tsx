'use client';

import { useEffect, useState } from "react";
import EmptyState from "./empty-state";
import SkeletonGrid from "./skeleton-grid";
import HostingCard from './hosting-card';
import { HostingWithOwner } from "@/lib/types";
import { fetchFavouritesByIds } from "@/actions/hosting-actions";

export const LOCAL_STORAGE_KEY = "favouriteHostings";

export default function FavouriteHostingsList() {
    // null until the first load finishes — starting from [] flashed the empty state before the cards.
    const [favouriteHostings, setFavouriteHostings] = useState<HostingWithOwner[] | null>(null);

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
			setFavouriteHostings((current) => current ?? []);
		}
	};

	useEffect(() => {
		loadFavourites();
	}, []);

    if (favouriteHostings === null) {
        return <SkeletonGrid />;
    }

    return (
        <section className="flex flex-wrap justify-center gap-10 max-w-[1100px]">
            {
                favouriteHostings.length !== 0 
                    ? favouriteHostings.map((hosting: HostingWithOwner) => <HostingCard key={hosting.id} hosting={hosting} onFavouriteChange={loadFavourites} />) 
                    : (
                        <EmptyState
                            title="No favourites yet"
                            description="Tap the heart on any place to save it here."
                            href="/hostings/all"
                            action="Browse all places"
                        />
                    )
            }	         
        </section>
    )
}

