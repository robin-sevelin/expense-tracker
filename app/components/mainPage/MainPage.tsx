'use client';

import { useGetBalance } from '../../hooks/useGetBalance';
import { userAtom } from '../../store/atoms';
import { useAtom } from 'jotai';
import Loading from '../sharedComponents/Loading';
import Link from 'next/link';

const MainPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <section className='card max-w-xl m-auto bg-base-200 p-2'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Hello there {user.displayName}</h1>
          <p className='py-6'>Lets make some transactions</p>
          <Link href={'/pages/addTransactions'} className='btn btn-primary'>
            Add transactions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
