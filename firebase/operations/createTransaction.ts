import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import * as firestore from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

export const createTransactionDocument = async (
  userAuth: IUser,
  transaction: ITransaction
) => {
  const formatDate = DateTime.fromJSDate(transaction.date as Date);
  const formatYear = formatDate.year;
  const formatMonth = formatDate.toFormat('MMMM');

  const updatedTransaction = {
    ...transaction,
    id: uuidv4(),
    date: formatDate.toLocaleString(),
  };

  const transactionDocRef = firestore.doc(
    db,
    'transactions',
    userAuth?.uid,
    formatYear.toString(),
    formatMonth.toString()
  );

  try {
    if (transaction) {
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
