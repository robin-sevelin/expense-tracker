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
import { DateTime } from 'luxon';

const EditTransaction = ({ params }: { params: { transactionId: string } }) => {
  const id = params.transactionId;
  const [, setIsSubmitted] = useAtom(submitAtom);
  const { transaction } = useGetTransactionById(id);

  const submitData = async (
    user: IUser,
    data: TransactionFormData,
    date: Date
  ) => {
    await updateTransactionObject(user, data, id, date);
    setIsSubmitted(true);
  };

  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
      <Link href='/pages/viewTransactions'>
        <button className='btn btn-primary'>Return</button>
      </Link>
      <div>
        <TransactionById transaction={transaction} />
      </div>
    </>
  );
};

export default EditTransaction;
