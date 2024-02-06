import { recurringTransactionAtom } from './../store/atoms';
import { monthAtom, transactionsAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { PIECHART_COLORS } from '@/constants/pieChartOptions';
import { TRANSACTION_TYPES } from '@/constants/constants';
import { useGetFilteredTransactions } from './useGetFIlteredTransaction';
import { ITransaction } from '@/models/ITransaction';
import { pieChartOptions } from '@/constants/pieChartOptions';

export const useGetPieChartData = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [currentMonth] = useAtom(monthAtom);
  const [recurringTransactions] = useAtom(recurringTransactionAtom);
  const { filtredTransactions } = useGetFilteredTransactions(transactions);

  const getSumByType = (type: string) => {
    const filteredTransactions = filtredTransactions?.filter(
      (transaction: ITransaction) =>
        transaction.type === type &&
        new Date(transaction.date).getMonth() === currentMonth.getMonth() &&
        new Date(transaction.date).getFullYear() === currentMonth.getFullYear()
    );

    return filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  };

  const incomeSum = getSumByType(TRANSACTION_TYPES.INCOME);
  const expenseSum = getSumByType(TRANSACTION_TYPES.EXPENSE);
  const recurringExpenseSum = recurringTransactions
    .filter((transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const recurringIncomeSum = recurringTransactions
    .filter((transaction) => transaction.type === TRANSACTION_TYPES.INCOME)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balanceData = [
    { label: 'Incomes', value: incomeSum },
    { label: 'Expenses', value: expenseSum },
    { label: 'Recurring Expenses', value: recurringExpenseSum },
    { label: 'Recurring Incomes', value: recurringIncomeSum },
  ];

  const pieChartData = {
    datasets: [
      {
        data: balanceData.map((item) => item.value),
        backgroundColor: [
          PIECHART_COLORS.INCOME.bg,
          PIECHART_COLORS.EXPENSE.bg,
          PIECHART_COLORS.RECCURING_EXPENSES.bg,
          PIECHART_COLORS.RECCURING_INCOMES.bg,
        ],
      },
    ],
    labels: balanceData.map((item) => item.label),
  };

  return { pieChartData, pieChartOptions } as const;
};
