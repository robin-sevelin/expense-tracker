import { CURRENT_YEAR, CURRENT_MONTH } from '@/app/constants/constants';
import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';

export const updateTransactionObject = async (
  user: IUser,
  data: ITransaction,
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
          return {
            ...transaction,
            title: data.title,
            amount: data.amount,
            category: data.category,
            type: data.type,
          };
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
