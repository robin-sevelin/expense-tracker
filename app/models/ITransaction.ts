export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  type?: string;
  category?: string;
  date: Date;
}
