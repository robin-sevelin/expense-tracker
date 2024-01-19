import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { DateTime } from 'luxon';

export const updateTransactionObject = async (
  user: IUser,
  updatedTransaction: ITransaction,
  id: string,
  date: Date
) => {
  const formatDate = DateTime.fromJSDate(date);
  const year = formatDate.year;
  const month = formatDate.toFormat('MMMM', { locale: 'en' });

  const transactionCollectionRef = doc(
    db,
    'users',
    user.uid,
    'transactions',
    user.uid
  );

  try {
    const docSnap = await getDoc(transactionCollectionRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      const transactionArray = data.transactions;

      const updatedArray = transactionArray.map((transaction: ITransaction) => {
        if (transaction.id === id) {
          return {
            ...transaction,
            title: updatedTransaction.title,
            amount: updatedTransaction.amount,
            category: updatedTransaction.category,
            type: updatedTransaction.type,
            year: year,
            month: month,
            id: id,
            date: formatDate.toString(),
          };
        }
        return transaction;
      });

      await updateDoc(transactionCollectionRef, { transactions: updatedArray });
    } else {
      console.log('document doesnt exist');
    }
  } catch (error) {
    console.log('error getting the document', error);
  }
};
