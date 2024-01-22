'use client';

import Link from 'next/link';
import { ROUTES } from '../../constants/constants';

const Navigation = () => {
  return (
    <div className='sidebar'>
      <nav>
        <ul>
          {ROUTES.map((route) => (
            <li key={route.id}>
              <Link href={route.url}>{route.text.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
