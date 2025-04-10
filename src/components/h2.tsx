type H2Props = {
	children: React.ReactNode;
};

export default function H2({ children }: H2Props) {
	return (
		<h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-center text-white/[0.87] dark:text-white/[0.87]">
			{children}
		</h2>
	)
}