'use client';

import React from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { redirect } from 'next/navigation';

const GraphPage = () => {
  const { user } = useIsLoggedIn();

  if (!user.uid) {
    redirect('/');
  }
  return <div>Graph</div>;
};

export default GraphPage;
