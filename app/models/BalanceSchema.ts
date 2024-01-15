import { z } from 'zod';

export const balanceSchema = z.object({
  amount: z.number().min(1),
});
