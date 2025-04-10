"use client";

import { memo, useState } from "react";

import { Search } from "lucide-react";
import { Button, Input, DateRangePicker, Stepper } from "@/components/ui";
import { DateRange } from "react-day-picker";
// import { useRouter } from "next/navigation";
import { HostingsConfigFilters } from "@/lib/types";

type SearchFormProps = {
	onChange?: (filters: HostingsConfigFilters) => void;
};

function SearchForm({ onChange }: SearchFormProps) {
	const [dates, setDates] = useState<DateRange | undefined>(undefined);
	const [guests, setGuests] = useState<number | undefined>(1);
	const [search, setSearch] = useState<string | undefined>("");

	const handleSubmit = () => {
		onChange({ 
			dates: dates ? { from: dates.from, to: dates.to ?? undefined } : undefined, 
			guests, 
			search 
		});
	};

	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<Input 
				className="w-[400px] rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10" 
				placeholder="Search destinations..." 
				spellCheck={false}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<DateRangePicker 
				value={dates} 
				onChange={setDates} 
				placeholder="Select dates"
			/>
			<Stepper label="guest" value={guests} onChange={setGuests} className="text-black"/>
			<Button onClick={handleSubmit}>
				<Search className="h-4 w-4"/>
			</Button>
		</div>
	)
}

export default memo(SearchForm);