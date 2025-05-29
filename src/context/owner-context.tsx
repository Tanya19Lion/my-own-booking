"use client";

import { createContext, useContext } from "react";
import { Owner } from "../../prisma/app/generated/prisma-client";
import { HostingWithOwner } from "@/lib/types";

type OwnerContextType = {
    owner: Owner;
    hostings: HostingWithOwner[];
};

type OwnerDataProviderProps = {
    children: React.ReactNode;
    owner: Owner;
    hostings: HostingWithOwner[];
};

const OwnerContext = createContext<OwnerContextType | null>(null);

export function OwnerDataProvider({ children, owner, hostings }: OwnerDataProviderProps) {
    if (!owner || !hostings) {
        throw new Error("Owner and hostings data are required");
    }
    return (
        <OwnerContext.Provider value={{ owner, hostings }}>
            {children}
        </OwnerContext.Provider>
    );
}

export function useOwnerData() {
    const context = useContext(OwnerContext);
    if (!context) {
        throw new Error("useOwnerData must be used within an OwnerDataProvider");
    }
    return context;
}