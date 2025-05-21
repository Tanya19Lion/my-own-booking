import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Owner dashboard page",
    description: "Page where the owner can check their hostings",
};

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return <>{children}</>;
}