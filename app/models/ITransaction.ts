export interface ITransaction {
  id: string;
  date?: Date;
  title: string;
  amount: number;
  type?: string;
  category?: string;
}
