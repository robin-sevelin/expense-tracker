export interface TransactionFormData {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
  reccurant: string;
}

export interface BalanceFormData {
  balance: number;
}
