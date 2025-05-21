"use client";

import { useActionState, useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { signUp } from "@/actions/owner-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/lib/validations";
import { toast } from "sonner";

// const initialState = { 
// 	error: undefined,
// 	success: undefined
// };

export default function SignUpForm() {
	const { register, formState: {isSubmitting, errors}, trigger, getValues } = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});

	// const [photoPreview, setPhotoPreview] = useState<string | null>(null); // <- preview state

	// function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
	// 	const file = e.target.files?.[0];
	// 	if (file) {
	// 		const previewUrl = URL.createObjectURL(file);
	// 		setPhotoPreview(previewUrl);
	// 	} else {
	// 		setPhotoPreview(null);
	// 	}
	// }

	// useEffect(() => {
	// 	return () => {
	// 		if (photoPreview) URL.revokeObjectURL(photoPreview);
	// 	};
	// }, [photoPreview]);

	return (
		<form action={async () => {
			const result = await trigger();
			if (!result) {
				toast.error("Please fill in all required fields.");
				return;
			}

			const formData = getValues();
			formData.photo = formData.photo[0] || ""; 
			const error = await signUp(formData);
			if (error) {
				toast.error(error.message);
				return;
			}
		}} 
		className="min-w-[320px] max-w-[400px] space-y-4">
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
				<Label htmlFor="photo">Upload your photo</Label>
				<Input id="photo" {...register('photo')} className="border border-gray-300 rounded-md p-2" />
				{errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
			</div>
			{/* <div className="space-y-2">
				<Label htmlFor="photo">Upload your photo</Label>
				<Input 
					type="file" 
					id="photo" 
					name="photo" 
					accept="image/*" 
					className="border border-gray-300 rounded-md p-2" 
					onChange={handlePhotoChange}
				/>

				{photoPreview && (
					<div className="mt-2">
						<p className="text-sm text-gray-500">Preview:</p>
						<Image 
							src={photoPreview} 
						 alt="Image preview" 
							width={128} 
							height={128} 
							className="rounded-md border border-gray-200"
						/>
					</div>
				)}
			</div> */}
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



// bio
// : 
// "mkjhk kljhjgfhgfdxhdfx"
// email
// : 
// "jjjjj@ggg.com"
// firstName
// : 
// "ddddddddd"
// lastName
// : 
// "hgnvbcmnbmbnm"
// password
// : 
// "hgfjhggfjfg"
// photo
// : 
// ""