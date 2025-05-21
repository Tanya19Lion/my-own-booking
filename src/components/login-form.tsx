"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn } from "@/actions/owner-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema, LogInSchema } from "@/lib/validations";
import { toast } from "sonner";

export default function LoginForm() {
	const { register, formState: { isSubmitting, errors }, trigger, getValues } = useForm<LogInSchema>({
		resolver: zodResolver(logInSchema),
	});

	return (
		<form action={async () => {
			const result = await trigger();
			if (!result) {
				toast.error("Please fill in all required fields.");
				return;
			}

			const formData = getValues();
			if (!formData.email || !formData.password) {
				toast.error("Email and password are required.");
				return;
			}
			
			const error = await logIn(formData);
			if (error) {
				toast.error(error.message);
				return;
			}
		}}
		className="min-w-[320px] max-w-[400px] space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email" >Email</Label>
				<Input id="email" type="email" {...register('email')} className="border border-gray-300 rounded-md p-2" />
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>
			<div className="space-y-2">				
				<Label htmlFor="password">Password</Label>	
				<Input id="password" type="password" {...register('password')} className="border border-gray-300 rounded-md p-2" />
				{errors.password && <p className="text-red-500">{errors.password.message}</p>}
			</div>
			<Button 
				type="submit" 
				className="w-full common-btn hover:bg-accent focus:bg-accent active:bg-accent"
				disabled={isSubmitting}
			>
				Log In
			</Button>
		</form>
	)
}
