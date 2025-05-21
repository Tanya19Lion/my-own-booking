"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/owner-actions";

export const SignOutBtn = () => {
    const [isPending, startTransition] = useTransition();

    return (
        <Button 
            className="common-btn hover:bg-accent focus:bg-accent active:bg-accent" 
            disabled={isPending}
            onClick={async () => {
                startTransition(async () => await logOut())}
            }
        >
            Sign out
        </Button>
    );
}

