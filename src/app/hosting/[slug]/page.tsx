import type { Metadata } from "next";
import HostingDetailsCardImages from "@/components/hosting-details-card-images";
import { getHosting } from "@/lib/server-utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import OwnerAvatar from "@/components/owner-avatar";
import FavouriteHostingsButton from "@/components/favourite-hostings-button";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

// unstable_cache round-trips through JSON, so availability dates arrive as strings.
const formatDate = (date: Date | string) =>
	new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function HostingPage(props: PageProps) {
    const params = await props.params;
    const hosting = await getHosting(params.slug);

    if (!hosting) {
		throw new Error("Hosting not found!");
	}

    const { id, name, price, location, maxGuests, description, owner, availability } = hosting;
	const mailto = `mailto:${owner.email}?subject=${encodeURIComponent(`Stay at ${name}`)}`;

    return (
        <main className="main-container min-h-screen">
			<article className="w-full max-w-6xl">
				<div className="mb-6 flex items-start justify-between gap-4">
					<div>
						<h1 className="font-display text-3xl font-semibold tracking-tight lg:text-4xl">{name}</h1>
						<p className="mt-2 text-muted-foreground">
							{location} · {maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}
						</p>
					</div>
					<FavouriteHostingsButton id={id} className="heart-color shrink-0"/>
				</div>

				<HostingDetailsCardImages hosting={hosting} />

				<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
					<div>
						<section>
							<h2 className="text-xl font-semibold">About this place</h2>
							<p className="mt-4 whitespace-pre-line leading-relaxed text-white/80">{description}</p>
						</section>

						<Separator className="my-8"/>

						<section>
							<OwnerAvatar owner={owner} className="w-12 h-12"/>
							<p className="mt-4 leading-relaxed text-white/80">{owner.bio}</p>
						</section>
					</div>

					{/* On mobile the price panel comes straight after the gallery, not after the whole bio. */}
					<aside className="order-first self-start rounded-xl border border-white/10 bg-white/[3%] p-6 lg:order-none lg:sticky lg:top-8">
						<p className="text-3xl font-semibold tabular-nums">
							${price.toLocaleString('en-US')}
							<span className="text-base font-normal text-muted-foreground"> / night</span>
						</p>

						{availability?.from && availability?.to && (
							<p className="mt-4 text-sm text-muted-foreground">
								Available {formatDate(availability.from)} – {formatDate(availability.to)}
							</p>
						)}

						<Button asChild className="mt-6 w-full common-btn hover:bg-brand hover:text-slate-950 focus:bg-brand active:bg-brand">
							<a href={mailto}>Contact host</a>
						</Button>
						<p className="mt-3 text-center text-sm text-muted-foreground">
							Opens an email to {owner.firstName}
						</p>
					</aside>
				</div>
			</article>
		</main>
	);
}

export async function generateMetadata(props: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const params = await props.params;
    const hosting = await getHosting(params.slug);

    if (!hosting) {
		throw new Error("Hosting not found");
	}

    return {
		title: hosting.name,
		description: "It is a perfect place for your vacation",
	};
}
