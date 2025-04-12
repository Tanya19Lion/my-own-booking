import { z } from 'zod';

export const searchSchema = z.object({
	city: z.string().min(1, 'City is required'),
	guests: z.coerce.number().min(1, 'At least one guest is required'),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
    page: z.coerce.number().min(1).default(1).optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;