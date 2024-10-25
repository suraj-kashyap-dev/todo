import { z } from 'zod';

export const tagSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  status: z.boolean(),
});

export type TagInput = z.infer<typeof tagSchema>;
