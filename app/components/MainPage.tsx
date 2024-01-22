'use client';

import { useGetBalance } from '../hooks/useGetBalance';
import { userAtom } from '../store/atoms';
import { useAtom } from 'jotai';
import Loading from './Loading';
import Link from 'next/link';
import { useGetCurrentSum } from '../hooks/useGetCurrentSum';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { useCheckDate } from '../hooks/useCheckDate';

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
    <section>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>Hello there {user.displayName}</h2>
          {balance === 0 ? (
            <>
              <p className='py-6'>
                Go to profile and set your balance before starting adding
                transactions.
              </p>
              <Link href={'/pages/profile'}>
                <button className='btn btn-primary'>Go to profile</button>
              </Link>
            </>
          ) : (
            <>
              <p>Start making transactions</p>
              <Link href={'/pages/addTransactions'}>
                <button className='btn btn-primary'>Add transactions</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainPage;
