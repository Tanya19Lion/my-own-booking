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
			toast.error(error.message) || "Something went wrong.";
			return;
		}		
	};	

	return (
		<form 
			onSubmit={handleSubmit(onSubmit)} 
			className="w-full md:w-[50%] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center lg:gap-4"
		>
			<div className="w-full min-w-[220px] md:w-auto">
				<SearchInput register={register} errors={errors}/>
			</div>

			<div className="w-full md:w-auto">
				<SearchDates 
					startDate={startDate} 
					setStartDate={setStartDate} 
					endDate={endDate} 
					setEndDate={setEndDate} 
					register={register}
					errors={errors}
				/>
			</div>
			<div className="w-full md:w-auto">
				<SearchGuests guests={guests} setGuests={setGuests} register={register} errors={errors} />
			</div>

			<div className="w-full md:w-auto">
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
			<Label htmlFor="city" className="sr-only"></Label>
			<Input 
				{...register('city')} 
				id="city" 
				placeholder="Enter city name..." 				
				pattern='^[A-Za-z\s]+$' 
				title="City name should contain only letters and spaces."
				required 
			/>
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
export const SearchDates = ({ startDate, setStartDate, endDate, setEndDate, register, errors }: SearchDatesProps) => {
	return (
		<>
			<div className="flex flex-col sm:flex-row gap-4">		
				<div className="w-full sm:w-[50%] lg:min-w-[220px]">
					<StartDatePopover 
						startDate={startDate} 
						setStartDate={setStartDate} />
				</div>
				<div className="w-full sm:w-[50%] lg:min-w-[220px]">
					<EndDatePopover 
						endDate={endDate} 
						startDate={startDate}
						setEndDate={setEndDate} />
				</div>
			</div>
			{errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
			{errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}

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
		<div className="h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs outline-none flex items-center justify-between">
			<div className="w-full flex items-center justify-center gap-2">
				<Button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className='bg-transparent hover:bg-transparent'>-</Button>
				<span className='px-2'>{guests}</span>
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
		<div className='w-full md:w-auto text-center'>
			<Button 
				type="submit" 
				className="common-btn hover:bg-accent focus:bg-accent active:bg-accent w-full"
				disabled={isSubmitting}
			>{isSubmitting ? 'Searching...' : 'Search'}</Button>			
		</div>
	);
};