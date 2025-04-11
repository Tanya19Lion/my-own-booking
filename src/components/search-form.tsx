'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchHosting } from '@/actions/actions';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DayPicker } from "react-day-picker";

export default function SearchForm() {
	const [guests, setGuests] = useState(1);
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	return (
		<form action={searchHosting} className="w-full flex justify-center gap-4">
			<SearchInput />

			<SearchDates startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>

			<SearchGuests guests={guests} setGuests={setGuests}/>

			<SearchButton />			
		</form>
	);
}

type SearchDatesProps = {
	startDate: Date | undefined;
	setStartDate: (date: Date | undefined) => void;
	endDate: Date | undefined;
	setEndDate: (date: Date | undefined) => void;
};
type SearchGuestsProps = {
	guests: number;
	setGuests: (guests: number) => void;
};

const SearchInput = () => {
	return (
		<div>
			<Input name="city" id="city" placeholder="Enter city name..." required />
		</div>
	);
};
const SearchDates = ({ startDate, setStartDate, endDate, setEndDate }: SearchDatesProps) => {
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

			<input type="hidden" name="startDate" value={startDate?.toISOString() || ''} />
			<input type="hidden" name="endDate" value={endDate?.toISOString() || ''} />
		</div>
	);
};
const SearchGuests = ({ guests, setGuests }: SearchGuestsProps) => {
	return (
		<div className="h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs  outline-none flex items-center justify-between ">
			<div className="flex items-center space-x-4">
				<Button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className='bg-transparent hover:bg-transparent'>-</Button>
				<span>{guests}</span>
				<Button type="button" onClick={() => setGuests(guests + 1)} className='bg-transparent hover:bg-transparent'>+</Button>
			</div>
			<input type="hidden" name="guests" value={guests} />
		</div>
	);
};
const SearchButton = () => {
	return (
		<div><Button type="submit" className='border-1 border-color-foreground'>Search</Button></div>
	);
};