import Link from 'next/link';
import React from 'react';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/pages/graph'}>Graph</Link>
        </li>
        <li>
          <Link href={'/pages/profile'}>Profile</Link>
        </li>
        <li>
          <Link href={'/pages/viewTransactions'}>View transactions</Link>
        </li>
        <li>
          <Link href={'/pages/addTransactions'}>Add transactions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
