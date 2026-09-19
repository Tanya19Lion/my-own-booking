"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/owner-actions";

export const SignOutBtn = () => {
    const [isPending, startTransition] = useTransition();

    return (
        <Button 
            className="common-btn hover:bg-brand hover:text-slate-950 focus:bg-brand active:bg-brand"
            disabled={isPending}
            onClick={async () => {
                startTransition(async () => await logOut())}
            }
        >
            {isPending ? 'Signing out...' : 'Sign out'}
        </Button>
    );
}

