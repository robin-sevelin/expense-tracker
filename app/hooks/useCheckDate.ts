import { useState, useEffect } from 'react';
import { ITransaction } from '@/app/models/ITransaction';
import { CURRENT_DATE } from '../constants/constants';
import { createTransactionDocument } from '@/firebase/operations/createTransaction';
import { IUser } from '../models/IUser';

export const useCheckData = async (
  transactions: ITransaction[],
  user: IUser
) => {
  const [processedTransactions, setProcessedTransactions] = useState<string[]>(
    []
  );

  const recurringTransactions = transactions.filter(
    (transaction: ITransaction) => transaction.reccurant === 'true'
  );

  useEffect(() => {
    recurringTransactions.forEach(async (transaction) => {
      if (
        transaction.date !== CURRENT_DATE &&
        !processedTransactions.includes(transaction.id)
      ) {
        await addNewTransaction(user, transaction);
        setProcessedTransactions((prev) => [...prev, transaction.id]);
      }
    });
  }, [recurringTransactions, user, processedTransactions]);
};

const addNewTransaction = async (user: IUser, transaction: ITransaction) => {
  const updatedDate = new Date(transaction.date);
  updatedDate.setMonth(updatedDate.getMonth() + 1);
  console.log(updatedDate);

  await createTransactionDocument(user, transaction, updatedDate);
};
