import Link from "next/link";

const routes = [
	{
		name: 'Terms & Conditions',
		path: '/terms-conditions'
	},
	{ 	name: 'Privacy Policy', 
		path: '/privacy-policy' 
	},
];

export default function Footer() {
	return (
		<footer className="flex gap-6 flex-col-reverse sm:flex-row sm:items-center sm:justify-between border-t border-white/10 py-4 px-3 sm:px-9 text-xs text-white/25">
			<small className="text-xs text-center sm:text-left">&copy; 2025 Tanya. All rights reserved.</small>
			<ul className="flex justify-center gap-x-6 sm:gap-x-8">
				{
					routes.map(route => {
						return <li key={route.path} className="hover:text-white/50 transition">
									<Link href={route.path}>{route.name}</Link>
								</li>
					})
				}
			</ul>
		</footer>
	)
}
