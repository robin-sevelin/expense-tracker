'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/constants';
import Hamburger from './Hamburger';

const Navigation = () => {
  return (
    <div className='drawer drawer-start'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label
          aria-label='close sidebar button'
          htmlFor='my-drawer-4'
          className='drawer-button btn bg-base-100 '
        >
          <Hamburger />
        </label>
      </div>
      <div className='drawer-side z-[999] '>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay '
        ></label>
        <ul className='navigation-ul'>
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
