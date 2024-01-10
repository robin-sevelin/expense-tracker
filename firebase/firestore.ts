import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { app } from './config';
import { IUser } from '@/app/models/IUser';
import { ITransaction } from '@/app/models/ITransaction';

export const db = getFirestore(app);

export const createUserDocument = async (userAuth: IUser) => {
  const userDocRef = doc(db, 'users', userAuth?.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        photoURL,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};

export const createBalanceDocument = async (
  userAuth: IUser,
  balance: number
) => {
  const balanceDocRef = doc(db, 'users balance', userAuth?.uid);

  const balanceSnapshot = await getDoc(balanceDocRef);

  if (!balanceSnapshot.exists()) {
    try {
      await setDoc(balanceDocRef, {
        balance,
      });
    } catch (error) {
      console.log('Error setting the balance', error);
    }
  } else {
    try {
      await updateDoc(balanceDocRef, {
        balance,
      });
    } catch (error) {
      console.log('Error updating the balance', error);
    }
  }

  return { amount: balance } as const;
};

export const createTransactionDocument = async (
  userAuth: IUser,
  transaction: ITransaction
) => {
  const transactionDocRef = doc(db, 'transactions', userAuth?.uid);

  const transactionDocSnapshot = await getDoc(transactionDocRef);
  const existingData = transactionDocSnapshot.data();

  try {
    if (existingData && existingData.transactions) {
      await updateDoc(transactionDocRef, {
        transactions: arrayUnion(transaction),
      });
    } else {
      await setDoc(transactionDocRef, {
        transactions: [transaction],
      });
    }
  } catch (error) {
    console.log('Error updating the transaction', error);
  }

  return { transactionDocRef } as const;
};

export const deleteTransactionObject = async (userAuth: IUser, id: number) => {
  const transactionCollectionRef = doc(db, 'transactions', userAuth?.uid);

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
};
