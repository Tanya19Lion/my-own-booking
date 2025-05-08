"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { signUp } from "@/actions/actions";

export default function SignUpForm() {
	return (
		<form action={signUp} className="min-w-[320px] max-w-[400px] space-y-4">
			<div className="space-y-2">
				<Label htmlFor="firstName">First name</Label>
				<Input type="text" id="firstName" name="firstName" required className="border border-gray-300 rounded-md p-2" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="lastName">Last name</Label>
				<Input type="text" id="lastName" name="lastName" required className="border border-gray-300 rounded-md p-2" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="bio">Short information</Label>
				<Textarea 
					placeholder="Tell more about yourself" 
					id="bio" 
					name="bio" 
					required 
					className="border border-gray-300 rounded-md p-2" 
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="photo">Link to your photo</Label>
				<Input type="text" id="photo" name="photo" className="border border-gray-300 rounded-md p-2" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="email" >Email</Label>
				<Input type="email" id="email" name="email" required className="border border-gray-300 rounded-md p-2" />
			</div>
			<div className="space-y-2">				
				<Label htmlFor="password">Password</Label>	
				<Input type="password" id="password" name="password" required className="border border-gray-300 rounded-md p-2" />
			</div>
			<Button 
				type="submit" 
				className="w-full common-btn hover:bg-accent focus:bg-accent active:bg-accent"
			>
				Sign Up
			</Button>
		</form>
	)
}