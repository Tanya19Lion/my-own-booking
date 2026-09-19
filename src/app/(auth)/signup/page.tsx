import { Metadata } from "next";
import Link from "next/link";
import H1 from "@/components/h1";
import SignUpForm from "@/components/signup-form";
import MainBackground from '../../../../public/assets/background-img-3.jpg';
import HeroBackground from "@/components/hero-background";

export default async function SignUpPage() {
    return (
        <>  
            <HeroBackground src={MainBackground}/>
            <H1 className="text-center mb-12">Sign Up</H1>           
            
            {/* Solid-enough panel so the photo does not show through the transparent inputs. */}
            <div className="w-full rounded-2xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-md sm:w-auto sm:p-8">
                <SignUpForm />

                <p className="mt-6 text-center text-sm">
                    Already have an account?{" "} 
                    <Link href="/login" className="text-brand underline">Log in</Link>
                </p>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: "Sign up page",
    description: "Page where the users can sign up to create an account",
};	