'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { searchHosting } from '@/actions/hosting-actions';
import { cn } from '@/lib/utils';
import { DayPicker } from "react-day-picker";
import { toast } from "sonner";
import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema, SearchFormSchema } from "@/lib/validations";

export default function SearchForm() {
	const [guests, setGuests] = useState(1);
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const { register, formState: {isSubmitting, errors}, trigger, getValues } = useForm<SearchFormSchema>({
		resolver: zodResolver(searchFormSchema),
	});

	return (
		<form action={async () => {
			const result = await trigger();
			if (!result) {
				toast.error("Please fill in all required fields.");
				return;
			}

			const formData = getValues();
			formData.startDate = startDate?.toISOString() || '';
			formData.endDate = endDate?.toISOString() || '';
			formData.guests = Number(guests);
			
			await searchHosting(formData);
		}}  
		 className="w-full flex justify-center gap-4">
			<SearchInput register={register} errors={errors}/>

			<SearchDates 
				startDate={startDate} 
				setStartDate={setStartDate} 
				endDate={endDate} 
				setEndDate={setEndDate} 
				register={register}
				errors={errors}
			/>

			<SearchGuests guests={guests} setGuests={setGuests} register={register} errors={errors} />

			<SearchButton isSubmitting={isSubmitting} />			
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
			<Label htmlFor="city" className="sr-only"></Label>
			<Input {...register('city')} id="city" placeholder="Enter city name..." required />
			{errors.city && <p className="text-red-500">{errors.city.message}</p>}
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
const SearchDates = ({ startDate, setStartDate, endDate, setEndDate, register, errors }: SearchDatesProps) => {
	return (
		<div className="flex">
			<div className="flex space-x-4">			
				<div className="w-45">
					<Popover>
						<PopoverTrigger asChild>
							<Button className={cn("w-full justify-center text-left border-1 border-color-foreground bg-transparent", !startDate && "text-muted-foreground")}>
								{startDate ? format(startDate, 'PPP') : 'Start Date'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
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
				</div>
				<div className="w-45">
					<Popover>
						<PopoverTrigger asChild>
							<Button className={cn("w-full justify-center text-left border-1 border-color-foreground bg-transparent", !endDate && "text-muted-foreground")}>
								{endDate ? format(endDate, 'PPP') : 'End Date'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<DayPicker
								animate
								mode="single"
								selected={endDate}
								onSelect={setEndDate}
								showOutsideDays
								disabled={(date) => date < (startDate ?? new Date()) || date < new Date()}
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			{errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
			{errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}

			<input type="hidden" id="startDate" {...register("startDate")} value={startDate?.toISOString() || ''} />
			<input type="hidden" id="endDate" {...register("endDate")} value={endDate?.toISOString() || ''} />
		</div>
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
		<div className="h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs outline-none flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<Button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className='bg-transparent hover:bg-transparent'>-</Button>
				<span>{guests}</span>
				<Button type="button" onClick={() => setGuests(guests + 1)} className='bg-transparent hover:bg-transparent'>+</Button>
			</div>
			<input type="hidden" id="guests" {...register("guests")} value={guests} />
			{errors.guests && <p className="text-red-500">{errors.guests.message}</p>}
		</div>
	);
};

type SearchButtonProps = {
	isSubmitting: boolean;
};
const SearchButton = ({ isSubmitting }: SearchButtonProps) => {
	return (
		<div>
			<Button 
				type="submit" 
				className="common-btn hover:bg-accent focus:bg-accent active:bg-accent"
				disabled={isSubmitting}
			>Search</Button>			
		</div>
	);
};