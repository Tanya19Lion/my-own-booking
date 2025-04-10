import * as React from 'react';

import { Button } from '@/components/ui';
import { cn } from "@/lib/utils";

interface StepperProps {
  className?: string;
  label: string;
  onChange: (newValue: number) => void;
  value: number;
  [key: string]: any; // To allow additional props, like `ref`
}

const Stepper = React.forwardRef<HTMLSpanElement, StepperProps>(
  ({ className, label, onChange, value, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 min-w-[190px] items-center justify-between gap-2 rounded-md border border-input bg-background py-2 text-sm',
          className,
        )}
      >
        <Button
          disabled={value === 0}
          variant='link'
          className='cursor-pointer'
          onClick={() => onChange(value - 1)}          
        >
          -
        </Button>
        <span
          className={cn(!value && 'truncate text-muted-foreground')}
          ref={ref}
          {...props}
        >
          {value} {label}
          {value > 1 || value === 0 ? 's' : ''}
        </span>
        <Button
          disabled={value === 100}
          variant='link'
          className='cursor-pointer'
          onClick={() => onChange(value + 1)}
        >
          +
        </Button>
      </div>
    );
  },
);
Stepper.displayName = 'Stepper';

export { Stepper };
