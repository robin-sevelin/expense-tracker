import { useEffect, useState } from 'react';
import { IExpense } from '../models/IExpense';
import { ITransaction } from '../models/ITransaction';
import { useGetExpenses } from './useGetExpenses';
import { TRANSACTIONS_BASE_VALUES } from '../constants/constants';

export const useAddReccuringToChart = (transactions: ITransaction[]) => {
  const { expenses } = useGetExpenses();
  const [newList, setNewList] = useState<ITransaction[]>(
    TRANSACTIONS_BASE_VALUES
  );

  console.log(expenses);

  useEffect(() => {
    if (expenses && transactions) {
      const addToExpenseArray = () => {
        const expensesWithDateString = expenses.map((expense: IExpense) => ({
          ...expense,
          date: convertDate(expense),
          id: Math.random().toString(),
        }));

        setNewList([...transactions, ...expensesWithDateString]);
      };

      addToExpenseArray();
    }
  }, [transactions, expenses]);

  return { newList } as const;
};

const convertDate = (expense: IExpense) => {
  const dayString = expense.date;
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const newDate = new Date(year, month, Number(dayString));

  return newDate.toString();
};
