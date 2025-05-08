import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Container from "./container";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CozyPlaces - Find a nice place to stay",
	description: "All nice hostings in one place",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-slate-950 text-white overflow-y-scroll`}>
				<Container>
					<Header />

					{children}
					
					<Footer />
				</Container>
			</body>
		</html>
	);
}
