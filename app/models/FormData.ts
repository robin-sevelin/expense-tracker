export interface TransactionFormData {
  id: string;
  title: string;
  year: number;
  month: string;
  amount: number;
  type: string;
  category: string;
}

export interface BalanceFormData {
  balance: number;
}
