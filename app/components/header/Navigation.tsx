'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/constants';

const Navigation = () => {
  return (
    <div className='drawer drawer-start'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle ' />
      <div className='drawer-content'>
        <label
          aria-label='close sidebar button'
          htmlFor='my-drawer-4'
          className='drawer-button btn bg-base-100 m-1 '
        >
          <svg
            className='swap-off fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
          </svg>
        </label>
      </div>
      <div className='drawer-side z-30'>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
          {ROUTES.map((route) => (
            <li key={route.id}>
              <Link href={route.url}>{route.text.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
