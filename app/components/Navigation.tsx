'use client';

import Link from 'next/link';
import { ROUTES } from '../constants/constants';

const Navigation = () => {
  return (
    <nav>
      <ul>
        {ROUTES.map((route) => (
          <li key={route.id} className=' float-right mr-3'>
            <Link href={route.url}>{route.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
