import { Metadata } from "next";
import Link from "next/link";
import H1 from "@/components/h1";
import SignUpForm from "@/components/signup-form";
import MainBackground from '../../../../public/assets/background-img-3.jpg';
import Image from "next/image";

export default async function SignUpPage() {
    return (
        <>  
            <section className="absolute inset-0 z-[-1] overflow-hidden">
                <Image src={MainBackground} fill className="object-cover blur-2xl" alt="Main page background" quality={50} sizes="(max-width: 1280px) 100vw, 1280px"/>
            </section>
            <H1 className="text-center mb-12">Sign Up</H1>           
            
            <SignUpForm />

            <p className="mt-6 text-sm">
                Already have an account?{" "} 
                <Link href="/login" className="text-accent underline">Log in</Link>
            </p>
        </>
    );
}

export const metadata: Metadata = {
    title: "Sign up page",
    description: "Page where the users can sign up to create an account",
};	