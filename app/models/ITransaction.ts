export interface ITransaction {
  id: number;
  date?: Date;
  title: string;
  amount: number;
  type?: string;
}
