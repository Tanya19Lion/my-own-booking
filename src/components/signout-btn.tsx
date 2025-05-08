"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/actions";

export const SignOutBtn = () => {
    return (
        <Button 
            className="common-btn hover:bg-accent focus:bg-accent active:bg-accent" 
            onClick={async () => await logOut()}
        >
            Sign out
        </Button>
    );
}

