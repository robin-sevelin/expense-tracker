'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';

const TransactionList = () => {
  const [user] = useAtom(userAtom);
  useAuthUser(user);
  return <div>TransactionList</div>;
};

export default TransactionList;
