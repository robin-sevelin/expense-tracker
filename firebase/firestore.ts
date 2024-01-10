import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { app } from './config';
import { IUser } from '@/app/models/IUser';
import { ITransaction } from '@/app/models/ITransaction';
import {
  CURRENT_YEAR,
  CURRENT_MONTH,
  DATESTAMP,
} from '@/app/constants/constants';

export const db = getFirestore(app);

export const createUserDocument = async (userAuth: IUser) => {
  const userDocRef = doc(db, 'users', userAuth?.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: DATESTAMP.toLocaleString(),
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
        user: userAuth.displayName,
        createdAt: DATESTAMP.toLocaleString(),
        balance: balance,
      });
    } catch (error) {
      console.log('Error setting the balance', error);
    }
  } else {
    try {
      await updateDoc(balanceDocRef, {
        balane: balance,
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
  const transactionDocRef = doc(
    db,
    'transactions',
    userAuth?.uid,
    CURRENT_YEAR,
    CURRENT_MONTH
  );

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

export const deleteTransactionObject = async (userAuth: IUser, id: string) => {
  const transactionCollectionRef = doc(
    db,
    'transactions',
    userAuth?.uid,
    CURRENT_YEAR,
    CURRENT_MONTH
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
};

export const updateTransactionObject = async (
  user: IUser,
  title: string,
  amount: number,
  id: string
) => {
  const transactionsCollection = collection(db, 'transactions');

  const userDocRef = doc(transactionsCollection, user.uid);
  const yearSubcollectionRef = collection(userDocRef, CURRENT_YEAR);
  const monthDocRef = doc(yearSubcollectionRef, CURRENT_MONTH);

  try {
    const monthDocSnap = await getDoc(monthDocRef);
    if (monthDocSnap.exists()) {
      const monthDocData = monthDocSnap.data();
      const transactionArray = monthDocData.transactions;
      const updatedArray = transactionArray.map((transaction: ITransaction) => {
        if (transaction.id === id) {
          return { ...transaction, title, amount };
        }
        return transaction;
      });

      await updateDoc(monthDocRef, { transactions: updatedArray });
    } else {
      console.log('document doesnt exist');
    }
  } catch (error) {
    console.log('error getting the document', error);
  }
};
