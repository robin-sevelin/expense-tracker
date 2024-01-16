export interface TransactionFormData {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: string;
  category: string;
}

export interface BalanceFormData {
  balance: number;
}
