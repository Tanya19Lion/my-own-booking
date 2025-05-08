import { Metadata } from "next";
import Link from "next/link";
import H1 from "@/components/h1";
import LoginForm from "@/components/login-form";

export default async function LogInPage() {
    return (
        <div> 
            <H1 className="text-center mb-12">Log in</H1>          
            
            <LoginForm />

            <p className="mt-6 text-sm">
                No account yet?{" "}
                <Link href="/signup" className="text-accent underline font-medium">Sign Up</Link>
            </p>
        </div>
    );
}

export const metadata: Metadata = {
    title: "Log in page",
    description: "Page where the users can log in to their account",
};	