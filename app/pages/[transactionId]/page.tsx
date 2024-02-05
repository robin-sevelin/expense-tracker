import AddTransaction from '@/components/formPage/AddTransaction';
import TransactionById from '@/components/transactionPage/TransactionById';
import React from 'react';

const EditTransaction = ({ params }: { params: { transactionId: string } }) => {
  const id = params.transactionId;

  return (
    <>
      <h2 className='text-3xl font-bold flex justify-center'>
        UPDATE TRANSACTION
      </h2>
      <AddTransaction />
      <TransactionById id={id} />
    </>
  );
};

export default EditTransaction;
