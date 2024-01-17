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
import { updateTransactionObject } from '@/firebase/operations/updateTransaction';

const EditTransaction = ({ params }: { params: { transactionId: string } }) => {
  const id = params.transactionId;
  const { transaction } = useGetTransactionById(id);
  const [, setIsSubmitted] = useAtom(submitAtom);

  const submitData = async (user: IUser, data: TransactionFormData) => {
    await updateTransactionObject(user, data, id);
    setIsSubmitted(true);
  };

  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
      <Link href='/pages/viewTransactions'>
        <button className='btn btn-primary'>Return</button>
      </Link>
      <div>
        <TransactionById transaction={transaction} key={id} />
      </div>
    </>
  );
};

export default EditTransaction;
