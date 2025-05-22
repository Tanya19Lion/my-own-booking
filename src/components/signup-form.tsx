"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { signUp } from "@/actions/owner-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/lib/validations";
import { toast } from "sonner";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/lib/constants";

export default function SignUpForm() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});
	const [photoPreview, setPhotoPreview] = useState<string | null>(null); 
	
	const onSubmit = async (data: SignUpSchema) => {
		const formData = new FormData();

		formData.append("firstName", data.firstName);
		formData.append("lastName", data.lastName);
		formData.append("bio", data.bio);
		formData.append("email", data.email);
		formData.append("password", data.password);

		const fileInput = document.getElementById("photo") as HTMLInputElement;
		if (fileInput?.files?.[0]) {
			formData.append("photo", fileInput.files[0]);
		}

		const error = await signUp(formData);
		if (error) {
			toast.error(error.message) || "Something went wrong.";
			return;
		}		
	};	

	function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (!file) {
			setPhotoPreview(null);
			return;
		}

		if (!ALLOWED_TYPES.includes(file.type)) {
			toast.error("Only JPG, PNG, or WEBP images are allowed.");
			e.target.value = ""; 
			setPhotoPreview(null);
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error("File size must be less than 5MB.");
			e.target.value = "";
			setPhotoPreview(null);
			return;
		}

		const previewUrl = URL.createObjectURL(file);
		setPhotoPreview(previewUrl);
	}

	function handleRemovePhoto() {
		setPhotoPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = ""; 
		}
	}

	useEffect(() => {
		return () => {
			if (photoPreview) URL.revokeObjectURL(photoPreview);
		};
	}, [photoPreview]);

	return (
		<form encType="multipart/form-data"	onSubmit={handleSubmit(onSubmit)} className="min-w-[320px] max-w-[400px] space-y-4">
			<div className="space-y-2">
				<Label htmlFor="firstName">First name</Label>
				<Input id="firstName" {...register('firstName')} className="border border-gray-300 rounded-md p-2" />
				{errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="lastName">Last name</Label>
				<Input id="lastName" {...register('lastName')} className="border border-gray-300 rounded-md p-2" />
				{errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="bio">Short information</Label>
				<Textarea 
					placeholder="Tell more about yourself" 
					id="bio" 
					{...register('bio')}
					className="border border-gray-300 rounded-md p-2" 
				/>
				{errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="photo" className="sr-only">Upload you photo</Label>
				<Input id="photo" type="file" name="photo" accept="image/*" onChange={handlePhotoChange} ref={fileInputRef} className="visually-hidden" />
				<Button 
					type="button"
					disabled={isSubmitting}
					onClick={() => fileInputRef.current?.click()} 
					className="w-full text-white rounded-md border border-gray-200 bg-transparent cursor-pointer hover:text-accent hover:bg-transparent hover:border-accent transition-200"
				>Upload you photo</Button>					
			</div>
			{photoPreview && (
				<div className="space-y-2">
					<p className="text-sm text-gray-500">Preview:</p>
					<div className="flex gap-4">
						<Image src={photoPreview} alt="Image preview" width={100} height={100} className="rounded-md border border-gray-200" />
						<Button 
							onClick={handleRemovePhoto} 
							variant="outline" 
							className="mt-2 text-accent border-accent transition-colors duration-200"
						>
							Remove Photo
						</Button>
					</div>					
				</div>
			)}
			<div className="space-y-2">
				<Label htmlFor="email" >Email</Label>
				<Input type="email" id="email" {...register('email')} className="border border-gray-300 rounded-md p-2" />
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>
			<div className="space-y-2">				
				<Label htmlFor="password">Password</Label>	
				<Input type="password" id="password" {...register('password')} className="border border-gray-300 rounded-md p-2" />
				{errors.password && <p className="text-red-500">{errors.password.message}</p>}
			</div>
			<Button 
				disabled={isSubmitting}
				type="submit" 
				className="w-full common-btn hover:bg-accent focus:bg-accent active:bg-accent"
			>
				{isSubmitting ? 'Signing Up...' : 'Sign Up'}
			</Button>			
		</form>
	);
}
