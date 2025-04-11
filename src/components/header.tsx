"use client";

import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

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
		path: '/hostings/favorites'
	}
];

export default function Header() {
	const activePathname = usePathname();

	return (
		<header className="flex justify-between items-center border-b border-white/10 px-3 py-3 sm:px-9 sm:py-3">
			<Logo />
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
		</header>
	)
}
