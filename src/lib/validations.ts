import { z } from 'zod';

export const searchFormSchema = z.object({
	city: z.string().trim().min(1, 'City is required').max(50, 'City name cannot be longer than 50 characters'),        
	guests: z.coerce.number().min(1, 'At least one guest is required'),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
    page: z.coerce.number().min(1).default(1).optional(),
});
export type SearchFormSchema = z.infer<typeof searchFormSchema>;

export const logInSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" })
});
export type LogInSchema = z.infer<typeof logInSchema>;

export const signUpSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	bio: z.string().min(10, "Your story should be at least 10 characters long").max(500, "Your story cannot be longer than 500 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),	
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const hostingFormSchema = z.object({
	name: z.string().trim().min(1, 'Name is required').max(50, 'Name cannot be longer than 50 characters'),
	description: z.string().trim().min(1, 'Description is required').max(500, 'Description cannot be longer than 500 characters'),
	location: z.string().trim().min(1, 'Location is required').max(50, 'Location cannot be longer than 50 characters'),
	images: z.string().refine((files) => files.length > 0, {
		message: 'At least one photo is required',
	}),
	availableFrom: z.date(),
	availableTo: z.date(),
	price: z.coerce.number().positive().min(1, 'Price must be greater than 0'),
	maxGuests: z.coerce.number().int().positive().min(1, 'At least one guest is required'),
});
export type HostingFormSchema = z.infer<typeof hostingFormSchema>;