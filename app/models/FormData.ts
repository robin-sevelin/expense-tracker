export interface TransactionFormData {
  id: string;
  title: string;
  year: number;
  month: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
}

export interface BalanceFormData {
  balance: number;
}
