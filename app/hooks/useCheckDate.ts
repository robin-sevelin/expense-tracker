import { useEffect } from 'react';
import { createTransactionDocument } from '@/firebase/operations/createTransaction';
import { ITransaction } from '../models/ITransaction';
import { IUser } from '../models/IUser';
import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';

const useCheckDate = (transactions: ITransaction[], user: IUser) => {
  const [isSubmitted] = useAtom(submitAtom);
  useEffect(() => {
    const checkAndAddTransactions = async () => {
      const currentMonth = new Date().getMonth() + 1;

      const recurringTransactionsWithoutCurrentMonth = transactions.filter(
        (transaction) =>
          transaction.reccurant === 'true' &&
          new Date(transaction.date).getMonth() !== currentMonth - 1
      );

      for (const transaction of recurringTransactionsWithoutCurrentMonth) {
        try {
          const updatedDate = new Date(transaction.date);
          updatedDate.setMonth(updatedDate.getMonth() + 1);

          await addTransactionToCurrentMonth(transaction, user, updatedDate);
        } catch (error) {
          console.error('Error processing transaction:', error);
        }
      }
    };

    if (isSubmitted) {
      checkAndAddTransactions();
    }
  }, [transactions, user, isSubmitted]);

  const addTransactionToCurrentMonth = async (
    transaction: ITransaction,
    user: IUser,
    updatedDate: Date
  ) => {
    try {
      await createTransactionDocument(user, transaction, updatedDate);
    } catch (error) {
      console.error('Error adding transaction to current month:', error);
    }
  };
};

export default useCheckDate;
