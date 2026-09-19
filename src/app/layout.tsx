import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import Container from "./container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	subsets: ["latin"],
});

// Display face for headings. SOFT rounds the serifs; opsz tunes the letterforms to the size.
const fraunces = Fraunces({
	subsets: ["latin"],
	axes: ["SOFT", "opsz"],
	variable: "--font-fraunces",
});

export const metadata: Metadata = {
	title: "CozyPlaces - Find a cozy place to stay",
	description: "All the nicest places to stay, in one place",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
	// Dark-only: the `.dark` tokens in globals.css are the palette. Colours come from there
	// (body gets bg-background / text-foreground in @layer base), not from this file.
	return (
		<html lang="en" className={`dark ${fraunces.variable}`}>
			<body className={`${inter.className} overflow-y-scroll`}>
				{/* Full-width query container: 100cqw inside it is the page width without the scrollbar.
				    Not on <body> itself — containment there stops body's overflow reaching the viewport. */}
				<div className="@container">
					<Container>
						<Header />

						{children}
						
						<Footer />
					</Container>
				</div>
				{/* richColors: sonner's own dark palette per type — errors red, warnings amber. */}
				<Toaster
					position="top-right"
					theme="dark"
					richColors
					toastOptions={{
						duration: 5000,
					}}
				/>
			</body>
		</html>
	);
}
