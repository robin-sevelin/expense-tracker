'use client';

import { redirect } from 'next/navigation';
import React from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';

const TransactionList = () => {
  const { user } = useIsLoggedIn();

  if (!user.uid) {
    redirect('/');
  }
  return <div>TransactionList</div>;
};

export default TransactionList;
