import { ITransaction } from '@/models/ITransaction';
import { IUser } from '@/models/IUser';
import { doc, getDoc, updateDoc } from '../firestore';
import { db } from '../firestore';
import { TRANSACTIONS, USER_TRANSACTIONS } from '@/constants/constants';

export const deleteTransactionObject = async (user: IUser, id: string) => {
  const transactionCollectionRef = doc(
    db,
    USER_TRANSACTIONS,
    user.uid,
    TRANSACTIONS,
    user.uid
  );

  try {
    const transactionDocSnapshot = await getDoc(transactionCollectionRef);
    const existingData = transactionDocSnapshot.data();

    if (existingData) {
      const updatedTransactions = existingData.transactions.filter(
        (transaction: ITransaction) => transaction.id !== id
      );

      await updateDoc(transactionCollectionRef, {
        transactions: updatedTransactions,
      });
    }
  } catch (error) {
    console.log('Error deleting the transaction', error);
  }

  return { transactionCollectionRef } as const;
};
