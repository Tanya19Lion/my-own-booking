import { Metadata } from "next";
import Link from "next/link";
import H1 from "@/components/h1";
import LoginForm from "@/components/login-form";
import MainBackground from '../../../../public/assets/background-img-10.jpg';
import HeroBackground from "@/components/hero-background";

export default async function LogInPage() {
    return (
        <>
            <HeroBackground src={MainBackground}/>
            <H1 className="text-center mb-12">Log in</H1>          
            
            {/* Solid-enough panel so the photo does not show through the transparent inputs. */}
            <div className="w-full rounded-2xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-md sm:w-auto sm:p-8">
                <LoginForm />

                <p className="mt-6 text-center text-sm">
                    No account yet?{" "}
                    <Link href="/signup" className="text-brand underline font-medium">Sign Up</Link>
                </p>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: "Log in page",
    description: "Page where the users can log in to their account",
};	