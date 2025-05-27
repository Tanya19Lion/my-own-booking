import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DayPicker } from "react-day-picker";
import { Button } from "./ui/button";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

type StartDatePopoverProps = {
    startDate: Date | undefined;
    setStartDate: (date: Date | undefined) => void;
    className?: string;
};

function StartDatePopover({ startDate, setStartDate, className }: StartDatePopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className={cn("w-full justify-center text-left border-1 border-color-foreground hover:!bg-transparent", !startDate && "text-muted-foreground", className)}>
                    {startDate ? format(startDate, 'PPP') : 'Start Date'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto z-[999] bg-white">
                <DayPicker
                    animate
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    showOutsideDays
                    disabled={(date) => date < new Date()}
                />				
            </PopoverContent>
        </Popover>
    );
}

export default StartDatePopover;