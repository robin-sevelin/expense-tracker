export interface TransactionFormData {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
}

export interface BalanceFormData {
  amount: number;
}

export interface ExpenseFormData {
  title: string;
  amount: number;
  date: string;
}

export interface IncomeFormData {
  title: string;
  amount: number;
  date: string;
}
