import { OwnerDataProvider } from "@/context/owner-context";
import { getOwner, getHostingsByOwner } from "@/lib/server-utils";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = 'force-dynamic'; 

type OwnerLayoutProps = {
    children: React.ReactNode;
};

export default async function OwnerLayout({ children }: OwnerLayoutProps) {
    const owner = await getOwner();
    const hostings = await getHostingsByOwner(owner.id);

    return (
        <>
            <OwnerDataProvider owner={owner} hostings={hostings}>
                {children}
            </OwnerDataProvider>

            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'bg-slate-950 text-white border-1 border-white',
                    duration: 5000,
                    style: {
                        backgroundColor: '#020618',
                        border: '1px solid #fff',
                        color: '#fff',
                    },
                }}
            />
        </>
    );
}