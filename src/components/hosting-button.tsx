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
            <Button variant="secondary" disabled={disabled} onClick={onClick} className={className}>
                {children}
            </Button>           
        );
    }

    return (
         <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                {actionType === "add" ? (
                    <Button className="common-btn hover:bg-brand hover:text-slate-950 focus:bg-brand active:bg-brand" disabled={pending}>
                        Add new place
                    </Button>
                    ) : (
                    <Button variant="secondary" disabled={pending} className={className}>{children}</Button>
                )}               
            </DialogTrigger>

            <DialogContent className="max-h-screen sm:max-h-[80vh] overflow-y-auto">
                <DialogHeader>                            
                    <DialogTitle>{actionType === 'add' ? 'Add a new place' : 'Edit place'}</DialogTitle>
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