import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Owner account page",
    description: "Page where the owner can manage their account",
};	

type AccountLayoutProps = {
    children: React.ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
    return <>{children}</>;
}