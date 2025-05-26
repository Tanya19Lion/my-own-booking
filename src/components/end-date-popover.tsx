import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DayPicker } from "react-day-picker";
import { Button } from "./ui/button";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

type SearchDatesProps = {
    endDate: Date | undefined;
    startDate: Date | undefined;
    setEndDate: (date: Date | undefined) => void;
    className?: string;
};

function EnfDatePopover({ endDate, setEndDate, startDate, className }: SearchDatesProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className={cn("w-full justify-center text-left border-1 border-color-foreground bg-transparent", !endDate && "text-muted-foreground", className)}>
                    {endDate ? format(endDate, 'PPP') : 'End Date'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto z-[999] bg-white">
                <DayPicker
                    animate
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    showOutsideDays
                    disabled={date => (date < (endDate ?? new Date())) || (date < new Date()) || (!!startDate && date <= startDate)}
                />
            </PopoverContent>
        </Popover>
    );
}

export default EnfDatePopover;