import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
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
      console.log('error setting the balance', error);
    }
  }

  return { amount: balance } as const;
};

export const createTransactionDocument = async (
  userAuth: IUser,
  transaction: ITransaction
) => {
  const transactionDocRef = doc(db, 'transactions', userAuth?.uid);

  await getDoc(transactionDocRef);

  try {
    await setDoc(transactionDocRef, {
      transaction,
    });
  } catch (error) {
    console.log('error setting the transaction', error);
  }

  return { transactionDocRef } as const;
};
