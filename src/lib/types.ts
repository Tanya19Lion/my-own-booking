import { Hosting, Owner, Availability } from '@prisma/client';

export type OwnerEssential = Omit<Owner, 'id' | 'password' | 'createdAt' | 'updatedAt'>;
export type HostingEssential = Omit<Hosting, 'id' | 'createdAt' | 'updatedAt'>;
export type AvailabilityEssential = Omit<Availability, 'id' | 'createdAt' | 'updatedAt'>;
export type HostingWithOwner = Hosting & { 
    owner: OwnerEssential 
};


export type HostingsConfigFilters = {
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

