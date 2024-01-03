'use client';

import React from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { redirect } from 'next/navigation';

const UserPage = () => {
  const { user } = useIsLoggedIn();

  if (!user.uid) {
    redirect('/');
  }

  return <div>Profile</div>;
};

export default UserPage;
