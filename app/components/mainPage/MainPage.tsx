'use client';

import { useAuthUser } from '@/hooks/useAuthUser';
import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import Link from 'next/link';

const MainPage = () => {
  const [user] = useAtom(userAtom);
  useAuthUser();

  return (
    <>
      <section className='card max-w-xl m-auto bg-base-200 p-2 my-5 z-30 mt-20'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>
              Hello there {user.displayName}
            </h1>
            <p className='py-6'>
              Lets add some transactions but dont forget to set your budget in
              the profile section.
            </p>
            <Link href={'/pages/addTransactions'} className='btn btn-primary'>
              Add transactions
            </Link>
          </div>
        </div>
      </section>
      <picture>
        <img
          src='/Wavy_Gen-03_Single-12.jpg'
          alt=''
          className='rounded-full m-auto mt-20'
          width={300}
          height={300}
        />
      </picture>
    </>
  );
};

export default MainPage;
