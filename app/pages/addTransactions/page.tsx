'use client';

import AddTransaction from '@/app/components/formPage/AddTransaction';
import { IUser } from '@/app/models/IUser';
import { TransactionFormData } from '@/app/models/FormData';
import { createTransactionDocument } from '@/firebase/operations/createTransaction';
import { useGetTransactions } from '@/app/hooks/useGetTransactions';

const AddTransactions = () => {
  useGetTransactions();
  const submitData = async (
    user: IUser,
    data: TransactionFormData,
    date: Date
  ) => {
    await createTransactionDocument(user, data, date);
  };
  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
    </>
  );
};

export default AddTransactions;
