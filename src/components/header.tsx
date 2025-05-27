"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from "lucide-react"; 

const routes = [
	{
		name: 'Home',
		path: '/'
	},
	{
		name: 'All Hostings',
		path: '/hostings/all'
	},
	{
		name: 'Favorites',
		path: '/favourites'
	}
];

const ownerRoutes = [
	{
		name: 'Dashboard',
		path: '/owner/dashboard'
	},
	{
		name: 'Account',
		path: '/owner/account'
	}
];

export default function Header() {
	const activePathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const isAuthPage = activePathname === '/login' || activePathname === '/signup';
	const isOwner = activePathname.includes('owner');

	const navRoutes = isOwner ? ownerRoutes : routes;

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isMobileMenuOpen]);

	return (
		<header className={cn("flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-9 sm:py-3 relative z-50",
			{
				'justify-between': !isAuthPage,
				'justify-center': isAuthPage
			}	
		)}>
			<Logo />

			{!isAuthPage && (
				<div className="hidden sm:block">
					<HeaderNav routes={navRoutes} activePathname={activePathname} />
				</div>
			)}

			{!isAuthPage && (
				<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden z-50 cursor-pointer p-2">
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			)}

			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.8 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-slate-950 z-30 backdrop-blur-sm"
							onClick={() => setIsMobileMenuOpen(false)}
						/>
						<motion.nav
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className="absolute top-full left-0 w-full bg-slate-900 border-t border-b border-white/50 py-6 px-4 sm:hidden z-50"
						>						
							<motion.ul
								initial="hidden"
								animate="visible"
								variants={{
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: { staggerChildren: 0.07, delayChildren: 0.1 }
									}
								}}
								className="flex flex-col gap-4"
							>
								{navRoutes.map(route => (
									<motion.li
										key={route.path}
										variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
										className="relative"
									>
										<Link
											href={route.path}
											onClick={() => setIsMobileMenuOpen(false)}
											className={cn("block text-sm hover:bg-white/10 focus:bg-white/10 transition duration-200 p-2", {
												"text-white": activePathname.toLowerCase() === route.path,
												"text-white/50": activePathname !== route.path
											})}
										>
											{route.name}
										</Link>										
									</motion.li>
								))}
							</motion.ul>
						</motion.nav>					
					</>
				)}
			</AnimatePresence>
		</header>
	);
}

type HeaderNavProps = {
	routes: {
		name: string;
		path: string;
	}[],
	activePathname: string;
};

const HeaderNav = ({ routes, activePathname }: HeaderNavProps) => {
	return (
		<nav className="h-full">
			<ul className="flex gap-x-6 text-sm h-full">
				{
					routes.map(route => {
						return <li 
									key={route.path} 
									className={cn("hover:text-white transition relative flex items-center", {
										'text-white': activePathname.toLowerCase() === route.path,
										'text-white/50': activePathname !== route.path
									})}
								>
									<Link href={route.path}>{route.name}</Link>
									{
										activePathname.toLowerCase() === route.path && (
											<motion.div 
												layoutId="nav-active" 
												className="bg-[#FF7205] h-1 w-full absolute bottom-[-25]"
												initial={false}
												animate={{ width: '100%' }}
												transition={{ duration: 0.2 }}
											></motion.div>
										)	
									}
								</li>
						})
				}
			</ul>
		</nav>
	);
}
