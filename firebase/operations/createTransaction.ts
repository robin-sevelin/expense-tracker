import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';

export const createTransactionDocument = async (
  userAuth: IUser,
  transaction: ITransaction
) => {
  const updatedTransaction = {
    ...transaction,
    id: uuidv4(),
    date: transaction.date,
  };

  const transactionDate = transaction.date
    ? {
        year: transaction.date.getFullYear().toString(),
        month: transaction.date.toLocaleString('en-US', { month: 'long' }),
      }
    : {
        year: 'unknown',
        month: 'unknown',
      };

  const transactionDocRef = doc(
    db,
    'transactions',
    userAuth?.uid,
    transactionDate?.year,
    transactionDate?.month
  );

  try {
    if (
      transactionDate?.year !== 'unknown' &&
      transactionDate?.month !== 'unknown'
    ) {
      const transactionDocSnapshot = await getDoc(transactionDocRef);
      const existingData = transactionDocSnapshot.data();

      if (existingData && existingData.transactions) {
        await updateDoc(transactionDocRef, {
          transactions: arrayUnion(updatedTransaction),
        });
      } else {
        await setDoc(transactionDocRef, {
          transactions: [updatedTransaction],
        });
      }
    }
  } catch (error) {
    console.log('Error updating the transaction', error);
  }

  return { transactionDocRef } as const;
};
