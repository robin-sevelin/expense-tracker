'use client';

import AddTransaction from '@/app/components/AddTransaction';
import { IUser } from '@/app/models/IUser';
import { TransactionFormData } from '@/app/models/FormData';
import { createTransactionDocument } from '@/firebase/firestore';

const AddTransactions = () => {
  const submitData = async (user: IUser, data: TransactionFormData) => {
    await createTransactionDocument(user, data);
  };
  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
    </>
  );
};

export default AddTransactions;
