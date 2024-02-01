'use client';

import React from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { balanceAtom } from '@/store/atoms';
import { useGetExpenseSum } from '@/hooks/useGetExpenseSum';
import { useGetIncomeSum } from '@/hooks/useGetIncomeSum';

const UserPage = () => {
  const [balance] = useAtom(balanceAtom);
  const { recurringExpenseSum } = useGetExpenseSum();
  const { recurringIncomeSum } = useGetIncomeSum();
  const { user } = useAuthUser();

  return (
    <div className='hero-content flex-col lg:flex-row-reverse'>
      <div>
        <div className='hero-content flex-col '>
          <p>
            If you need to set or update your budget or recurrent values go to
            EDIT BUDGET.
          </p>
          <Link href='/pages/editUserValues' className='btn btn-primary py-3'>
            <span>Edit budget</span>
          </Link>
        </div>
        <div className='overflow-x-auto py-10'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Budget amount</th>
                <th>Reccuring expenses amount</th>
                <th>Reccuring incomes amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{user.displayName}</th>
                <td>{user.email}</td>
                <td>{balance} SEK</td>
                <td>{recurringExpenseSum} SEK</td>
                <td>{recurringIncomeSum} SEK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
