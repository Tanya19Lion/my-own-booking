import H1 from "@/components/h1";
import { Suspense } from "react";
import { Metadata } from "next";
import Loading from "./loading";
import FavouriteHostingsList from "@/components/favourite-hostings-list";

export default async function FavouriteHostingsPage() {
    return (
        <main className="w-[100%] flex flex-col items-center pb-12 pt-28 px-3 sm:px-4">
            <H1 className="text-center px-3 mb-16">
                All your favourite hostings
            </H1>

            <Suspense fallback={<Loading />}>
                <FavouriteHostingsList />
            </Suspense>
        </main>
    );
}

export const metadata: Metadata = {
	title: "Your favourites hostings to stay",
	description: "All your favourites hostings in one place",
};	