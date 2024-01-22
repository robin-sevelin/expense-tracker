import { DateTime } from 'luxon';

export interface TransactionFormData {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
  reccurancy: string;
}

export interface BalanceFormData {
  balance: number;
}
