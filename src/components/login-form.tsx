"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn } from "@/actions/owner-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema, LogInSchema } from "@/lib/validations";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

export default function LoginForm() {
	// const router = useRouter();
	const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LogInSchema>({
		resolver: zodResolver(logInSchema),
	});

	const onSubmit = async (formData: LogInSchema) => {
		const result = await logIn(formData);

		if (result?.message) {
			toast.error(result.message);
			return;
		}

		// if (result?.success) {
		// 	router.push("/owner/dashboard"); 
		// }
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}	className="sm:min-w-[320px] lg:min-w-[400px] space-y-4">
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
				{isSubmitting ? "Logging in..." : "Log In"}
			</Button>
		</form>
	)
}
