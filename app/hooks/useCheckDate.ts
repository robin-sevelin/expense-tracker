import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { createTransactionDocument } from '@/firebase/operations/createTransaction';
import { CURRENT_DATE } from '../constants/constants';
import { ITransaction } from '../models/ITransaction';

export const useCheckDate = async (transactions: ITransaction[]) => {
  const [user] = useAtom(userAtom);

  for (const transaction of transactions) {
    if (
      transaction.reccurancy === 'recurring' &&
      isSameDate(new Date(transaction.date), CURRENT_DATE)
    ) {
      await createTransactionDocument(
        user,
        transaction,
        new Date(transaction.date)
      );
    }
  }
};

const isSameDate = (transactionDate: Date, currentDate: Date) => {
  return (
    transactionDate.getDate() === currentDate.getDate() &&
    transactionDate.getMonth() === currentDate.getMonth() &&
    transactionDate.getFullYear() === currentDate.getFullYear()
  );
};
