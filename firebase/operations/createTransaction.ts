import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import { doc, setDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

export const createTransactionDocument = async (
  userAuth: IUser,
  transaction: ITransaction,
  date: Date
) => {
  const formatDate = DateTime.fromJSDate(date);
  const year = formatDate.year;
  const month = formatDate.toFormat('MMMM', { locale: 'en' });

  const updatedTransaction = {
    ...transaction,
    id: uuidv4(),
    year: year,
    month: month,
    date: formatDate.toString(),
  };

  const transactionsCollectionRef = collection(
    db,
    'users',
    userAuth?.uid,
    'transactions'
  );

  const transactionDocRef = doc(transactionsCollectionRef, userAuth.uid);

  try {
    await setDoc(
      transactionDocRef,
      {
        transactions: arrayUnion(updatedTransaction),
      },
      { merge: true }
    );
  } catch (error) {
    console.log('Error updating the transaction', error);
  }

  return { transactionDocRef } as const;
};
