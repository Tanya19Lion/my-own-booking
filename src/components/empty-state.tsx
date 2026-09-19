import Link from "next/link";
import H2 from "./h2";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
	title: string;
	description: string;
	href: string;
	action: string;
};

// Says what happened and offers the way out, instead of ending on an apology.
export default function EmptyState({ title, description, href, action }: EmptyStateProps) {
	return (
		<div className="w-full flex flex-col items-center gap-3 py-16 text-center">
			<H2 className="mb-0 text-2xl lg:text-3xl">{title}</H2>
			<p className="max-w-md text-muted-foreground">{description}</p>
			<Button asChild className="mt-3 common-btn hover:bg-brand hover:text-slate-950 focus:bg-brand active:bg-brand">
				<Link href={href}>{action}</Link>
			</Button>
		</div>
	);
}
