'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StartDatePopover from './start-date-popover';
import EndDatePopover from './end-date-popover';
import { searchHosting } from '@/actions/hosting-actions';
import { toast } from "sonner";
import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema, SearchFormSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

// From lg up the form is one pill: each control sits in a borderless segment with a visible
// caption, and focus is shown on the whole segment instead of on the control's own ring.
const segment = "lg:relative lg:flex-1 lg:rounded-full lg:px-5 lg:py-1.5 lg:transition-colors lg:hover:bg-white/[4%] lg:has-[:focus-visible]:bg-white/10";
// A border on a rounded-full segment would curve, so the divider is a short straight pseudo-line.
const divider = "lg:before:absolute lg:before:inset-y-3 lg:before:left-0 lg:before:w-px lg:before:bg-white/10";
const caption = "hidden lg:block text-xs leading-4 font-medium text-white/65";
// lg:dark:bg-transparent, not lg:bg-transparent: Input's own `dark:bg-input/30` is `.x:is(.dark *)`,
// two classes of specificity, so the reset needs the dark variant too.
const bare = "lg:h-auto lg:border-0 lg:p-0 lg:shadow-none lg:focus-visible:ring-0 lg:dark:bg-transparent";

export default function SearchForm() {
	const [guests, setGuests] = useState(1);
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm<SearchFormSchema>({
		resolver: zodResolver(searchFormSchema),
	});

	const onSubmit = async (data: SearchFormSchema) => {
		const formData = new FormData();

		formData.append("city", data.city);
		if (startDate) {
			formData.append("startDate", startDate.toISOString());
		}
		if (endDate) {
			formData.append("endDate", endDate.toISOString());
		}
		formData.append("guests", data.guests.toString());

		const error = await searchHosting(formData);
		if (error) {
			toast.error(error.message);
			return;
		}	
	};	

	return (
		<form 
			onSubmit={handleSubmit(onSubmit)} 
			className="w-full md:w-[50%] flex flex-col gap-4 lg:w-full lg:max-w-4xl lg:flex-row lg:items-stretch lg:gap-0 lg:rounded-full lg:border lg:border-white/15 lg:bg-slate-950/60 lg:p-2 lg:backdrop-blur"
		>
			<div className={cn("w-full min-w-[220px] md:w-auto", segment)}>
				<SearchInput register={register} errors={errors}/>
			</div>

			<div className="w-full md:w-auto lg:flex-[2]">
				<SearchDates 
					startDate={startDate} 
					setStartDate={setStartDate} 
					endDate={endDate} 
					setEndDate={setEndDate} 
					register={register}
					errors={errors}
				/>
			</div>
			<div className={cn("w-full md:w-auto", segment, divider, "lg:flex-none")}>
				<SearchGuests guests={guests} setGuests={setGuests} register={register} errors={errors} />
			</div>

			<div className="w-full md:w-auto lg:ml-2 lg:self-center">
				<SearchButton isSubmitting={isSubmitting} />	
			</div>		
		</form>
	);
}

type SearchInputProps = {
	register: UseFormRegister<SearchFormSchema>;
  	errors: FieldErrors<SearchFormSchema>;
};
const SearchInput = ({ register, errors }: SearchInputProps) => {
	return (
		<div>
			<Label htmlFor="city" className={cn("sr-only lg:not-sr-only", caption)}>Where</Label>
			<Input 
				{...register('city')} 
				id="city" 
				placeholder="Enter city name..." 
				className={bare}
				pattern='^[A-Za-z\s]+$' 
				title="City name should contain only letters and spaces."
				required 
			/>
			{errors.city && <p className="text-destructive">{errors.city.message}</p>}
		</div>
	);
};

type SearchDatesProps = {
	startDate: Date | undefined;
	setStartDate: (date: Date | undefined) => void;
	endDate: Date | undefined;
	setEndDate: (date: Date | undefined) => void;
	register: UseFormRegister<SearchFormSchema>;
    errors: FieldErrors<SearchFormSchema>;
};
export const SearchDates = ({ startDate, setStartDate, endDate, setEndDate, register, errors }: SearchDatesProps) => {
	return (
		<>
			<div className="flex flex-col sm:flex-row gap-4 lg:gap-0">		
				<div className={cn("w-full sm:w-[50%] lg:min-w-[160px]", segment, divider)}>
					<span className={caption}>Check in</span>
					<StartDatePopover 
						startDate={startDate} 
						setStartDate={setStartDate}
						className={cn(bare, "lg:justify-start lg:font-normal")} />
				</div>
				<div className={cn("w-full sm:w-[50%] lg:min-w-[160px]", segment, divider)}>
					<span className={caption}>Check out</span>
					<EndDatePopover 
						endDate={endDate} 
						startDate={startDate}
						setEndDate={setEndDate}
						className={cn(bare, "lg:justify-start lg:font-normal")} />
				</div>
			</div>
			{errors.startDate && <p className="text-destructive">{errors.startDate.message}</p>}
			{errors.endDate && <p className="text-destructive">{errors.endDate.message}</p>}

			<input type="hidden" id="startDate" {...register("startDate")} value={startDate?.toISOString() || ''} />
			<input type="hidden" id="endDate" {...register("endDate")} value={endDate?.toISOString() || ''} />
		
		</>
	);
};

type SearchGuestsProps = {
	guests: number;
	setGuests: (guests: number) => void;
	register: UseFormRegister<SearchFormSchema>;
  	errors: FieldErrors<SearchFormSchema>;
};
const SearchGuests = ({ guests, setGuests, register, errors }: SearchGuestsProps) => {
	return (
		<div>
			<span className={caption}>Guests</span>
			<div className={cn("h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs outline-none flex items-center justify-between", bare)}>
				<div className="w-full flex items-center justify-center gap-2 lg:justify-start">
					<Button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className='bg-transparent hover:bg-transparent lg:h-5 lg:px-1'>-</Button>
					<span className='px-2 tabular-nums lg:px-1'>{guests}</span>
					<Button type="button" onClick={() => setGuests(guests + 1)} className='bg-transparent hover:bg-transparent lg:h-5 lg:px-1'>+</Button>
				</div>
				<input type="hidden" id="guests" {...register("guests")} value={guests} />
				{errors.guests && <p className="text-destructive">{errors.guests.message}</p>}
			</div>
		</div>
	);
};

type SearchButtonProps = {
	isSubmitting: boolean;
};
const SearchButton = ({ isSubmitting }: SearchButtonProps) => {
	return (
		<div className='w-full md:w-auto text-center'>
			<Button 
				type="submit" 
				className="common-btn hover:bg-brand hover:text-slate-950 focus:bg-brand active:bg-brand w-full lg:h-11 lg:rounded-full lg:px-6"
				disabled={isSubmitting}
			>{isSubmitting ? 'Searching...' : 'Search'}</Button>			
		</div>
	);
};
