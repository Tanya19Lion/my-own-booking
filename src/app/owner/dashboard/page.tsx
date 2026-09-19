'use client';

import H1 from "@/components/h1";
import H2 from "@/components/h2";
import HostingCard from "@/components/hosting-card";
import HostingButton from "@/components/hosting-button";

import { useOwnerData } from "@/context/owner-context";

export default function OwnerDashboard() {
    const { hostings, owner } = useOwnerData();

    return (
        <main className="main-container">
            <H1 className="w-full text-4xl mb-16">Hello, {owner.firstName} {owner.lastName}</H1>
            <div className="w-full flex flex-col gap-5 mb-10 sm:flex-row sm:items-center sm:justify-between">
                <H2 className="text-2xl mb-0">
                    {
                        hostings.length === 0
                            ? "You haven't listed a place yet"
                            : (
                                <>
                                    You have {" "}
                                    <span className="text-brand">{hostings.length}{'\u00A0'}{hostings.length === 1 ? 'place' : 'places'}</span>
                                </>
                            )
                    }
                </H2>
                <HostingButton actionType="add" />
            </div>
            <section className="flex flex-wrap justify-center gap-10 max-w-[1100px]">
                {hostings.length !== 0 && hostings.map((hosting) => <HostingCard key={hosting.id} hosting={hosting} />)}	
            </section>
        </main>
    );  
};
