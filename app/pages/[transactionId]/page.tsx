'use client';

import AddTransaction from '@/app/components/AddTransaction';
import TransactionById from '@/app/components/TransactionById';
import { useGetTransactionById } from '@/app/hooks/useGetTransactionById';
import { IUser } from '@/app/models/IUser';
import { TransactionFormData } from '@/app/models/FormData';
import Link from 'next/link';
import React from 'react';
import { submitAtom } from '@/app/store/atoms';
import { useAtom } from 'jotai';
import { updateTransaction } from '@/firebase/operations/updateTransaction';
import Loading from '@/app/components/Loading';
import { useGetTransactions } from '@/app/hooks/useGetTransactions';

const EditTransaction = ({ params }: { params: { transactionId: string } }) => {
  const id = params.transactionId;
  const [, setIsSubmitted] = useAtom(submitAtom);
  const { transaction, isLoading } = useGetTransactionById(id);
  useGetTransactions();

  const submitData = async (
    user: IUser,
    data: TransactionFormData,
    date: Date
  ) => {
    await updateTransaction(user, data, id, date);

    setIsSubmitted(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='flex flex-col justify-center items-center'>
      <AddTransaction onHandleSubmit={submitData} />

      <div>
        <TransactionById transaction={transaction} />
      </div>
    </section>
  );
};

export default EditTransaction;
