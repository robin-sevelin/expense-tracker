import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';

export const deleteTransactionObject = async (userAuth: IUser, id: string) => {
  const transactionCollectionRef = doc(
    db,
    'users',
    userAuth?.uid,
    'transactions',
    userAuth?.uid
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
