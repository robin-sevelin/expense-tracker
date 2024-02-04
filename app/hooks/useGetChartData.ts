import { recurringTransactionAtom } from './../store/atoms';
import { balanceAtom, monthAtom, transactionsAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { chartOptions } from '@/constants/chartOptions';
import {
  DAYS_IN_MONTH,
  LINECHART_COLORS,
  TRANSACTION_TYPES,
} from '@/constants/constants';
import { useGetFilteredTransactions } from './useGetFIlteredTransaction';
import { ITransaction } from '@/models/ITransaction';

export const useGetChartData = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [currentMonth] = useAtom(monthAtom);
  const [recurringTransactions] = useAtom(recurringTransactionAtom);

  const { filtredTransactions } = useGetFilteredTransactions(transactions);

  const getSumByType = (day: number, type: string) =>
    getTransactionsUntilDay(day)
      ?.filter(
        (transaction: ITransaction) =>
          transaction.type === type &&
          new Date(transaction.date).getMonth() === currentMonth.getMonth() &&
          new Date(transaction.date).getFullYear() ===
            currentMonth.getFullYear()
      )
      .reduce((a, b) => a + b.amount, 0);

  const getTransactionsUntilDay = (day: number) => {
    const updatedTransactionList = filtredTransactions?.filter(
      (transaction) => {
        const transactionDate = transaction.date
          ? new Date(transaction.date)
          : null;

        return (
          transactionDate &&
          transactionDate.getDate() === day &&
          transactionDate.getMonth() === currentMonth.getMonth() &&
          transactionDate.getFullYear() === currentMonth.getFullYear()
        );
      }
    );

    return updatedTransactionList;
  };

  const labels = Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1);

  const recurringExpenses = recurringTransactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE
  );

  const uniqueRecurringExpenseDates = Array.from(
    new Set(recurringExpenses.map((expense) => Number(expense.date)))
  );
  const labelsRecurringExpenses = labels.map((day) => {
    const recurringExpenseSum = uniqueRecurringExpenseDates.includes(day)
      ? recurringExpenses
          .filter(
            (recurringTransaction) => Number(recurringTransaction.date) === day
          )
          .reduce((a, b) => a + b.amount, 0)
      : 0;

    return { x: day, y: recurringExpenseSum };
  });

  const recurringIncomes = recurringTransactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPES.INCOME
  );

  const uniqueRecurringIncomeDates = Array.from(
    new Set(recurringIncomes.map((income) => Number(income.date)))
  );
  const labelsRecurringIncomes = labels.map((day) => {
    const recurringIncomeSum = uniqueRecurringIncomeDates.includes(day)
      ? recurringIncomes
          .filter(
            (recurringTransaction) => Number(recurringTransaction.date) === day
          )
          .reduce((a, b) => a + b.amount, 0)
      : 0;

    return { x: day, y: recurringIncomeSum };
  });

  const labelsIncome = labels.map((day) => ({
    x: day,
    y: getSumByType(day, TRANSACTION_TYPES.INCOME),
  }));
  const labelsExpense = labels.map((day) => ({
    x: day,
    y: getSumByType(day, TRANSACTION_TYPES.EXPENSE),
  }));

  let currentBalance = balance;
  const labelsBalance = labels.map((day) => {
    const incomeSum = getSumByType(day, TRANSACTION_TYPES.INCOME);
    const expenseSum = getSumByType(day, TRANSACTION_TYPES.EXPENSE);
    const recurringExpenseSum =
      labelsRecurringExpenses.find((label) => label.x === day)?.y || 0;
    const recurringIncomeSum =
      labelsRecurringIncomes.find((label) => label.x === day)?.y || 0;

    currentBalance =
      currentBalance +
      incomeSum -
      expenseSum -
      recurringExpenseSum +
      recurringIncomeSum;

    return { x: day, y: currentBalance };
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: labelsIncome,
        borderColor: LINECHART_COLORS.INCOME.border,
        backgroundColor: LINECHART_COLORS.INCOME.bg,
      },
      {
        label: 'Expenses',
        data: labelsExpense,
        borderColor: LINECHART_COLORS.EXPENSE.border,
        backgroundColor: LINECHART_COLORS.EXPENSE.bg,
      },
      {
        label: 'Recurring Expenses',
        data: labelsRecurringExpenses,
        borderColor: LINECHART_COLORS.RECCURING_EXPENSES.border,
        backgroundColor: LINECHART_COLORS.RECCURING_EXPENSES.bg,
      },
      {
        label: 'Recurring Incomes',
        data: labelsRecurringIncomes,
        borderColor: LINECHART_COLORS.RECCURING_INCOMES.border,
        backgroundColor: LINECHART_COLORS.RECCURING_INCOMES.bg,
      },
      {
        label: 'Balance',
        data: labelsBalance,
        borderColor: LINECHART_COLORS.BALANCE.border,
        backgroundColor: LINECHART_COLORS.BALANCE.bg,
      },
    ],
  };

  return { data, chartOptions } as const;
};
