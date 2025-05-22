import { Metadata } from "next";
import Link from "next/link";
import H1 from "@/components/h1";
import SignUpForm from "@/components/signup-form";

export default async function SignUpPage() {
    return (
        <main className="pt-8 pb-8">  
            <H1 className="text-center mb-12">Sign Up</H1>           
            
            <SignUpForm />

            <p className="mt-6 text-sm">
                Already have an account?{" "} 
                <Link href="/login" className="text-accent underline">Log in</Link>
            </p>
        </main>
    );
}

export const metadata: Metadata = {
    title: "Sign up page",
    description: "Page where the users can sign up to create an account",
};	