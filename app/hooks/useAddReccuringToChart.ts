import { useEffect } from 'react';
import { IExpense } from '../models/IExpense';
import { CURRENT_MONTH, CURRENT_YEAR } from '../constants/constants';
import { expenseAtom } from '../store/atoms';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';

export const useAddReccuringToChart = () => {
  const [reccuringExpenses, setReccuringExpenses] = useAtom(expenseAtom);

  useEffect(() => {
    if (reccuringExpenses.length === 0) {
      const addToExpenseArray = () => {
        const expensesWithDateString = reccuringExpenses.map(
          (expense: IExpense) => ({
            ...expense,
            date: convertDate(expense),
            id: uuidv4(),
          })
        );

        setReccuringExpenses([...expensesWithDateString]);
      };

      addToExpenseArray();
    }
  }, [reccuringExpenses, setReccuringExpenses]);

  return { reccuringExpenses } as const;
};

const convertDate = (expense: IExpense) => {
  const dayString = expense.date;
  const newDate = new Date(CURRENT_YEAR, CURRENT_MONTH, Number(dayString));

  return newDate.toString();
};
