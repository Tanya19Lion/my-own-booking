'use client';

import H1 from "@/components/h1";
import H2 from "@/components/h2";
import HostingCard from "@/components/hosting-card";
import HostingButton from "@/components/hosting-button";

import { useOwnerData } from "@/context/owner-context";

export default function OwnerDashboard() {
    const { hostings, owner } = useOwnerData();

    return (
        <main className="w-[100%] flex flex-col items-center pb-12 pt-28 px-3 sm:px-9">
            <H1 className="text-4xl font-bold mb-16">Hello, {owner.firstName} {owner.lastName}</H1>
            <div className="w-full flex flex-col gap-5 mb-10 sm:flex-row sm:items-center sm:justify-between">
                <H2 className="text-2xl font-bold mb-0">
                    {
                        hostings.length === 0
                            ? "You don't have any hostings yet"
                            : (
                                <>
                                    Currently you have {" "} 
                                    <span className="text-accent">{hostings.length}{'\u00A0'}{hostings.length === 1 ? 'hosting' : 'hostings'}</span>
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
