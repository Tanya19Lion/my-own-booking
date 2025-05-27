'use client';

import H1 from "@/components/h1";
import { SignOutBtn } from "@/components/signout-btn";
import { useOwnerData } from "@/context/owner-context";

export default function OwnerPage() {
    const { owner } = useOwnerData();

    return (
        <main className="main-container">
            <H1 className="text-center mb-12">Your account</H1>    
            <p className="text-center mb-6">Logged in as {owner.email}</p>                 
           
           <SignOutBtn />
        </main>
    );
}

