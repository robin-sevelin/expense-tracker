'use client';

import AddTransaction from '@/app/components/AddTransaction';
import { IUser } from '@/app/models/IUser';
import { TransactionFormData } from '@/app/models/FormData';
import { createTransactionDocument } from '@/firebase/operations/createTransaction';
import { createPeriodDocument } from '@/firebase/operations/createPeriod';

const AddTransactions = () => {
  const submitData = async (user: IUser, data: TransactionFormData) => {
    await createTransactionDocument(user, data);
    await createPeriodDocument(user, data);
  };
  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
    </>
  );
};

export default AddTransactions;
