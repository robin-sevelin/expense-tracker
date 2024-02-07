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
      <section>
        <div className='hero-content flex-col lg:flex-row-reverse bg-base-200 rounded-md py-10'>
          <picture>
            <img
              src='/Wavy_Gen-03_Single-12.jpg'
              alt='money image'
              className='max-w-sm rounded-full shadow-2xl'
              width={200}
              height={200}
            />
          </picture>
          <div>
            <h1 className='text-5xl font-bold'>Hello {user.displayName}</h1>
            <p className='py-6'>
              Lets add some transactions but dont forget to set your budget
            </p>
            <div className='flex justify-between'>
              <Link
                href={'/pages/profile'}
                className='btn btn-ghost btn-outline'
              >
                Set budget
              </Link>
              <Link href={'/pages/addTransactions'} className='btn btn-primary'>
                Add transactions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
