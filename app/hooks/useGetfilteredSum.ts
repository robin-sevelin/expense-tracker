import {
  recurringExpenseSumAtom,
  recurringIncomeSumAtom,
} from './../store/atoms';
import { useEffect } from 'react';
import { TRANSACTION_TYPES } from '../constants/constants';
import { useAtom } from 'jotai';
import {
  balanceAtom,
  transactionsAtom,
  monthAtom,
  expenseSumAtom,
  incomeSumAtom,
  filtredSumAtom,
} from '@/store/atoms';

export const useGetFilteredSum = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [sum, setSum] = useAtom(filtredSumAtom);
  const [expenseSum, setExpenseSum] = useAtom(expenseSumAtom);
  const [incomeSum, setIncomeSum] = useAtom(incomeSumAtom);
  const [currentMonth] = useAtom(monthAtom);
  const [recurringExpenseSum] = useAtom(recurringExpenseSumAtom);
  const [recurringIncomeSum] = useAtom(recurringIncomeSumAtom);

  useEffect(() => {
    if (transactions) {
      const countSum = () => {
        const currentMonthTransactions = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() === currentMonth.getMonth() &&
            transactionDate.getFullYear() === currentMonth.getFullYear()
          );
        });

        const expenses = currentMonthTransactions.filter(
          (transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE
        );

        const incomes = currentMonthTransactions.filter(
          (transaction) => transaction.type === TRANSACTION_TYPES.INCOME
        );

        const expenseSumValue = expenses.reduce((a, b) => a + b.amount, 0);
        const incomeSumValue = incomes.reduce((a, b) => a + b.amount, 0);
        const diffSum =
          incomeSumValue -
          expenseSumValue -
          recurringExpenseSum +
          recurringIncomeSum;

        setExpenseSum(expenseSumValue);
        setIncomeSum(incomeSumValue);
        setSum(diffSum + balance);
      };

      countSum();
    }
  }, [
    ,
    recurringIncomeSum,
    recurringExpenseSum,
    balance,
    setSum,
    transactions,
    currentMonth,
    setIncomeSum,
    setExpenseSum,
    incomeSum,
  ]);

  return { sum, expenseSum, incomeSum } as const;
};
