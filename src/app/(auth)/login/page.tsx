import { Metadata } from "next";
import Link from "next/link";
import H1 from "@/components/h1";
import LoginForm from "@/components/login-form";
import MainBackground from '../../../../public/assets/background-img-10.jpg';
import Image from "next/image";

export default async function LogInPage() {
    return (
        <>
            <section className="absolute inset-0 z-[-1] overflow-hidden">
                <Image src={MainBackground} fill className="object-cover blur-2xl" alt="Main page background" quality={50} sizes="(max-width: 1280px) 100vw, 1280px"/>
            </section>
            <H1 className="text-center mb-12">Log in</H1>          
            
            <LoginForm />

            <p className="mt-6 text-sm">
                No account yet?{" "}
                <Link href="/signup" className="text-accent underline font-medium">Sign Up</Link>
            </p>
        </>
    );
}

export const metadata: Metadata = {
    title: "Log in page",
    description: "Page where the users can log in to their account",
};	