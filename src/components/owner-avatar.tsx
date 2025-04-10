import { OwnerEssential } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type OwnerAvatarProps = {
	className?: string;
	imageOnly?: boolean;
	owner: OwnerEssential;
};

export default function OwnerAvatar({ className, imageOnly, owner }: OwnerAvatarProps) {
	const displayName = `${owner.firstName} ${owner.lastName}`;
    const ownerInitials = `${owner.firstName.charAt(0)}${owner.lastName.charAt(0)}`.toUpperCase();

	return (
		<div className="flex flex-row items-center gap-2">
			<span>Owned by </span>
			<Avatar className={className}>
				<AvatarImage src={owner.avatarUrl} alt={displayName} className="rounded-full"/>
				<AvatarFallback className="h-10 w-10 bg-secondary">
					{ownerInitials}
				</AvatarFallback>
			</Avatar>
			{
				!imageOnly && (
					<div>
						<span>{displayName}</span>
					</div>
				)
			}
		</div>
	);
}
