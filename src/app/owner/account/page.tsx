'use client';

import H1 from "@/components/h1";
import { SignOutBtn } from "@/components/signout-btn";
import { useOwnerData } from "@/context/owner-context";

export default function OwnerPage() {
    const { owner } = useOwnerData();

    return (
        <div className="flex flex-col items-center justify-center pt-28 space-y-4"> 
            <H1 className="text-center mb-12">Your account</H1>    
            <p className="text-center">Logged in as {owner.email}</p>                 
           
           <SignOutBtn />
        </div>
    );
}

