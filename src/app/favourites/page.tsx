import H1 from "@/components/h1";
import { Suspense } from "react";
import { Metadata } from "next";
import Loading from "./loading";
import MainBackground from '../../../public/assets/background-img-2.jpg';
import Image from "next/image";
import FavouriteHostingsList from "@/components/favourite-hostings-list";

export default async function FavouriteHostingsPage() {
    return (
        <main className="main-container relative">
            <section className="absolute inset-0 z-[-1] overflow-hidden">
                <Image src={MainBackground} fill className="object-cover blur-2xl" alt="Main page background" quality={50} sizes="(max-width: 1280px) 100vw, 1280px"/>
            </section>
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