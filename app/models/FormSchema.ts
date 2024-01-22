import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.string(),
  category: z.string(),
  title: z.string().min(3).max(20),
  amount: z.number().min(1),
  reccurancy: z.string(),
});

export const balanceSchema = z.object({
  balance: z.number().min(1),
});
