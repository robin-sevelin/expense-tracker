import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.string(),
  category: z.string(),
  title: z.string().min(3).max(20),
  amount: z.number().min(1),
});

export const balanceSchema = z.object({
  amount: z.number().min(1),
});

export const expenseSchema = z.object({
  title: z.string().min(3).max(20),
  amount: z.number().min(1),
  date: z.string(),
});

export const incomeSchema = z.object({
  title: z.string().min(3).max(20),
  amount: z.number().min(1),
  date: z.string(),
});
