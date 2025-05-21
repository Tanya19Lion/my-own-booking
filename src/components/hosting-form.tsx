"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { HostingWithOwner } from "@/lib/types";
import { addNewHosting, editHosting } from "@/actions/hosting-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hostingFormSchema, HostingFormSchema } from "@/lib/validations";

type HostingFormProps = {
	actionType: "add" | "edit";	
	onFormSubmission: () => void;
	hosting?: HostingWithOwner; 
};

export default function HostingForm({ actionType, onFormSubmission, hosting }: HostingFormProps) {
	const { register, formState: {isSubmitting, errors}, trigger } = useForm<HostingFormSchema>({
		resolver: zodResolver(hostingFormSchema),
		defaultValues: actionType === "edit" ? {
			name: hosting?.name || "",
			description: hosting?.description || "",
			location: hosting?.location || "",
			availableFrom: hosting?.availability?.from ? new Date(hosting.availability?.from) : new Date(),
			availableTo: hosting?.availability?.to ? new Date(hosting.availability?.to) : new Date(),
			images: hosting?.images || [],
			price: hosting?.price || 0,
			maxGuests: hosting?.maxGuests || 1,
		} : undefined,
	});

	return (
		<form action={async (formData: FormData) => {
			const result = await trigger();
			if (!result) {
				toast.error("Please fill in all required fields.");
				return;
			}
			
			if (actionType === "add") {
				const error = await addNewHosting(formData);	
				if (error) {
					toast.warning(error.message);
					return;
				}

				onFormSubmission();
			} else if (actionType === "edit") {
				const error =  await editHosting(hosting?.id!, formData);

				if (error) {
					toast.warning(error.message);
					return;
				}

				onFormSubmission();
			}
		}} className="min-w-[320px] max-w-[100%] space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...register('name')} className="border border-gray-300 rounded-md p-2" />
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
			</div>			
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea id="description" {...register('description')} className="border border-gray-300 rounded-md p-2" />
				{errors.description && <p className="text-red-500">{errors.description.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="location">Location</Label>
				<Input id="location" {...register('location')} className="border border-gray-300 rounded-md p-2" />
				{errors.location && <p className="text-red-500">{errors.location.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="images">Your hosting photos</Label>
				<Input type="file" id="images" {...register('images')} name="photos" accept="image/*" multiple className="border border-gray-300 rounded-md p-2"/>
				{errors.images && <p className="text-red-500">{errors.images.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="availableFrom">Available from</Label>
				<Input type="date" id="availableFrom" {...register('availableFrom')} />
				{errors.availableFrom && <p className="text-red-500">{errors.availableFrom.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="availableTo">Available to</Label>
				<Input type="date" id="availableTo" {...register('availableTo')} />
				{errors.availableTo && <p className="text-red-500">{errors.availableTo.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="price">Price</Label>
				<Input id="price" {...register('price')} className="border border-gray-300 rounded-md p-2" />
				{errors.price && <p className="text-red-500">{errors.price.message}</p>}
			</div>
			<div className="space-y-2">				
				<Label htmlFor="maxGuests">Maximun number of guests</Label>	
				<Input id="maxGuests" {...register('maxGuests')} className="border border-gray-300 rounded-md p-2" />
				{errors.maxGuests && <p className="text-red-500">{errors.maxGuests.message}</p>}
			</div>
			<Button className="w-full common-btn hover:bg-accent focus:bg-accent active:bg-accent" type="submit" disabled={isSubmitting}>
				{actionType === "add" ? "Add new hosting" : "Update hosting"}
			</Button>
		</form>
	)
}
