import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn } from "@/actions/actions";

export default function LoginForm() {
	return (
		<form action={logIn} className="min-w-[320px] max-w-[400px] space-y-4">
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
				Log In
			</Button>
		</form>
	)
}
