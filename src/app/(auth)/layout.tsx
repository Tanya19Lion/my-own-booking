import H1 from "@/components/h1";

type AuthLayoutProps = {
    children: React.ReactNode;  
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="flex flex-col items-center justify-center mt-auto w-full gap-y-12" >
            {children}
        </main>
    );
}