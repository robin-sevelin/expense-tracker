import AddTransaction from '@/app/components/AddTransaction';
import Link from 'next/link';
import React from 'react';

const EditTransaction = ({ params }: { params: { transactionId: number } }) => {
  return (
    <div>
      Edit transaction {params.transactionId}
      <AddTransaction />
      <Link href='/pages/viewTransactions'>
        <button className='btn btn-primary'>Return</button>
      </Link>
    </div>
  );
};

export default EditTransaction;
