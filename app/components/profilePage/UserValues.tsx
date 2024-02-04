'use client';

import React from 'react';
import AddBalance from '../formPage/AddBalance';
import { useAuthUser } from '@/hooks/useAuthUser';

const UserValues = () => {
  useAuthUser();

  return (
    <>
      <AddBalance />
    </>
  );
};

export default UserValues;
