'use client';

import { useGetBalance } from '../../hooks/useGetBalance';
import { userAtom } from '../../store/atoms';
import { useAtom } from 'jotai';
import Loading from '../sharedComponents/Loading';
import Link from 'next/link';
import { useGetCurrentSum } from '../../hooks/useGetCurrentSum';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useCheckDate } from '../../hooks/useCheckDate';

const MainPage = () => {
  const [user] = useAtom(userAtom);
  const { balance } = useGetBalance();
  const { transactions } = useGetTransactions();
  const { sum } = useGetCurrentSum();
  useCheckDate(transactions);

  if (!balance && !transactions && !sum) {
    return <Loading />;
  }

  return (
    <div className='hero min-h-full bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Hello there {user.displayName}</h1>
          <p className='py-6'>Start making transactions</p>
          <Link href={'/pages/ad'} className='btn btn-primary'>
            Add transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
