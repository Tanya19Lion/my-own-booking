import { cn } from "@/lib/utils";

type H2Props = {
	children: React.ReactNode;
	className?: string;
};

export default function H2({ children, className }: H2Props) {
	return (
		<h2 className={cn("text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-center text-white/[0.87] dark:text-white/[0.87]", className)}>
			{children}
		</h2>
	)
}