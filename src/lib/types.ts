import type { Hosting, Owner, Availability } from "../../prisma/app/generated/prisma-client";

export type OwnerEssential = Omit<Owner, 'id' | 'password' |'createdAt' | 'updatedAt'>;
export type HostingEssential = Omit<Hosting, 'id' | 'createdAt' | 'updatedAt'>;
export type AvailabilityEssential = Pick<Availability, 'from' | 'to'>;

export type HostingWithOwner = Hosting & { 
    owner: OwnerEssential,
    availability?: AvailabilityEssential; 
};
export type OwnerWithHostings = Owner & {
    hostings: Hosting[];
};

export type HostingsSearchFilters = {
    dates?: {
        from: Date | undefined;
        to: Date | undefined;
    };
    guests?: number;
    search?: string;
};

export type Review = { 
    id: number;
    userId: number;
    HostingId: number;
    rating: number;
    comment: string; 
    createdAt: Date;
};

