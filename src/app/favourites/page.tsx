import H1 from "@/components/h1";
import { Suspense } from "react";
import { Metadata } from "next";
import SkeletonGrid from "@/components/skeleton-grid";
import FavouriteHostingsList from "@/components/favourite-hostings-list";

export default async function FavouriteHostingsPage() {
    return (
        <main className="main-container">
            <H1 className="w-full max-w-[1100px] mb-16">
                Your favourite places
            </H1>

            <Suspense fallback={<SkeletonGrid />}>
                <FavouriteHostingsList />
            </Suspense>
        </main>
    );
}

export const metadata: Metadata = {
	title: "Your favourite places to stay",
	description: "All your favourite places in one place",
};	