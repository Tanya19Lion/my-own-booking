import { Toaster } from "@/components/ui/sonner";

type AuthLayoutProps = {
    children: React.ReactNode;  
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <main className="main-container relative">
                {children}
            </main>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'bg-slate-950 text-white border-1 border-white',
                    duration: 5000,
                    style: {
                        backgroundColor: '#020618',
                        border: '1px solid #ff7205',
                        color: '#ff7205',
                    },
                }}
            />
        </>
    );
}