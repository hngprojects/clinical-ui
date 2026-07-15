import { z } from 'zod';

const MAX_FIRST_NAME_LENGTH = 50;

export const subscribeSchema = z.object({
  email: z.string().trim().email('Valid email required'),
  first_name: z
    .string()
    .trim()
    .min(1, 'Valid email required')
    .max(MAX_FIRST_NAME_LENGTH, 'Valid email required'),
});
