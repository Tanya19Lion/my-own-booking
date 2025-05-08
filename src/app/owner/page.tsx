import { Metadata } from "next";
import H1 from "@/components/h1";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOutBtn } from "@/components/signout-btn";

export default async function OwnerPage() {
    const session = await auth(); 
    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col items-center justify-center pt-28 space-y-4"> 
            <H1 className="text-center mb-12">Your account</H1>    
            <p className="text-center">Logged in as {session?.user?.email}</p>                 
           
           <SignOutBtn />
        </div>
    );
}

export const metadata: Metadata = {
    title: "Owner page",
    description: "Page where the owners can add their hosting and check them",
};	