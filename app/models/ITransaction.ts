export interface ITransaction {
  id: string;
  year: number;
  month: string;
  title: string;
  amount: number;
  type?: string;
  category?: string;
  date: Date;
}
