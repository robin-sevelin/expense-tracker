import UpdateTransaction from '@/app/components/UpdateTransaction';
import Link from 'next/link';
import React from 'react';

const EditTransaction = ({ params }: { params: { transactionId: string } }) => {
  const id = params.transactionId;

  return (
    <>
      <UpdateTransaction id={id} />
      <Link href='/pages/viewTransactions'>
        <button className='btn btn-primary'>Return</button>
      </Link>
    </>
  );
};

export default EditTransaction;
