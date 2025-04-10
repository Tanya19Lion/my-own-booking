"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

interface DateRangePickerProps {
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  onChange: (dates: DateRange | undefined) => void;
  placeholder?: string;
  value?: DateRange;
}

function DateRangePicker({
  className,
  minDate,
  maxDate,
  onChange,
  placeholder,
  value,
}: DateRangePickerProps) {
  const handleDatesChange = (dates: DateRange | undefined) => {
    onChange(dates);
  };

  return (
    <div className={cn("grid gap-2 cursor-pointer", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal cursor-pointer",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            <span className='truncate'>
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, 'LLL dd, y')} -{' '}
                    {format(value.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(value.from, 'LLL dd, y')
                )
              ) : (
                placeholder
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={handleDatesChange}
            numberOfMonths={2}
            fromDate={minDate}
            toDate={maxDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
