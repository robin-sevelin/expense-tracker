export interface TransactionFormData {
  id: string;
  title: string;
  date: Date;
  amount: number;
  type: string;
  category: string;
}

export interface BalanceFormData {
  balance: number;
}
