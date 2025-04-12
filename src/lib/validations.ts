import { z } from 'zod';

export const searchSchema = z.object({
	city: z.string().trim().min(1, 'City is required').max(30, 'City name cannot be longer than 30 characters'),        
	guests: z.coerce.number().min(1, 'At least one guest is required'),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
    page: z.coerce.number().min(1).default(1).optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;