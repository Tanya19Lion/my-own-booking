"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import StartDatePopover from "./start-date-popover";
import EndDatePopover from "./end-date-popover";
import { toast } from "sonner";
import { HostingWithOwner } from "@/lib/types";
import { addNewHosting, editHosting } from "@/actions/hosting-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hostingFormSchema, HostingFormSchema } from "@/lib/validations";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import Image from "next/image";
import { formatDateForInput, isDate } from "@/lib/utils";

type HostingFormProps = {
	actionType: "add" | "edit";	
	onFormSubmission: () => void;
	hosting?: HostingWithOwner; 
};
type PhotoPreview = {
	url: string;
	file?: File; 
	isExisting: boolean;
};

export default function HostingForm({ actionType, onFormSubmission, hosting }: HostingFormProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { register, reset, formState: {isSubmitting, errors}, handleSubmit, setValue } = useForm<HostingFormSchema>({
		resolver: zodResolver(hostingFormSchema),
		defaultValues: {
			name: "",
			description: "",
			location: "",
			price: 0,
			maxGuests: 1,
			availableFrom: "",
			availableTo: "",
		}
	});

	const [availableFrom, setAvailableFrom] = useState<Date | undefined>(new Date());
	const [availableTo, setAvailableTo] = useState<Date | undefined>(undefined);
	const [photoPreviews, setPhotoPreviews] = useState<PhotoPreview[]>([]);
	const [numberOfCharacters, setNumberOfCharacters] = useState(0);

	useEffect(() => {
		if (actionType === "edit" && hosting) {
			reset({
				name: hosting.name,
				description: hosting.description,
				location: hosting.location,
				price: hosting.price,
				maxGuests: hosting.maxGuests,
				availableFrom: formatDateForInput(hosting.availability?.from),
				availableTo: formatDateForInput(hosting.availability?.to),	
			});
		}
	}, [actionType, hosting, reset, setValue]);

	useEffect(() => {
		if (availableFrom) {
			setValue("availableFrom", availableFrom.toISOString());
		}
	}, [availableFrom, setValue]);

	useEffect(() => {
		if (availableTo) {
			setValue("availableTo", availableTo.toISOString());
		}
	}, [availableTo, setValue]);

	useEffect(() => {
		if (actionType === "edit" && hosting) {
			const from = hosting.availability?.from ? new Date(hosting.availability.from) : undefined;
			const to = hosting.availability?.to ? new Date(hosting.availability.to) : undefined;

			setAvailableFrom(from);
			setAvailableTo(to);

			if (Array.isArray(hosting?.images)) {
				const existingPhotos = hosting.images
					.filter((url): url is string => typeof url === "string")
					.map((url) => ({
						url,
						isExisting: true,
					}));

					setPhotoPreviews(existingPhotos);
				}
			}
	}, [actionType, hosting]);

	function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files || []);
		const newEntries: PhotoPreview[] = [];

		for (const file of files) {
			if (!ALLOWED_TYPES.includes(file.type)) {
				toast.error("Only JPG, PNG, or WEBP images are allowed.");
				continue;
			}
			if (file.size > MAX_FILE_SIZE) {
				toast.error("File size must be less than 300KB.");
				continue;
			}

			const previewUrl = URL.createObjectURL(file);
			newEntries.push({ url: previewUrl, file, isExisting: false });
		}

		if (newEntries.length > 0) {
			setPhotoPreviews((prev) => [...prev, ...newEntries]);
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}

	function handleRemovePhoto(index: number) {
		setPhotoPreviews((prev) => {
			const toRemove = prev[index];
			if (!toRemove.isExisting) {
				setTimeout(() => {
					URL.revokeObjectURL(toRemove.url);
				}, 0);
			}
			return prev.filter((_, i) => i !== index);
		});
	}

	useEffect(() => {
		return () => {
			photoPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [photoPreviews]);

	async function onSubmit(data: HostingFormSchema) {
		const formData = new FormData();

		for (const [key, value] of Object.entries(data)) {
			if (isDate(value)) {
				formData.append(key, value.toISOString());
			} else if (value !== undefined && value !== null) {
				formData.append(key, String(value));
			}
		}
		for (const preview of photoPreviews) {
			if (!preview.isExisting && preview.file) {
				formData.append("images", preview.file);
			}
		}

		const existingImageUrls = photoPreviews
			.filter((p) => p.isExisting)
			.map((p) => p.url);

		formData.append("existingImages", JSON.stringify(existingImageUrls));

		let error: { message: string; } | undefined = undefined;

		if (actionType === "edit") {
			if (!hosting || !hosting.id) {
				toast.error("Hosting data is missing or invalid.");
				return;
			}
			error = await editHosting(hosting.id, formData);
		} else {
			error = await addNewHosting(formData);
		}

		if (error) {
			toast.warning(error.message);
			return;
		}

		onFormSubmission();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="min-w-[225px] max-w-[100%] space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...register('name')} className="border border-gray-300 rounded-md p-2" />
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
			</div>			
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea 
					id="description" 
					{...register('description')} 
					className="border border-gray-300 rounded-md p-2" 
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNumberOfCharacters(e.target.value.length)}					
					maxLength={1000}
				/>
				{numberOfCharacters > 0 && <p className="text-sm text-gray-500">Characters: {numberOfCharacters}/1000</p>}
				{errors.description && <p className="text-red-500">{errors.description.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="location">Location</Label>
				<Input id="location" {...register('location')} className="border border-gray-300 rounded-md p-2" />
				{errors.location && <p className="text-red-500">{errors.location.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="images" className="sr-only">Your hosting photos</Label>
				<Input 
					key={actionType + '-' + (hosting?.id ?? 'new')} 
					id="images" 
					type="file" 
					name="images" 
					accept="image/*" 
					onChange={handlePhotoChange} ref={fileInputRef} 
					className="visually-hidden" 
				/>				
				<Button 
					type="button"
					disabled={isSubmitting}
					onClick={() => fileInputRef.current?.click()} 
					className="w-full text-black rounded-md border border-gray-300 bg-transparent cursor-pointer hover:text-accent hover:bg-transparent hover:border-accent transition-200"
				>Upload your hosting photos</Button>							
			</div>		
			{photoPreviews.length > 0 && (
				<div className="space-y-2">
					<p className="text-sm text-gray-500">Preview:</p>
					<div className="flex flex-wrap gap-4">
						{photoPreviews.map((preview, index) => (
							<div key={index} className="relative group">
								<Image src={preview.url} alt={`Image preview ${index}`}	width={100}	height={100} className="rounded-md border border-gray-200" />
								<Button
									type="button"
									onClick={() => handleRemovePhoto(index)}
									variant="outline"
									className="absolute w-[24px] h-[24px] top-[-10px] right-[-10px] p-1 text-s text-red-500 border-gray-300 rounded-full bg-white flex items-center hover:bg-white hover:text-red-500 hover:border-red-500 focus:bg-white focus:text-red-500 focus:border-red-500 active:bg-white active:text-red-500 active:border-red-500 duration-200"
								>
									✕
								</Button>
							</div>
						))}
					</div>
				</div>
			)}
			<div className="space-y-2">
				<Label htmlFor="availableFrom">Available from</Label>
				<div className="w-full">
					<StartDatePopover 
						startDate={availableFrom} 
						setStartDate={(date) => setAvailableFrom(date)} 
						className="text-black bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
					/>	
				</div>
				<input type="hidden" id="availableFrom" {...register("availableFrom")} value={availableFrom?.toISOString() || ''} />
				{errors.availableFrom && <p className="text-red-500">{errors.availableFrom.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="availableTo">Available to</Label>
				<div className="w-full">
					<EndDatePopover 
						endDate={availableTo} 
						startDate={availableFrom}
						setEndDate={(date) => setAvailableTo(date)} 
						className="text-black bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
					/>
				</div>
				<input type="hidden" id="availableTo" {...register("availableTo")} value={availableTo?.toISOString() || ''} />				
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
			<Button 
				className="w-full bg-transparent text-black border-accent border-2 hover:bg-accent focus:bg-accent active:bg-accent" 
				type="submit" 
				disabled={isSubmitting}
			>
				{
					actionType === "add" ? 
						isSubmitting ? "Adding..." : "Add new hosting"  
						: isSubmitting ? "Updating" : "Update hosting"
				}
			</Button>
		</form>
	)
}
