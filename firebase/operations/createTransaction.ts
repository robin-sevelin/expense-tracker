import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import { doc, setDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';

export const createTransactionDocument = async (
  userAuth: IUser,
  transaction: ITransaction,
  date: Date
) => {
  const updatedTransaction = {
    ...transaction,
    date: date.toString(),
    id: uuidv4(),
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
