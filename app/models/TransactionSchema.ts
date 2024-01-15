import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.string(),
  category: z.string(),
  title: z.string().min(3).max(20),
  amount: z.number().min(1).max(9999),
});
