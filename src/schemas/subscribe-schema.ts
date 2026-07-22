import { z } from 'zod';

const MAX_FIRST_NAME_LENGTH = 50;

export const subscribeSchema = z.object({
  email: z.string().trim().email('Valid email required'),
  first_name: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(MAX_FIRST_NAME_LENGTH, 'First name is too long'),
  group_id: z.string().regex(/^\d+$/, 'A numeric group ID is required').optional(),
  tags: z.array(z.string().trim().min(1).max(100)).max(10).default([]),
});
