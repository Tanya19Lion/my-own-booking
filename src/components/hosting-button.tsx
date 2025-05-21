"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HostingForm from "./hosting-form";
import { HostingWithOwner } from "@/lib/types";

type HostingButtonProps = {
    actionType: "add" | "edit" | "delete";
    hosting?: HostingWithOwner;
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
};

function HostingButton({ children, actionType, disabled, onClick, hosting, className }: HostingButtonProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { pending } = useFormStatus();

    if (actionType === "delete") {
        return (
            <Button variant="secondary" disabled={disabled} onClick={onClick} className="border-slate-950">
                {children}
            </Button>           
        );
    }

    return (
         <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                {actionType === "add" ? (
                    <Button className="common-btn hover:bg-accent focus:bg-accent active:bg-accent" disabled={pending}>
                        Add new hosting
                    </Button>
                    ) : (
                    <Button variant="secondary" className="border-slate-950" disabled={pending}>{children}</Button>
                )}               
            </DialogTrigger>

            <DialogContent className="text-black">
                <DialogHeader>                            
                    <DialogTitle>{actionType === 'add' ? 'Add a new hosting' : 'Edit hosting'}</DialogTitle>
                </DialogHeader>
                
                <HostingForm 
                    actionType={actionType} 
                    onFormSubmission={() => {setIsFormOpen(false)}} 
                    hosting={hosting}
                />
            </DialogContent>
        </Dialog>
    );
}

export default HostingButton;