import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import * as firestore from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';

export const createTransactionDocument = async (
  userAuth: IUser,
  transaction: ITransaction
) => {
  const transactionDate = transaction.date
    ? firestore.Timestamp.fromDate(transaction.date)
    : null;

  const updatedTransaction = {
    ...transaction,
    id: uuidv4(),
    date: transactionDate,
  };

  const transactionYear = transactionDate
    ? transactionDate.toDate().getFullYear().toString()
    : 'unknown';

  const transactionMonth = transactionDate
    ? transactionDate.toDate().toLocaleString('en-US', { month: 'long' })
    : 'unknown';

  const transactionDocRef = firestore.doc(
    db,
    'transactions',
    userAuth?.uid,
    transactionYear,
    transactionMonth
  );

  try {
    if (transactionYear !== 'unknown' && transactionMonth !== 'unknown') {
      const transactionDocSnapshot = await firestore.getDoc(transactionDocRef);
      const existingData = transactionDocSnapshot.data();

      if (existingData && existingData.transactions) {
        await firestore.updateDoc(transactionDocRef, {
          transactions: firestore.arrayUnion(updatedTransaction),
        });
      } else {
        await firestore.setDoc(transactionDocRef, {
          transactions: [updatedTransaction],
        });
      }
    }
  } catch (error) {
    console.log('Error updating the transaction', error);
  }

  return { transactionDocRef } as const;
};
